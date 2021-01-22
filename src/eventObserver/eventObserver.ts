export default class EventObserver {
  public observers: { [event: string]: Function[] };

  constructor() {
    this.observers = {};
  }

  public addObserver(event: string, newObserver: Function): void {
    if (this.observers[event]) {
      if (this.observers[event].includes(newObserver)) {
        throw new Error('Observer is already in the list!');
      }
      this.observers[event].push(newObserver);
    } else {
      this.observers[event] = [];
      this.observers[event].push(newObserver);
    }
  }

  public broadcast(event: string, data?: any): void {
    if (this.observers[event] === undefined) {
      throw new Error('There is no such observer in the list!');
    }
    const observersClone = this.observers[event].slice(0);
    observersClone.forEach((subscriber) => {
      subscriber(data);
    });
  }
}
