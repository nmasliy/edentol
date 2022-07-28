window.addEventListener('DOMContentLoaded', function () {
	function initMenu() {
		const $html = document.querySelector('html')
		const $headerMenu = document.querySelector('.menu')
		const $headerBtn = document.querySelector('.header__burger')
		const $headerCloseBtn = document.querySelector('.menu__close')
		const $headerOverlay = document.querySelector('.header__overlay')
		const TRANSITION_DELAY = 500

		let isInit = false

		const checkScreenWidth = () => {
			const MOBILE_MENU_BREAKPOINT = 1024
			// Активируем меню только на экранах <= 1024
			if (window.innerWidth <= MOBILE_MENU_BREAKPOINT && !isInit) {
				isInit = true
				$headerBtn.addEventListener('click', openMenu)
				$headerCloseBtn.addEventListener('click', closeMenu)
				$headerOverlay.addEventListener('click', closeMenu)
			} else {
				window.addEventListener('resize', checkScreenWidth)
			}
		}

		checkScreenWidth()

		function openMenu() {
			$headerOverlay.style.display = 'block'
			$headerMenu.style.display = 'block'
			$html.classList.add('overflow-hidden')

			setTimeout(function () {
				$headerOverlay.classList.add('active')
				$headerMenu.classList.add('active')
			}, 50)
		}

		function closeMenu() {
			$headerOverlay.classList.remove('active')
			$headerMenu.classList.remove('active')
			$html.classList.remove('overflow-hidden')

			setTimeout(function () {
				$headerOverlay.style.display = ''
				$headerMenu.style.display = ''
			}, TRANSITION_DELAY)
		}
	}

	function initCountdown() {
		function getTimeRemaining(endtime) {
			var t = Date.parse(endtime) - Date.parse(new Date())
			var seconds = Math.floor((t / 1000) % 60)
			var minutes = Math.floor((t / 1000 / 60) % 60)
			var hours = Math.floor((t / (1000 * 60 * 60)) % 24)
			var days = Math.floor(t / (1000 * 60 * 60 * 24))
			return {
				total: t,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds,
			}
		}

		function initializeClock(id, endtime) {
			var clock = document.getElementById(id)
			const $days = document.querySelector('#timer-days')
			const $hours = document.querySelector('#timer-hours')
			const $minutes = document.querySelector('#timer-minutes')
			const $seconds = document.querySelector('#timer-seconds')

			function updateClock() {
				var t = getTimeRemaining(endtime)

				if (t.total <= 0) {
					clearInterval(timeinterval)
					var deadline = new Date(Date.parse(endtime) + 7 * 24 * 60 * 60 * 1000)
					initializeClock('clockdiv', deadline)
				}

				$days.innerHTML = t.days
				$hours.innerHTML = ('0' + t.hours).slice(-2)
				$minutes.innerHTML = ('0' + t.minutes).slice(-2)
				$seconds.innerHTML = ('0' + t.seconds).slice(-2)
			}

			updateClock()
			var timeinterval = setInterval(updateClock, 1000)
		}

		var deadline = 'July 30 2022 20:00:00 GMT+0300'
		initializeClock('clockdiv', deadline)
	}

	function initHeroSlider() {
		const swiper = new Swiper('.hero__slider', {
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
	}

	function initPlayer() {
		const $videoWrapper = document.querySelector('.video__wrapper')
		const $video = $videoWrapper.querySelector('video')
		// Event listener for the play/pause button
		$video.addEventListener('click', function (e) {
			e.preventDefault()
			if ($video.paused == true) {
				$videoWrapper.classList.remove('overlay')
				$video.controls = true
				$video.play()
			} else {
				// $videoWrapper.classList.add('overlay')
				// $video.controls = false
				$video.pause()
			}
		})
	}

	function initBestHover() {
		$items = document.querySelectorAll('.best__item');

		$items.forEach(item => {
			const $hiddenBlock = item.querySelector('.best__info')
			const blockHeight = $hiddenBlock.offsetHeight
			let isHover = false;
			$hiddenBlock.style.display = 'none'
			
			item.addEventListener('mouseenter', function() {
				isHover = true
				$hiddenBlock.style.height = '0'
				$hiddenBlock.style.margin = '0'
				$hiddenBlock.style.display = ''
				setTimeout(function() {
					$hiddenBlock.style.height = blockHeight + 'px'
					$hiddenBlock.style.margin = ''
				}, 1)
			})
			item.addEventListener('mouseleave', function() {
					isHover = false;
					$hiddenBlock.style.height = '0'
					$hiddenBlock.style.margin = '0'
					setTimeout(function () {
						if (!isHover) {
							$hiddenBlock.style.display = 'none'
						}
					}, 300)
			})
		})
	}
	
	initMenu()
	initCountdown()
	initHeroSlider()
	initPlayer()
	initBestHover()
})
