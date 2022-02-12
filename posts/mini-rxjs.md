---
title: "Mini Rxjs"
date: "2022-01-12"
---

```ts
/**
 * Observer
 * Observable
 * Subscription
 * Subscriber => Subscription + Observer
 */

interface Observer<T> {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
}

interface Unsubscribable {
  unsubscribe(): void;
}

function pipeFromArray<T, R>(
  fns: Array<UnaryFunction<T, R>>
): UnaryFunction<T, R> {
  if (fns.length === 0) {
    return (x) => (x as any) as R;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return (input: T): R => {
    return fns.reduce(
      (prev: any, fn: UnaryFunction<T, R>) => fn(prev),
      input as any
    );
  };
}

type UnaryFunction<T, R> = (source: T) => R;

type OperatorFunction<T, R> = UnaryFunction<Observable<T>, Observable<R>>;

type TeardownLogic = Subscription | Unsubscribable | void | (() => void);

/**
 * @method add(teardown:TeardownLogic):void
 * @method unsubscribe():void
 */
class Subscription implements Unsubscribable {
  private _teardown: Exclude<TeardownLogic, void>[] = [];

  add(teardown: TeardownLogic): void {
    if (teardown) {
      this._teardown.push(teardown);
    }
  }

  unsubscribe(): void {
    this._teardown.forEach((teardown) => {
      if (typeof teardown === "function") {
        teardown();
      } else {
        teardown.unsubscribe();
      }
    });
  }
}

class Subscriber<T> extends Subscription implements Observer<T> {
  private isStopped = false;
  constructor(private observer: Partial<Observer<T>>) {
    super();
  }

  next(value: T) {
    if (this.observer.next && !this.isStopped) {
      this.observer.next(value);
    }
  }
  error(value: unknown) {
    this.isStopped = true;
    if (this.observer.error) this.observer.error(value);
  }
  complete() {
    this.isStopped = true;
    if (this.observer.complete) this.observer.complete();

    if (this.unsubscribe) this.unsubscribe();
  }
}

/**
 * @method subscribe(observer:Partial<Observer>):Subscription
 */
class Observable<T> {
  constructor(private _subscribe: (observer: Observer<T>) => TeardownLogic) {}

  subscribe(observer: Partial<Observer<T>>): Subscription {
    const subscriber = new Subscriber(observer);
    subscriber.add(this._subscribe(subscriber));
    return subscriber;
  }

  pipe(...operations: OperatorFunction<any, any>[]): Observable<any> {
    return pipeFromArray(operations)(this);
  }
}
```
