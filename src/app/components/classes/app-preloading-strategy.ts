import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, timer, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class AppPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const loadRoute = (delay) => delay
      ? timer(1500).pipe(flatMap(() => load()))
      : load();
    console.log('Preload path:' + route.path + 'delay ' + route.data['delay']);
    return route.data && route.data.preload
      ? loadRoute(route.data.delay)
      : of(null);
  }
}
