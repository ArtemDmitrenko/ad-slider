type Observer<T> = (args: T) => void;

type Events<T> = { [K in keyof T]: Observer<T[K]>[] };

class EventObserver<T extends Record<string, unknown>> {
  private observers: Events<T>;

  constructor() {
    this.observers = {} as Events<T>;
  }

  public addObserver<K extends keyof T>(event: K, newObserver: Observer<T[K]>): void {
    if (this.observers[event]) {
      if (this.observers[event].includes(newObserver)) {
        throw new Error('Observer is already in the list!');
      }
      this.observers[event].push(newObserver);
    } else {
      this.observers[event] = [newObserver];
    }
  }

  protected broadcast<K extends keyof T>(event: K, data: T[K]): void {
    if (this.observers[event] === undefined) {
      throw new Error('There is no such observer in the list!');
    }
    this.observers[event].forEach((subscriber) => {
      subscriber(data);
    });
  }
}

export default EventObserver;
