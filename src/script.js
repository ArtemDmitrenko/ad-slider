'use strict';
window.addEventListener('DOMContentLoaded', function() {

  // class Slider {
  //   constructor(selector, options) {
  //     this.$el = document.querySelector(selector);
  //     this.range = (options.range) ? options.range : { min: 0, max: 100 };
  //     this.defValue = options.defValue;
  //     // this.displayValue = (options.displayValue) ? options.displayValue : false;
  //     this.render();
  //     this.$sliderLine = this.$el.querySelector('.ad-slider__line');
  //     this.$roller = this.$el.querySelector('.ad-slider__roller');
  //     this.$sliderValue = this.$el.querySelector('.ad-slider__number');
  //     this.$sliderTable = this.$el.querySelector('.ad-slider__value');
  //     this.$input = this.$el.querySelector('.ad-slider__input');
  //     this.initdefValue();
  //     this.scroll();
  //   }

  //   render() {
  //     this.$el.insertAdjacentHTML('afterbegin', `
  //     <div class="ad-slider__input"></div>
  //     <div class="ad-slider">
  //       <div class="ad-slider__line">
  //         <div class="ad-slider__roller"></div>
  //       </div>
  //       <div class="ad-slider__value">
  //         <p class="ad-slider__number"></p>
  //       </div>
  //     </div>
  //     `);
  //   }

  //   scroll() {
  //     this.$roller.addEventListener('mousedown', e => {
  //       e.preventDefault();
  //       const shiftX = e.clientX - this.$roller.getBoundingClientRect().left;
  //       const mouseMove = e => {
  //         let newLeft = e.clientX - shiftX - this.$sliderLine.getBoundingClientRect().left;
  //         let rightEdge = this.$sliderLine.offsetWidth - this.$roller.offsetWidth;
  //         if (newLeft < 0) {
  //           newLeft = 0;
  //         }
  //         if (newLeft > rightEdge) {
  //           newLeft = rightEdge;
  //         }
  //         this.$roller.style.left = newLeft + 'px';
  //         const valueOnSlider = Math.round(this.range.min + (this.range.max - this.range.min) * (parseInt(newLeft, 10) / rightEdge));
  //         this.$sliderValue.textContent = valueOnSlider;
  //         this.$sliderTable.style.left = newLeft + this.$roller.offsetWidth / 2 + 'px';
  //         this.$input.value = valueOnSlider;
  //       };

  //       function mouseUp() {
  //         document.removeEventListener('mouseup', mouseUp);
  //         document.removeEventListener('mousemove', mouseMove);
  //       }
  //       document.addEventListener('mousemove', mouseMove);
  //       document.addEventListener('mouseup', mouseUp);
  //     });
  //     document.addEventListener('dragstart', () => false);
  //   }

  //   initdefValue() {
  //     const rightEdge = this.$sliderLine.offsetWidth - this.$roller.offsetWidth;
  //     if (this.defValue > this.range.max || this.defValue < this.range.min) {
  //       alert('Текщее значение введено вне интервала между минимальным и максимальным значением');
  //     } else {
  //       this.$sliderValue.textContent = this.defValue;
  //       const newLeft = Math.round(rightEdge * (this.defValue - this.range.min) / (this.range.max - this.range.min));
  //       this.$roller.style.left = newLeft + 'px';
  //       this.$sliderTable.style.left = newLeft + this.$roller.offsetWidth / 2 + 'px';
  //       this.$input.value = this.defValue;
  //     }
  //   }
  // }

  // const slider = new Slider('.container', {
  //   range: { min: 10, max: 1000 },
  //   defValue: 50,
  //   // displayValue: true
  // });

  // const slider1 = new Slider('.container1', {
  //   defValue: 5,
  //   // displayValue: true
  // });

  class EventObserver {
    constructor() {
      this.observers = [];
    }

    addObserver(observer) {
      this.observers.push(observer);
    }
    broadcast(data) {
      this.observers.forEach(subscriber => {
        subscriber(data);
      });
    }
  }

  class View {
    constructor(observer, model, selector) {
      this.model = model;
      this.$el = document.querySelector(selector);
      this.render();
      this.$adSlider = this.$el.querySelector('.ad-slider');
      this.$sliderLine = this.$el.querySelector('.ad-slider__line');
      this.$input = this.$el.querySelector('.ad-slider__input');
      this.$sliderValue = this.$el.querySelector('.ad-slider__number');
      this.$input = this.$el.querySelector('.example');

      // this.displayValue = (options.displayValue) ? options.displayValue : false;
      this.$sliderTable = this.$el.querySelector('.ad-slider__value');
      this.$roller = this.$el.querySelector('.ad-slider__roller');
      // this.initdefValue();
      observer.addObserver(() => this.initdefValue());
    }

    render() {
      this.$el.insertAdjacentHTML('afterbegin', `
      <div class="ad-slider__input"></div>
      <div class="ad-slider">
        <div class="ad-slider__line">
          <div class="ad-slider__roller"></div>
        </div>
        <div class="ad-slider__value">
          <p class="ad-slider__number"></p>
        </div>
      </div>
      <input class="example" type="text"></input>
      `);
    }

    initdefValue() {
      const rightEdge = this.$sliderLine.offsetWidth - this.$roller.offsetWidth;
      if (this.model.defValue > this.model.range.max || this.model.defValue < this.model.range.min) {
        alert('Текщее значение введено вне интервала между минимальным и максимальным значением');
      } else {
        this.$sliderValue.textContent = this.model.defValue;
        const newLeft = Math.round(rightEdge * (this.model.defValue - this.model.range.min) / (this.model.range.max - this.model.range.min));
        this.$roller.style.left = newLeft + 'px';
        this.$sliderTable.style.left = newLeft + this.$roller.offsetWidth / 2 + 'px';
        this.$input.value = this.model.defValue;
      }
    }
    fillInput() {
      this.$input.value = this.model.getValue();
    }
  }

  class Model {
    constructor(options) {
      this.range = (options.range) ? options.range : { min: 0, max: 100 };
      this.defValue = (options.defValue) ? options.defValue : 50;
    }
    get value() {
      return this.defValue;
    }
    set value(value) {
      this.defValue = value;
      observer.broadcast();
    }


  }

  const observer = new EventObserver();
  const model = new Model(observer, {
    range: { min: 0, max: 100 },
    defValue: 50
  });
  const view = new View(observer, model, '.container');


  model.value = 120;










});