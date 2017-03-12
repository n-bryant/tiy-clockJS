(function() {
    const clock = {
        button: document.querySelector('button'),
        hands: {
            seconds: document.querySelector('.second-hand'),
            minutes: document.querySelector('.min-hand'),
            hours: document.querySelector('.hour-hand')
        },
        currentDate: null,
        running: false,
        timer: null,
        getDate() {
            this.currentDate = new Date();
        },
        rotateHands(time) {
            const seconds = time.getSeconds();
            const secondsDeg = ((seconds / 60) * 360) + 90;
            const minutesDeg = ((time.getMinutes() / 60) * 360) + 90;
            const hoursDeg = (((time.getHours() / 12) * 360) + 90) + (time.getMinutes() * .5);

            if (seconds === 0) {
                this.hands.seconds.style.transition = 'none';
            } else if (seconds > 0 && this.hands.seconds.style.transition === 'none') {
                this.hands.seconds.style.transition = 'transform 0.05s cubic-bezier(0.15, 2.94, 0.25, 1)';
            }

            this.hands.seconds.style.transform = `rotate(${secondsDeg}deg)`;
            this.hands.minutes.style.transform = `rotate(${minutesDeg}deg)`;
            this.hands.hours.style.transform = `rotate(${hoursDeg}deg)`;
        },
        run() {
            if (this.running) return;

            this.timer = setInterval(() => {
                this.getDate();
                this.rotateHands(this.currentDate);
            }, 1000);
            this.running = true;
        },
        init() {
            this.button.addEventListener('click', () => this.run());
        }
    }

    clock.init();
})();
