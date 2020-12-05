'use strict';
window.addEventListener('DOMContentLoaded', function() {

  class Slider {
    constructor(selector, options) {
      this.$el = document.querySelector(selector);
      this.minValue = options.minValue;
      this.maxValue = options.maxValue;
      this.curValue = options.curValue;
      this.render();
      this.$sliderLine = this.$el.querySelector('.ad-slider__line');
      this.$roller = this.$el.querySelector('.ad-slider__roller');
      this.$sliderValue = this.$el.querySelector('.ad-slider__number');
      this.$sliderTable = this.$el.querySelector('.ad-slider__value');
      this.$input = this.$el.querySelector('.ad-slider__input');
      this.initCurValue();
      this.scroll();
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
      `);
    }

    scroll() {
      this.$roller.addEventListener('mousedown', e => {
        e.preventDefault();
        const shiftX = e.clientX - this.$roller.getBoundingClientRect().left;
        const mouseMove = e => {
          let newLeft = e.clientX - shiftX - this.$sliderLine.getBoundingClientRect().left;
          let rightEdge = this.$sliderLine.offsetWidth - this.$roller.offsetWidth;
          if (newLeft < 0) {
            newLeft = 0;
          }
          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }
          this.$roller.style.left = newLeft + 'px';
          const valueOnSlider = Math.round(this.minValue + (this.maxValue - this.minValue) * (parseInt(newLeft, 10) / rightEdge));
          this.$sliderValue.textContent = valueOnSlider;
          this.$sliderTable.style.left = newLeft + this.$roller.offsetWidth / 2 + 'px';
          this.$input.value = valueOnSlider;
        };

        function mouseUp() {
          document.removeEventListener('mouseup', mouseUp);
          document.removeEventListener('mousemove', mouseMove);
        }
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
      });
      document.addEventListener('dragstart', () => false);
    }

    initCurValue() {
      const rightEdge = this.$sliderLine.offsetWidth - this.$roller.offsetWidth;
      if (this.curValue > this.maxValue || this.curValue < this.minValue) {
        alert('Текщее значение введено вне интервала между минимальным и максимальным значением');
      } else {
        this.$sliderValue.textContent = this.curValue;
        const newLeft = Math.round(rightEdge * (this.curValue - this.minValue) / (this.maxValue - this.minValue));
        this.$roller.style.left = newLeft + 'px';
        this.$sliderTable.style.left = newLeft + this.$roller.offsetWidth / 2 + 'px';
        this.$input.value = this.curValue;
      }
    }


  }


  const slider = new Slider('.container', {
    minValue: 1000000,
    maxValue: 1000000000,
    curValue: 50000000
  });


  const slider1 = new Slider('.container1', {
    minValue: 1,
    maxValue: 10,
    curValue: 5
  });
});