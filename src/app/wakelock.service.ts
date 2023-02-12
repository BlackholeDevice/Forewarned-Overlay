import {Injectable} from '@angular/core';
import {Observable, of, tap} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Injectable()
export class WakelockService {

  private sentinel: any;

  constructor() {
  }

  public static provide(): boolean {
    return 'wakeLock' in navigator;
  }

  public acquire(): Observable<any> {
    if ('wakeLock' in navigator) {
      const wakeLock = navigator.wakeLock as any;
      return fromPromise(wakeLock.request('screen')).pipe(
        tap(sentinel => this.sentinel = sentinel)
      )
    } else {
      return of(false);
    }
  }

  public release(): Observable<any> {
    if (this.sentinel) {
      return fromPromise(this.sentinel.release()).pipe(
        tap(() => this.sentinel = null)
      );
    } else {
      return of(false);
    }
  }
}
