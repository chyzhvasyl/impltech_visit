let message_scheme = require('../schems/message');



module.exports = io =>{
  let online = 0;
  io.on("connection", function (socket)   {

    console.log('new connection made',  socket.id );
    socket.emit('connection', socket.id);
    socket.join(socket.id);
    socket.on('msg', content => {

      let message = {
        date: new Date(),
        id: socket.id,
        content: content
      };
      message_scheme.create(message,  error =>{
        if (error){
          console.log('Error ->', error);
          return error.status(400).end();
        }
        else {
          console.log("Message Received: " + content);
          socket.emit('message', message);
          socket.to(socket.id).emit('message', message)



          //socket.on('message', (message) => {
          //  console.log("Message Received: " + message);
          //  io.emit('message', {type:'new-message', text: message});
          //});


        }

      });

      //io.emit('message', {type:'new-message', text: message});
    });

    online++;
    socket.emit('online', online);
    console.log("online " + online);
    socket.on('disconnect', () => {
      online--;
      io.emit('numberOfOnlineUsers', online);
      console.log('User disconnected');
    });


    socket.on('receive_history', () => {
      message_scheme
        .find({})
        .sort({date: -1})
        .limit(50)
        .lean()
        .exec( (err, messages) => {
          if(err){
            err.json(err);
          }
          else {

            socket.emit("history", messages);


          }
        })



    })
  });



};
