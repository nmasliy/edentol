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
					if (t.days > 0) {
						$days.innerHTML = t.days;
					}
					// $hours.innerHTML = ('0' + t.hours).slice(-2)
					// $minutes.innerHTML = ('0' + t.minutes).slice(-2)
					// $seconds.innerHTML = ('0' + t.seconds).slice(-2)
				}

				updateClock();
				var timeinterval = setInterval(updateClock, 1000);
			}

			var deadline = new Date($timer.dataset.date);
			// var deadline = 'July 30 2022 20:00:00 GMT+0300';
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
				document.querySelector('#' + id + ' form')?.reset();
			}, 300);
		}

		$forms.forEach((form) => {
			form.addEventListener("submit", onSubmit);
			const action = form.getAttribute('action')
			
			function onSubmit(e) {
				let isValid = true;
				
				const $inputs = form.querySelectorAll('.form__input');
				$inputs.forEach(input => {
					if (input.classList.contains('invalid')) isValid = false;
				})

				e.preventDefault();

				if (isValid) {
					const name = form.querySelector(".form__name").value;
					const phone = form.querySelector(".form__phone").value;
					const radio = form.querySelector(".form__radio input:checked")?.value || null;
					const variant = document.querySelector(`.bars-data__item[data-variant="${radio}"] .bars-data__name`)?.value;
	
					const data = [
						'Самовывоз + комплект фильтров',
						'Доставка + установка + комплект фильтров',
						'Доставка + установка + полное обслуживание на год + комплект фильтров на 3 года',
						'Доставка + установка + полное обслуживание на 3 года + комплект фильтров на 3 года',
					]
					
					const itemName = form.querySelector('.modal__title span')?.innerText || null;
	
					minAjax({
						url: action, //request URL
						type: "POST", //Request type GET/POST
						//Send Data in form of GET/POST
						data: {
							name: name,
							phone: phone,
							minibar: itemName,
							variant: data[radio - 1]
						},
						//CALLBACK FUNCTION with RESPONSE as argument
						success: function (data) {
							$modals.forEach((modal) => {
								closeModal(modal.id);
							});
							setTimeout(function() {
								showModal("modal-2");
							}, 320)
						},
					});
				}
			}
		});
	}

	function initFormValidate() {
		const $forms = document.querySelectorAll(".form");

		$forms.forEach((form) => {
			const $inputs = form.querySelectorAll(".form__input");
			const PHONE_LENGTH = 17;
			
			$inputs.forEach((input) => {
				input.addEventListener("blur", function () {
					if (!input.value || (input.classList.contains('form__phone') && input.value.length != PHONE_LENGTH - 1)) {
						input.classList.add("invalid");
					} else {
						input.classList.remove("invalid");
					}
				});
				
				input.addEventListener("input", function () {
					if (!input.value || (input.classList.contains('form__phone') && input.value.length != PHONE_LENGTH)) {
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
					e.target.closest(".modal-thanks__btn") ||
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
				document.querySelector('#' + id + ' form')?.reset();
				$modalBtnToNextStep.closest('.modal-buy')?.classList.remove('step-2');
			}, 300);
		}

		const $modalBtnToNextStep = document.querySelector('#modal-buy-btn');

		$modalBtnToNextStep.addEventListener('click', function() {
			$modalBtnToNextStep.closest('.modal-buy').classList.add('step-2');
		})

		function setPackageInfo() {
			const $buttonsBest = document.querySelectorAll('.best__btn');
			const $buttonHero = document.querySelector('.hero__btn');

			$buttonsBest.forEach(btn => {
				btn.addEventListener('click', function() {
					const value = btn.closest('.best__item').dataset.variant

					updateModal(value)
				})
			})
			$buttonHero.addEventListener('click', function() {
				const value = document.querySelector('.hero-slider__item.swiper-slide-active').dataset.variant

				updateModal(value)
			})
			
			function updateModal(variant) {
				const $modalForm = document.querySelector('.modal-buy');
				const $barsData = document.querySelector('.bars-data');
				const $barsItem = document.querySelector(`.bars-data__item[data-variant="${variant}"]`);

				const name = $barsItem.querySelector('.bars-data__name').value;
				const $pricesNew = $barsItem.querySelectorAll('.bars-data__price-new');
				const $pricesOld = $barsItem.querySelectorAll('.bars-data__price-old');

				$modalForm.querySelector('.form').dataset.variant = variant;
				
				$modalForm.querySelector('.modal__title span').textContent = name;

				$modalForm.querySelectorAll('.form__radio').forEach((item, index) => {
					item.querySelector('.form__radio-price-new').textContent = '₪ ' +  $pricesNew[index].value;
					item.querySelector('.form__radio-price-old').textContent = '₪ ' +  $pricesOld[index].value;
				})
			}
			
		}
		setPackageInfo();
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
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
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
