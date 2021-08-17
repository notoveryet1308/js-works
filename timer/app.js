

const durationInput = document.querySelector('#duration')
const start = document.querySelector('#start')
const pause = document.querySelector('#pause')

const circle = document.querySelector('#svg-circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI
circle.setAttribute('stroke-dasharray', perimeter)
let duration;
const timer = new Timer(durationInput, start, pause, {
	onStart(totalDuration) {
		duration  = totalDuration
	},
	onTick(timeLeft) {
		circle.setAttribute('stroke-dashoffset', 
		(perimeter * timeLeft)/ duration - perimeter)
	},
	onComplete() {
		console.log('timer completed')
	},
})
