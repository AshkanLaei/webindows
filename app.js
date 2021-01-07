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

document.querySelectorAll('#login-accounts img').forEach(element => {
	element.onclick = anime.timeline({
		easing: 'easeInOutSine',
		duration: 200,
		autoplay: false
	}).add({
		targets: '#login-accounts',
		opacity: 0,
		begin: function () {
			document.getElementById('login-accounts').style.pointerEvents = 'none'
			document.getElementById('choosedAccount').src = element.src
		}
	}).add({
		targets: '#choosedAccount',
		opacity: 1
	}, '-=200').add({
		targets: '#login',
		background: ['rgba(34, 34, 34, 1)', 'rgba(34, 34, 34, 0)']
	}, '-=200').add({
		targets: ['#login-pass', '#login-pass-ok'],
		opacity: 1,
		begin: function () {
			document.getElementById('login-pass').style.pointerEvents = document.getElementById('login-pass-ok').style.pointerEvents = 'all'
			document.getElementById('login-pass').focus()
		}
	}, '-=200').play
})

const srcpass = {
	'profile1.jpg': 'cAlC',
	'profile2.jpg': 'c0ff33',
	'profile3.jpg': 'ME&flower:1999',
	'profile4.jpg': '%3CH0+TrEE%%*'
}

document.getElementById('login-pass').onchange = document.getElementById('login-pass-ok').onclick = () => {
	if (document.getElementById('login-pass').value != srcpass[document.getElementById('choosedAccount').src.split('/').reverse()[0]]) return
	anime({
		targets: '#login',
		opacity: 0,
		duration: 1000,
		easing: 'easeInOutSine',
		complete: function () {
			document.getElementById('login').style.display = 'none'
		}
	})
}