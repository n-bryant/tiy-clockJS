// type coercion:
/*
- javascript tries to fix data types for you
- === explicitly tells javascript to evaluate both the value and the data type
*/

// Immediately invoked function expression (IIFE)
// Anything inside has its own global scope.  If you put it in something else, its scope is safe.
(function() {
  "use strict";

  const clock = {
    startBtn: document.querySelector('.start'),
    stopBtn: document.querySelector('.stop'),
    currentDate: null,
    hands: {
      seconds: document.querySelector('.second-hand'),
      minutes: document.querySelector('.min-hand'),
      hours: document.querySelector('.hour-hand')
    },
    isRunning: false,
    timer: null,
    getDate() { // returns a new Date object
      return new Date();
    },
    rotateHands(time = this.getDate()) { // sets default value if no argument given
      // const time = time ? time : this.getDate(); // ternary statement version
      // const time = timeObj || this.getDate(); // provides a failsafe default value
      const seconds = time.getSeconds();
      const minutes = time.getMinutes();
      const hours = time.getHours();

      const secondsDeg = ((seconds / 60) * 360) + 90; // The 90 compensates for the 90deg applied to the divs in CSS
      const minutesDeg = ((minutes / 60) * 360) + 90;
      const hoursDeg = ((hours / 12) * 360) + 90 + (minutes * .5); // keeps hour hand moving as minutes progresses

      // prevents the seconds hand from animating counter-clockwise to get back to 0
      if (seconds === 0 ) {
        this.hands.seconds.style.transition = 'none';
      } else if (seconds > 0 && this.hands.seconds.style.transition  === 'none') {
        // adds transition back after seconds passes 0
        this.hands.seconds.style.transition = 'transform 0.05s cubic-bezier(0.15, 2.94, 0.25, 1)';
      }

      this.hands.seconds.style.transform = `rotate(${secondsDeg}deg)`;
      this.hands.minutes.style.transform = `rotate(${minutesDeg}deg)`;
      this.hands.hours.style.transform = `rotate(${hoursDeg}deg)`;
    },
    run() {
      if (this.isRunning) return; // prevents setting a new interval on each click
      this.currentDate = this.getDate(); // calling outside of setInterval once to allow for no delay in first setting
      this.rotateHands();

      this.timer = setInterval(() => { // specifies that the scope for setInterval be run at each instance of the specified duration
        this.currentDate = this.getDate();
        this.rotateHands(); // passing currentDate as a parameter for rotateHands to prevent repetition
      }, 1000); // duration in ms

      this.isRunning = true; // sets boolean for preventing setting new intervals
    },
    stopClock() {
      clearInterval(this.timer); // removes interval applied
      this.isRunning = false; // sets isRunning to false to allow starting again on next startBtn click
    },
    init() {
      // this.button.removeEventListener('click', () => this.run());
      // const _this = this; // assumes the immediate scope.  use this if you use function() instead of () =>
      // () => does not create a new scope like function() does
      this.startBtn.addEventListener('click', () => this.run());
      this.stopBtn.addEventListener('click', () => this.stopClock());
    }
  };

  clock.init();
})();
