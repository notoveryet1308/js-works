class Timer {
	interval
	constructor(durationInput, startBtn, pauseBtn, callbacks) {
		this.durationInput = durationInput
		this.startBtn = startBtn
		this.pauseBtn = pauseBtn
		if (callbacks) {
			this.onStart = callbacks.onStart
			this.onTick = callbacks.onTick
			this.onComplete = callbacks.onComplete
		}
		this.startBtn.addEventListener('click', this.start)
		this.pauseBtn.addEventListener('click', this.pause)
	}

	start = () => {
		if (this.onStart) {
			this.onStart(this.timeLeft)
		}
		this.durationInput.readOnly = true
		this.tick()
		this.interval = setInterval(this.tick, 50)
	}

	tick = () => {
		if (this.timeLeft <= 0) {
			this.pause()
			this.onComplete && this.onComplete()
		} else {
			this.timeLeft = this.timeLeft - .05
			this.onTick && this.onTick(this.timeLeft)
		}
	}

	pause = () => {
		this.durationInput.readOnly = false
		clearInterval(this.interval)
	}

	get timeLeft() {
		return parseFloat(this.durationInput.value)
	}
	set timeLeft(time) {
		this.durationInput.value = time.toFixed(2)
	}
}