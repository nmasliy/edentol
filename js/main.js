window.addEventListener("DOMContentLoaded", function () {
	function initMenu() {
		const $html = document.querySelector("html");
		const $headerMenu = document.querySelector(".header__menu");
		const $navLinks = $headerMenu.querySelectorAll(
			".header__navigation ul li a"
		);
		const $headerBtn = document.querySelector(".header__burger");
		const $headerCloseBtn = document.querySelector(".header__close");
		const $headerOverlay = document.querySelector(".header__overlay");
		const TRANSITION_DELAY = 300;

		let isInit = false;

		const checkScreenWidth = () => {
			const MOBILE_MENU_BREAKPOINT = 1024;
			// Активируем меню только на экранах <= 1024
			if (window.innerWidth <= MOBILE_MENU_BREAKPOINT && !isInit) {
				isInit = true;
				$headerBtn.addEventListener("click", openMenu);
				$headerCloseBtn.addEventListener("click", closeMenu);
				$headerOverlay.addEventListener("click", closeMenu);
				$navLinks.forEach((item) => {
					item.addEventListener("click", closeMenu);
				});
			} else {
				window.addEventListener("resize", checkScreenWidth);
			}
		};

		checkScreenWidth();

		function openMenu() {
			$headerOverlay.style.display = "block";
			$headerMenu.style.display = "flex";
			$html.classList.add("overflow-hidden");

			setTimeout(function () {
				$headerOverlay.classList.add("active");
				$headerMenu.classList.add("active");
			}, 50);
		}

		function closeMenu() {
			$headerOverlay.classList.remove("active");
			$headerMenu.classList.remove("active");
			$html.classList.remove("overflow-hidden");

			setTimeout(function () {
				$headerOverlay.style.display = "";
				$headerMenu.style.display = "";
			}, TRANSITION_DELAY);
		}
	}

	function initCountdown() {
		const $timers = document.querySelectorAll(".timer");

		$timers.forEach(($timer) => {
			function getTimeRemaining(endtime) {
				var t = Date.parse(endtime) - Date.parse(new Date());
				var seconds = Math.floor((t / 1000) % 60);
				var minutes = Math.floor((t / 1000 / 60) % 60);
				var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
				var days = Math.floor(t / (1000 * 60 * 60 * 24));
				return {
					total: t,
					days: days,
					hours: hours,
					minutes: minutes,
					seconds: seconds,
				};
			}

			function initializeClock(endtime) {
				const $days = $timer.querySelector(".timer__num--days span");
				// const $hours = document.querySelector('#timer-hours')
				// const $minutes = document.querySelector('#timer-minutes')
				// const $seconds = document.querySelector('#timer-seconds')

				function updateClock() {
					var t = getTimeRemaining(endtime);

					if (t.total <= 0) {
						clearInterval(timeinterval);
						var deadline = new Date(
							Date.parse(endtime) + 7 * 24 * 60 * 60 * 1000
						);
						initializeClock(deadline);
					}

					$days.innerHTML = t.days;
					// $hours.innerHTML = ('0' + t.hours).slice(-2)
					// $minutes.innerHTML = ('0' + t.minutes).slice(-2)
					// $seconds.innerHTML = ('0' + t.seconds).slice(-2)
				}

				updateClock();
				var timeinterval = setInterval(updateClock, 1000);
			}

			var deadline = $timer.dataset.date;
			initializeClock(deadline);
		});
	}

	function initHeroSlider() {
		const swiper = new Swiper(".hero__slider", {
			initialSlide: 1,
			spaceBetween: 16,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				// when window width is >= 320px
				320: {
					slidesPerView: "auto",
					centeredSlides: true,
				},
				// when window width is >= 768
				768: {
					slidesPerView: 1,
					spaceBetween: 16,
					centeredSlides: false,
				},
			},
		});
	}

	function initCoopSlider() {
		if (window.innerWidth > 600) {
			const $parent = document.querySelector(".coop__slider");
			const $wrapper = $parent.querySelector(".coop__list");
			const $items = $wrapper.querySelectorAll(".coop__item");

			$parent.classList.add("swiper");
			$wrapper.classList.add("swiper-wrapper");
			$items.forEach((slide) => slide.classList.add("swiper-slide"));

			const swiper = new Swiper(".coop__slider", {
				slidesPerView: "auto",
				spaceBetween: 30,
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});
		}
	}

	function initPlayer() {
		const $videoWrapper = document.querySelector(".video__wrapper");
		const $video = $videoWrapper.querySelector("video");
		// Event listener for the play/pause button
		$video.addEventListener("click", function (e) {
			e.preventDefault();
			if ($video.paused == true) {
				$videoWrapper.classList.remove("overlay");
				$video.controls = true;
				$video.play();
			} else {
				// $videoWrapper.classList.add('overlay')
				// $video.controls = false
				$video.pause();
			}
		});
	}

	function initPhoneMask() {
		const $phones = document.querySelectorAll(".form__phone");

		$phones.forEach((phone) => {
			IMask(phone, {
				mask: "+{7}(000)000-00-00",
			});
		});
	}

	function initSystem() {
		const $itemsWrapper = document.querySelector(".system__elements");

		$itemsWrapper.addEventListener("click", function (e) {
			const $btn = e.target.closest(".system__element-btn");
			const $item = e.target.closest(".system__element");
			if (window.innerWidth > 768) {
				if ($btn) {
					$item.classList.toggle("active");
				}
			} else {
				if ($btn) {
					const $active = $itemsWrapper.querySelector(
						".system__element.active"
					);
					if ($active) {
						$active.classList.remove("active");
					}
					$item.classList.add("active");
				}
			}
		});
	}

	function initAjaxForms() {
		const $forms = document.querySelectorAll(".form-telegram");
		const $modals = document.querySelectorAll(".modal");

		function closeModal(id) {
			document.querySelector("html").classList.remove("overflow-hidden");
			document.querySelector("#" + id).setAttribute("aria-hidden", true);
			setTimeout(function () {
				document.querySelector("#" + id).classList.remove("is-open");
			}, 300);
		}

		$forms.forEach((form) => {
			form.addEventListener("submit", onSubmit);

			function onSubmit(e) {
				e.preventDefault();

				const name = form.querySelector(".form__name").value;
				const phone = form.querySelector(".form__phone").value;

				minAjax({
					url: "telegram.php", //request URL
					type: "POST", //Request type GET/POST
					//Send Data in form of GET/POST
					data: {
						name: name,
						phone: phone,
					},
					//CALLBACK FUNCTION with RESPONSE as argument
					success: function (data) {
						$modals.forEach((modal) => {
							closeModal(modal.id);
						});
						openModal("modal-2");
					},
				});
			}
		});
	}

	function initFormValidate() {
		const $forms = document.querySelectorAll(".form");

		$forms.forEach((form) => {
			const $inputs = form.querySelectorAll(".form__input");

			$inputs.forEach((input) => {
				input.addEventListener("blur", function () {
					if (!input.value) {
						input.classList.add("invalid");
					} else {
						input.classList.remove("invalid");
					}
				});
				input.addEventListener("input", function () {
					if (!input.value) {
						input.classList.add("invalid");
					} else {
						input.classList.remove("invalid");
					}
				});
			});
		});
	}

	function initModals() {
		const $modals = document.querySelectorAll(".modal");
		const $modalsTriggers = document.querySelectorAll(
			"[data-micromodal-trigger]"
		);
		const $modalsCloseTriggers = document.querySelectorAll(
			"[data-micromodal-close]"
		);

		$modalsTriggers.forEach((item) => {
			item.addEventListener("click", (e) => {
				e.preventDefault();
				showModal(item.dataset.micromodalTrigger);
			});
		});

		$modalsCloseTriggers.forEach((item) => {
			item.addEventListener("click", (e) => {
				if (e.target.closest(".modal__close") ||
					(!e.target.closest(".modal__close") &&
						!e.target.closest(".modal__container")) ) {
					e.preventDefault();
					closeModal(item.closest(".modal").id);
				}
			});
		});

		function showModal(id) {
			document.querySelector("html").classList.add("overflow-hidden");
			document.querySelector("#" + id).setAttribute("aria-hidden", false);
			setTimeout(function () {
				document.querySelector("#" + id).classList.add("is-open");
			}, 1);
		}

		function closeModal(id) {
			document.querySelector("html").classList.remove("overflow-hidden");
			document.querySelector("#" + id).setAttribute("aria-hidden", true);
			setTimeout(function () {
				document.querySelector("#" + id).classList.remove("is-open");
			}, 300);
		}

		function checkBestRadio() {
			const $buttons = document.querySelectorAll('.best__btn');

			$buttons.forEach(btn => {
				btn.addEventListener('click', function() {
					const value = btn.closest('.best__item').dataset.variant

					const radio = document.querySelector(`input[type="radio"][name="variant"][value="${value}"]`);

					radio.checked = true;

					console.log(radio)
				})
			})
			// document.querySelector('input[name="variants"]:checked').value;
		}
		checkBestRadio();

		// if ($modals.length > 0) {
		// 	MicroModal.init({
		// 		onShow: (modal) => {
		// 			document.querySelector("html").classList.add("overflow-hidden");
		// 		},
		// 		onClose: (modal) => {
		// 			document.querySelector("html").classList.remove("overflow-hidden");
		// 		},
		// 		disableFocus: true,
		// 		openClass: "is-open",
		// 		awaitOpenAnimation: true,
		// 		awaitCloseAnimation: true,
		// 		disableScroll: false,
		// 	});
		// }
	}

	function initAboutShowMore() {
		const $button = document.querySelector(".about__more");
		const $list = document.querySelector(".about__list");
		const moreText = $button.dataset.more;
		const lessText = $button.dataset.less;

		$button.addEventListener("click", function () {
			if ($list.classList.contains("active")) {
				$button.textContent = moreText;
				$list.classList.remove("active");
			} else {
				$button.textContent = lessText;
				$list.classList.add("active");
			}
		});
	}

	function initMobileSlider(parent, wrapper, items, breakpoint = 768) {
		if (window.innerWidth <= breakpoint) {
			const $parent = document.querySelector(parent);
			const $wrapper = $parent.querySelector(wrapper);
			const $items = $wrapper.querySelectorAll(items);

			$parent.classList.add("swiper");
			$wrapper.classList.add("swiper-wrapper");
			$items.forEach((slide) => slide.classList.add("swiper-slide"));

			const swiper = new Swiper(parent, {
				slidesPerView: "auto",
				spaceBetween: 16,
				// autoHeight: true
			});
		}
	}

	initMenu();
	initModals();
	initCountdown();
	initHeroSlider();
	initCoopSlider();
	initPlayer();
	initSystem();
	initAjaxForms();
	initFormValidate();
	initPhoneMask();
	initAboutShowMore();
	initMobileSlider(".best__content", ".best__list", ".best__item", 1024);
	initMobileSlider(".extra__content", ".extra__list", ".extra__item", 1024);
	initMobileSlider(".why__content-wrapper", ".why__content", ".why__col");
});
