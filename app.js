const $ = document.querySelector.bind(document), $$ = document.querySelectorAll.bind(document)

anime.timeline({
	easing: 'easeInOutSine'
}).add({
	targets: '#login-loader circle',
	strokeDasharray: ['0 60', '56.6 60'],
	duration: 5000
}).add({
	targets: '#login-loader circle',
	opacity: 0,
	duration: 200
}).add({
	targets: '#login-loader',
	width: 200,
	height: 200,
	marginBottom: 0,
	duration: 200
}, '-=200').add({
	targets: '#login-accounts',
	height: 140,
	duration: 200
}, '-=200')

$$('#login-accounts img').forEach(element => {
	element.onclick = anime.timeline({
		easing: 'easeInOutSine',
		duration: 200,
		autoplay: false
	}).add({
		targets: '#login-accounts',
		opacity: 0,
		begin: function () {
			$('#login-accounts').style.pointerEvents = 'none'
			$('#choosedAccount').src = element.src
		}
	}).add({
		targets: '#choosedAccount',
		opacity: 1,
		complete: function () {
			$('#choosedAccount').style.pointerEvents = 'all'
		}
	}, '-=200').add({
		targets: '#login',
		background: ['rgba(34, 34, 34, 1)', 'rgba(34, 34, 34, 0)']
	}, '-=200').add({
		targets: ['#login-pass', '#login-pass-ok'],
		opacity: 1,
		begin: function () {
			$('#login-pass').style.pointerEvents = $('#login-pass-ok').style.pointerEvents = 'all'
			$('#login-pass').focus()
		}
	}, '-=200').play
})

$('#choosedAccount').onclick = () => anime.timeline({
	easing: 'easeInOutSine',
	duration: 200
}).add({
	targets: '#login-accounts',
	opacity: [0, 1],
	complete: function () {
		$('#login-accounts').style.pointerEvents = 'all'
	}
}).add({
	targets: '#choosedAccount',
	opacity: [1, 0],
	complete: function () {
		$('#choosedAccount').style.pointerEvents = 'none'
	}
}, '-=200').add({
	targets: '#login',
	background: 'rgba(34, 34, 34, 1)'
}, '-=200').add({
	targets: ['#login-pass', '#login-pass-ok'],
	opacity: 0,
	complete: function () {
		$('#login-pass').style.pointerEvents = $('#login-pass-ok').style.pointerEvents = 'none'
		$('#login-pass').blur()
	}
}, '-=200')

const srcpass = {
	'profile1.jpg': 'cAlC',
	'profile2.jpg': 'c0ff33',
	'profile3.jpg': 'ME&flower:1999',
	'profile4.jpg': '%3CH0+TrEE%%*'
}

$('#login-pass').onchange = $('#login-pass-ok').onclick = () => {
	if ($('#login-pass').value != srcpass[$('#choosedAccount').src.split('/').reverse()[0]]) return
	anime({
		targets: '#login',
		opacity: 0,
		duration: 1000,
		easing: 'easeInOutSine',
		complete: function () {
			$('#login').style.display = 'none'
		}
	})
}

let lastClickedDesktopIcon = {}

const unselectDesktopIcons = () => $$('#desktop-icons .icon').forEach(btn => btn.classList.remove('selected'))

$('#desktop-icons').onclick = event => {
	if (event.target === $('#desktop-icons')) unselectDesktopIcons()
}
$$('#desktop-icons .icon').forEach(btn => {
	btn.onclick = (event) => {
		if (!event.ctrlKey) {
			if (!lastClickedDesktopIcon.ctrl && btn === lastClickedDesktopIcon.element && btn.classList.contains('selected')) {
				if (new Date() - lastClickedDesktopIcon.time < 500) {
					runApplication(btn.dataset.app)
				} else {
					btn.dataset.name = prompt('Enter shortcut new name', btn.dataset.name) || btn.dataset.name
				}
			}
			unselectDesktopIcons()
		}
		lastClickedDesktopIcon.element = btn
		lastClickedDesktopIcon.time = new Date()
		lastClickedDesktopIcon.ctrl = event.ctrlKey
		btn.classList[event.ctrlKey ? 'toggle' : 'add']('selected')
	}
})

function runApplication(appName) {
	alert(`Running Application ${appName}`)
}