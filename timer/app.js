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
			this.onStart()
		}
		this.durationInput.readOnly = true
		this.tick()
		this.interval = setInterval(this.tick, 1000)
	}

	tick = () => {
		if (this.timeLeft <= 0) {
			this.pause()
			this.onComplete && this.onComplete()
		} else {
			this.timeLeft = this.timeLeft - 1
			this.onTick && this.onTick()
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
		this.durationInput.value = time
	}
}

const durationInput = document.querySelector('#duration')
const start = document.querySelector('#start')
const pause = document.querySelector('#pause')

const timer = new Timer(durationInput, start, pause, {
	onStart() {
		console.log('timer started')
	},
	onTick() {
		console.log('timer just clicked down')
	},
	onComplete() {
		console.log('timer completed')
	},
})
