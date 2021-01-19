export default class EventObserver {
  private observers: { [event: string]: Function[] };

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

// function sum() {
//   return 5;
// }
// function sum2() {
//   return 5;
// }
// const ev = new EventObserver();
// ev.addObserver('click', sum);
// ev.addObserver('click', sum2);
// ev.addObserver('dass', sum2);
// ev.broadcast('dass');

// console.log(ev);
