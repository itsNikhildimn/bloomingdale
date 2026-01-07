<script>
	// This component is something of a Goliath since the project
	// necessitated having two distinctly different approaches to
	// the carousel animations; one for mobile and one for desktop:
	// Implimentation for mobile employs GSAP's Observer plugin
	// for swiping left and right through the pages - here the
	// pages loop back around to the beginning. While Desktop
	// uses scrollTrigger, allowing the user to scrub through the
	// pages by scrolling.

	// There are also conditionally rendered sports icons for the
	// sports page carousel instance, which also adopt a different
	// approach for mobile and desktop, inkeeping with the main the
	// existing pages animation. Also, for desktop, a feature has been
	// added to enable users to scrub to a given page by clicking on
	// a given sports icon.

	// I recommend collapsing the portion of JS code inside the
	// mm.add() for desktop while working on the mobile logic, and
	// vice-versa.

	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap';

	import { Observer } from 'gsap/dist/Observer';

	export let mainTitle = undefined,
		title = undefined,
		pages = [],
		isSports = false,
		isAbout = false;

	// refs
	let contextWrapper, carousel, spacer;

	let prev = null,
		isMobile,
		tlDesktop,
		selected = 0;

	onMount(() => {
		const q = gsap.utils.selector(carousel);
		const mm = gsap.matchMedia();
		const cards = gsap.utils.toArray(q('.card-inner .featured'));

		// -----------------------------------------------------
		// Text reveal
		// -----------------------------------------------------
		const textRevealTween = gsap.fromTo(
			q('.h-text, .b-text'),
			{ yPercent: 110 },
			{
				scrollTrigger: {
					trigger: carousel,
					start: 'top 95%'
				},
				yPercent: 0,
				duration: 1
			}
		);

		gsap.set('.number span', { opacity: 0 });

		// -----------------------------------------------------
		// Number animates in
		// -----------------------------------------------------
		const numTl = gsap.timeline({
			scrollTrigger: {
				trigger: carousel,
				start: 'top 30%',
				end: '6%'
			}
		});

		numTl
			.set('.number span', { opacity: 1 })
			.fromTo('.number span', { yPercent: 100 }, { yPercent: 0 });

		// -----------------------------------------------------
		// Sports icons/buttons
		// -----------------------------------------------------

		let containerEles,
			textInnerEles,
			textContainerEles,
			iconContainerWidth,
			d,
			growWidths,
			textInnerWidth,
			textInnerWidths;

		if (isSports) {
			// assets and data
			containerEles = gsap.utils.toArray(q('.icons button'));
			textInnerEles = gsap.utils.toArray(q('.text-inner'));
			textContainerEles = gsap.utils.toArray(q('.text-container'));
			iconContainerWidth = gsap.getProperty(q('.icons button')[0], 'width');

			// Container width (before growing) / pages.length gives our amount to move
			d = gsap.getProperty(q('.icons-inner')[0], 'width') / pages.length;

			// Definde widths to grow by
			growWidths = textInnerEles.map((el) => {
				textInnerWidth = gsap.getProperty(el, 'width');
				return textInnerWidth + iconContainerWidth + 'px';
			});

			textInnerWidths = textInnerEles.map((el) => {
				return gsap.getProperty(el, 'width');
			});
		}

		// Set initial styles
		function sportsIconsSetup() {
			if (!isSports) return;
			gsap.set('.icons-inner', { x: 0 });
			for (let i = 0; i < pages.length; i++) {
				if (i === 0) {
					gsap.set(containerEles[0], {
						width: growWidths[0],
						outline: '2px solid hsla(207, 48%, 28%, 1)'
					});

					gsap.set(textContainerEles[0], { width: `${textInnerWidths[0]}px` });
					gsap.set(textInnerEles[0], { opacity: 1 });
				} else {
					gsap.to(containerEles[i], {
						width: '48px',
						outline: '1px solid hsla(207, 48%, 28%, 0.33)'
					});
					gsap.to(textInnerEles[i], { opacity: 0 });
					gsap.to(textContainerEles[i], { width: '0px' });
				}
			}
		}

		if (isSports) sportsIconsSetup();

		// -----------------------------------------------------
		// MOBILE Animation
		// -----------------------------------------------------
		mm.add(
			'(max-width: 820px)',
			() => {
				isMobile = true;

				if (isSports) sportsIconsSetup();

				/// Pages setup ///

				gsap.set(carousel, { position: 'relative' });
				gsap.set('.featured:first-child', { xPercent: 0, yPercent: 0, opacity: 1, scale: 1 });
				gsap.set('.featured:nth-child(2)', { xPercent: 110, yPercent: 0, opacity: 1 });
				gsap.set('.featured:not(:first-child, :nth-child(2))', {
					opacity: 0,
					xPercent: 130,
					yPercent: 0
				});

				gsap.set(q('.title'), { text: { value: pages[0].title, delimeter: '' } });
				gsap.set(q('.text'), { text: { value: pages[0].text, delimeter: '' } });
				gsap.set(q('.number span'), { text: '1.' });

				let currentIndex = 0;
				let animating;
				let wrap = gsap.utils.wrap(0, pages.length);

				/// Pages timeline ///

				function animate(index, direction) {
					index = wrap(index);

					animating = true;
					let tl = gsap.timeline({
						onComplete: () => (animating = false),
						defaults: { duration: 0.75 }
					});

					// Backwards
					if (direction === -1) {
						tl.set(cards[wrap(index)], {
							yPercent: -80,
							xPercent: 80,
							scale: 0.6,
							opacity: 0,
							zIndex: 1
						})
							.set(cards[wrap(index + 1)], { zIndex: 2 })
							.to(cards[wrap(index)], {
								yPercent: 0,
								xPercent: 0,
								scale: 1,
								opacity: 1,
								ease: 'sine.inOut'
							})
							.to(
								cards[wrap(index + 1)],
								{
									xPercent: 110
								},
								'<'
							)
							.to(
								cards[wrap(index + 2)],
								{
									xPercent: 130,
									opacity: 0,
									duration: 0.2
								},
								'<'
							)
							.add(changeContent(index + 1 === 0 ? pages.length : index + 1), '<-0.2')
							.add(changeIcon.bind(null, index + 1, direction, wrap), 0)
							.add(slideIcons.bind(null, direction), 0.3)
							.add(moveTimeline.bind(null, index, direction), 0);
					}

					// Forward
					if (direction === 1) {
						tl.to(cards[wrap(index - 1)], {
							yPercent: -80,
							xPercent: 80,
							scale: 0.6,
							opacity: 0,
							ease: 'sine.inOut',
							onComplete: () => {
								gsap.set(cards[wrap(index - 1)], {
									opacity: 0,
									xPercent: 130,
									yPercent: 0,
									scale: 1
								});
							}
						})
							.to(
								cards[wrap(index)],
								{
									yPercent: 0,
									xPercent: 0,
									scale: 1,
									ease: 'sine.inOut',
									onComplete: () => {
										gsap.set(cards[wrap(index)], { zIndex: 1 });
										gsap.set(cards[wrap(index + 1)], { zIndex: 500 });
									}
								},
								'<'
							)
							.to(cards[wrap(index + 1)], { opacity: 1, xPercent: 110, duration: 0.5 }, '<50%')
							.add(changeContent(index + 1 === 0 ? pages.length : index + 1), '<-0.5')
							.add(changeIcon.bind(null, index, direction, wrap), 0)
							.add(slideIcons.bind(null, direction), 0.3)
							.add(moveTimeline.bind(null, index, direction), 0);
					}

					currentIndex = index;
				}

				/// Call animate ///

				Observer.create({
					target: '.card',
					type: 'touch, scroll, pointer, wheel',
					tolerance: 50,
					preventDefault: true,
					onLeft: (obs) => {
						!animating && animate(currentIndex + 1, 1);
						obs.event.stopPropagation();
					},
					onRight: (obs) => {
						!animating && animate(currentIndex - 1, -1);
						obs.event.stopPropagation();
					}
				});

				/// Change content ///

				function changeContent(index) {
					const master = gsap.timeline();
					master.add(changeNum(index)).add(changeTitle(index), '<').add(changeInfo(index), '<');
          return master;
				}

				function changeNum(index) {
					const tl = gsap.timeline({ defaults: { duration: 0.2 } });
					tl.fromTo(q('.number span'), { yPercent: 0 }, { yPercent: -100, delay: 0.35 })
						.set(q('.number span'), { text: `${index}.`, yPercent: 100 })
						.to(q('.number span'), { yPercent: 0 }, '<');
					return tl;
				}

				function changeTitle(n) {
					const tl = gsap.timeline();
					tl.to(q('.title'), { opacity: 0, duration: 0.2, delay: 0.35 })
						.set(q('.title'), { text: { value: pages[n - 1].title, delimeter: '' } })
						.to(q('.title'), { opacity: 1, duration: 0.2 });
					return tl;
				}

				function changeInfo(n) {
					const tl = gsap.timeline();
					tl.to(q('.text'), { opacity: 0, duration: 0.2, delay: 0.35 })
						.set(q('.text'), { text: { value: pages[n - 1].text, delimeter: '' } })
						.to(q('.text'), { opacity: 1, duration: 0.2 });
					return tl;
				}

				function changeIcon(index, direction, wrap) {
					if (!isSports) return;
					const tl = gsap.timeline();

					let pre = wrap(index - 1) == 8 ? 0 : wrap(index - 1);
					let pro = wrap(index);

					tl.to(
						containerEles[direction === 1 ? pre : pro],
						{ width: '48px', outline: '1px solid hsla(207, 48%, 28%, 0.33)' },
						'<'
					)
						.to(textInnerEles[direction === 1 ? pre : pro], { opacity: 0 }, '<')
						.to(textContainerEles[direction === 1 ? pre : pro], { width: '0px' }, '<')
						.to(
							containerEles[direction === 1 ? pro : pre],
							{
								width: growWidths[direction === 1 ? pro : pre],
								outline: '2px solid hsla(207, 48%, 28%, 1)'
							},
							'<'
						)
						.to(
							textContainerEles[direction === 1 ? pro : pre],
							{ width: `${textInnerWidths[direction === 1 ? pro : pre]}px` },
							'<'
						)
						.to(textInnerEles[direction === 1 ? pro : pre], { opacity: 1 }, '<');

					return tl;
				}

				function moveTimeline(i, direction) {
					if (!isAbout) return;
					const timeline = gsap.timeline();

					let n = wrap(i);
					timeline.to(
						q('.timeline-inner'),
						{
							x: () => `-${gsap.getProperty(q('.part')[1], 'width') * n}`,
							duration: 0.5,
							ease: 'power1.inOut'
						},
						'<'
					);
					if (direction === 1) {
						if (n === 0) {
							timeline
								.to(
									q(`.part:not(:first-child) .line .solid`),
									{ width: '0%', duration: 0.5, ease: 'power1.inOut' },
									'<'
								)
								.to(q(`.part:not(:first-child) .point`), { opacity: 1, background: '#254b6a00' })
								.to(
									q(`.part:not(:first-child) .point span`),
									{ opacity: 0.41, duration: 0.2 },
									'<'
								);
						}
						timeline
							.to(
								q(`.line-${n} .solid`),
								{ width: '100%', duration: 0.5, ease: 'power1.inOut' },
								'<'
							)
							.to(q(`.point-${n}`), { opacity: 1, background: '#254b6a' })
							.to(q(`.point-${n} span`), { opacity: 1, duration: 0.2 }, '<');
					} else {
						if (n === pages.length - 1) {
							timeline
								.to(q(`.line .solid`), { width: '100%', duration: 0.5, ease: 'power1.inOut' }, '<')
								.to(q(`.point`), { opacity: 1, background: '#254b6a' })
								.to(q(`.point span`), { opacity: 1, duration: 0.2 }, '<');
						}
						timeline
							.to(q(`.point-${n + 1}`), { background: '#254b6a00' }, '<')
							.to(q(`.point-${n + 1} span`), { opacity: 0.41, duration: 0.2 }, '<')
							.to(
								q(`.line-${n + 1} .solid`),
								{ width: '0%', duration: 0.5, ease: 'power1.inOut' },
								'<'
							);
					}
				}

				/// Slide icons along the 'x' axis ///

				let increment = 0;
				function slideIcons(direction) {
					if (!isMobile) return;
					if (direction === 1) {
						increment = increment <= 0 - d * (pages.length - 1) ? 0 : increment - d;
						gsap.to('.icons-inner', { x: `${increment}px` });
					} else {
						increment = increment >= 0 ? 0 - d * (pages.length - 1) : increment + d;
						gsap.to('.icons-inner', { x: `${increment}px` });
					}
				}
			},
			contextWrapper
		);

		// -----------------------------------------------------
		// DESKTOP Animation
		// -----------------------------------------------------
		mm.add(
			'(min-width: 821px)',
			() => {
				isMobile = false;

				gsap.set(spacer, { height: `${pages.length * 100 - 100}vh` }); // 110

				// Cards carousel timeline
				gsap.set('.featured:not(:first-child)', {
					yPercent: 80,
					xPercent: 80,
					scale: 0.6,
					opacity: 0
				});

				sportsIconsSetup();

				gsap.set(cards[0], { yPercent: 0, xPercent: 0, scale: 1, opacity: 1 });
				gsap.set(q('.title'), { text: { value: pages[0].title, delimeter: '' } });
				gsap.set(q('.text'), { text: { value: pages[0].text, delimeter: '' } });
				gsap.set(q('.number span'), { text: '1.' });

				/// Pages timline ///
				tlDesktop = gsap.timeline({
					scrollTrigger: {
						trigger: carousel,
						start: 'top top',
						end: `${pages.length * 100}%`,
						pinSpacing: false, // better add a spacer then
						pin: true,
						scrub: 2,
						anticipatePin: 0.5
					}
				});

				tlDesktop.addLabel(`start`).add(() => {
					selected = 0;
				});

				for (let i = 0; i < cards.length - 1; i++) {
					tlDesktop
						.to(cards[i], {
							duration: 0.8,
							yPercent: -80,
							xPercent: 80,
							scale: 0.6,
							opacity: 0,
							ease: 'sine.inOut',
							pointerEvents: 'none'
						})
						.add(changeContent.bind(tlDesktop, { n: i + 1, direction: -1 }), '<.2') // 20% into cards anim
						.to(cards[i + 1], { opacity: 1, duration: 0.2 }, '<.2') // .2s past start of prev tween
						.to(
							cards[i + 1],
							{
								yPercent: 0,
								xPercent: 0,
								scale: 1,
								ease: 'sine.inOut',
								pointerEvents: 'auto',
								duration: 0.5
							},
							'<'
						)
						.add(changeContent.bind(tlDesktop, { n: i + 2, direction: 1 }), '<.32') // 80% into cards anim
						.addLabel(`label-${i}`);
				}
				tlDesktop.to({}, { duration: `${tlDesktop.duration() / pages.length + 1}` }, '>');

				/// Change content ///

				function changeContent({ n, direction }) {
					const master = gsap.timeline();
					if (this.scrollTrigger.direction !== direction) return;
					if (prev === n) return;
					master
						.add(changeNum(n))
						.add(changeIcon(n, direction), '<')
						.add(changeTitle(n), '<')
						.add(changeInfo(n), '<')
						.add(moveTimeline(n, direction), '<');
					prev = n;
				}
				function changeNum(n) {
					const tl = gsap.timeline();
					tl.fromTo(q('.number span'), { yPercent: 0 }, { yPercent: -100, duration: 0.2 }) // <35%
						.set(q('.number span'), { text: `${n}.`, yPercent: 100 })
						.to('.number span', { yPercent: 0, duration: 0.2 }, '<');
					return tl;
				}
				function changeIcon(n, direction) {
					selected = n - 1;
					if (!isSports) return;
					const tl = gsap.timeline();
					tl.to(
						containerEles[direction === 1 ? n - 2 : n],
						{ width: '48px', outline: '1px solid hsla(207, 48%, 28%, 0.33)' },
						'<'
					)
						.to(textInnerEles[direction === 1 ? n - 2 : n], { opacity: 0 }, '<')
						.to(textContainerEles[direction === 1 ? n - 2 : n], { width: '0px' }, '<')
						.to(
							containerEles[n - 1],
							{
								width: growWidths[n - 1],
								outline: '2px solid hsla(207, 48%, 28%, 1)'
							},
							'<'
						)
						.to(textContainerEles[n - 1], { width: `${textInnerWidths[n - 1]}px` }, '<')
						.to(textInnerEles[n - 1], { opacity: 1 }, '<');
					return tl;
				}

				function moveTimeline(n, direction) {
					if (!isAbout) return;
					const timeline = gsap.timeline();
					n = n - 2;
					timeline.to(
						q('.timeline-inner'),
						{
							x: () => `-${gsap.getProperty(q('.part')[1], 'width') * (n + 1)}`,
							duration: 0.5,
							ease: 'power1.inOut'
						},
						'<'
					);
					if (direction === 1) {
						timeline
							.to(
								q(`.line-${n + 1} .solid`),
								{ width: '100%', duration: 0.5, ease: 'power1.inOut' },
								'<'
							)
							.to(q(`.point-${n + 1}`), { opacity: 1, background: '#254b6a' })
							.to(q(`.point-${n + 1} span`), { opacity: 1, duration: 0.2 }, '<');
					} else {
						timeline
							.to(q(`.point-${n + 2}`), { opacity: 1, background: '#254b6a00' }, '<')
							.to(q(`.point-${n + 2} span`), { opacity: 0.41, duration: 0.2 }, '<')
							.to(
								q(`.line-${n + 2} .solid`),
								{ width: '0%', duration: 0.5, ease: 'power1.inOut' },
								'<'
							);
					}
				}

				function changeTitle(n) {
					const tl = gsap.timeline();
					tl.to(q('.title'), { opacity: 0, duration: 0.2 })
						.set(q('.title'), { text: { value: pages[n - 1].title, delimeter: '' } })
						.to(q('.title'), { opacity: 1, duration: 0.2 });
					return tl;
				}

				function changeInfo(n) {
					const tl = gsap.timeline();
					tl.to(q('.text'), { opacity: 0, duration: 0.2 })
						.set(q('.text'), { text: { value: pages[n - 1].text, delimeter: '' } })
						.to(q('.text'), { opacity: 1, duration: 0.2 });
					return tl;
				}
			},
			contextWrapper
		);

		return () => {
			mm.revert();
			textRevealTween.kill();
			numTl.kill();
		};
	});

	// -----------------------------------------------------
	// Event handlers
	// -----------------------------------------------------

	function handleClick(e) {
		if (isMobile) return;
		const id = +e.currentTarget.dataset.id;
		if (id === 0) {
			gsap.to(window, { scrollTo: tlDesktop.scrollTrigger.labelToScroll('start') });
		} else {
			gsap.to(window, {
				scrollTo: tlDesktop.scrollTrigger.labelToScroll(`label-${e.currentTarget.dataset.id - 1}`)
			});
		}
	}

	function handleMouseEnter(e) {
		if (isMobile) return;
		if (+e.currentTarget.dataset.id === selected) return;
		gsap.fromTo(
			e.currentTarget.querySelector('img'),
			{ scale: 1 },
			{ scale: 1.25, repeat: 1, yoyo: true, duration: 0.2 }
		);
	}
</script>

<div bind:this={contextWrapper}>
	<section bind:this={carousel} class="Carousel">
		<div class="background" />
		<div class="inner wrapper">
			<div>
				<h2 class={`md-header-text main-title ${mainTitle ? 'show' : ''}`}>
					{mainTitle}
				</h2>
				{#if isAbout}
					<div class="timeline">
						<div class="timeline-inner">
							{#each pages as page, n}
								<div class="part">
									<div class="line line-{n}">
										<div class="solid" />
									</div>
									<div class="point point-{n}"><span>{page.title}</span></div>
								</div>
							{/each}
							<div class="part">
								<div class="line" />
							</div>
						</div>
					</div>
				{/if}
				{#if isSports}
					<div class="icons">
						<div class="icons-inner">
							{#each pages as page, idx}
								<button data-id={idx} on:click={handleClick} on:mouseenter={handleMouseEnter}>
									<div class="icon-container">
										<img src={page.icon.src} alt={page.icon.text} />
									</div>
									<span class="text-container">
										<span class="text-inner">
											{page.icon.text}
										</span>
									</span>
								</button>
							{/each}
						</div>
					</div>
				{/if}
				<div class="page">
					<div class="left">
						<div class="number">
							<div class="container">
								<span>1.</span>
							</div>
							<div class="sm-body-text">scrolldown</div>
						</div>
						<div class="card">
							<div class="card-inner">
								{#each pages as page}
									<img class="featured" src={page.featured} alt="" loading="lazy" />
								{/each}
								<div class="card-spacer" />
							</div>
						</div>
					</div>
					<div class="right">
						{#if title}
							<div class="h-frame">
								<span class="section-title h-text admission-process">{title}</span>
							</div>
						{/if}
						<div class="h-frame">
							<h2 class="title lg-header-text h-text">{pages[0].title}</h2>
						</div>
						<div class="b-frame">
							<h4 class="text lg-body-text b-text">
								{pages[0].text}
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<div class="spacer" bind:this={spacer} />
</div>

<style>
	.spacer {
		height: 500vh;
	}
	.Carousel {
		color: var(--secondary-dark-blue);
		background-color: var(--brand-colors-yellow);
		height: 100vh;
		width: 100vw;
		position: relative;
		overscroll-behavior-x: contain;
		overscroll-behavior-x: none;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		margin-top: var(--negative-margin);
		height: calc(100vh + var(--b-r-section));
		width: 100%;
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		background-color: var(--brand-colors-yellow);
	}

	.inner {
		overflow: clip;
		max-width: 1440px;
		margin: auto;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.inner > div {
		width: 100%;
	}

	.main-title {
		display: none;
		position: relative;
		margin-bottom: 3rem;
		text-align: left;
		padding: 0 var(--gutter);
		width: 100%;
	}

	.main-title.show {
		display: inline-block;
	}

	/* Timeline */
	.timeline {
		width: max-content;
		padding-bottom: 80px;
	}

	.timeline-inner {
		display: inline-flex;
		width: 100%;
	}

	.part {
		width: 36vw;
		display: flex;
		align-items: center;
	}

	.part:first-child,
	.part:last-child {
		width: 16%;
	}

	.part .line {
		position: relative;
		padding: 1px 50px;
		width: calc(100% - 22px);
		background-image: linear-gradient(to right, #254b6a41 50%, rgba(255, 255, 255, 0) 0%);
		background-position: top;
		background-size: 16px 2px;
		background-repeat: repeat-x;
	}

	.solid {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background-color: var(--secondary-dark-blue);
		width: 0;
	}

	.part .point {
		position: relative;
		z-index: 2;
		width: 16px;
		height: 16px;
		border-radius: 1000px;
		border: solid 4px #254b6a41;
		outline: solid 6px var(--brand-colors-yellow);
		overflow: visible;
	}

	.part .point span {
		color: var(--secondary-dark-blue);
		position: absolute;
		font-size: 20px;
		top: -40px;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0.41;
	}

	.part:first-child {
		width: 20vw;
	}

	.part:first-child .line {
		background: var(--secondary-dark-blue);
		opacity: 1;
		padding: 1px 40%;
	}
	.part:first-child .point {
		background-color: var(--secondary-dark-blue);
		opacity: 1;
	}
	.part:first-child .point span {
		opacity: 1;
	}

	@media screen and (max-width: 450px) {
		.part:first-child .line {
			padding: 1px 30%;
		}
		.part .line {
			padding: 1px 40%;
		}
	}

	/* Sports Icons */

	.icons {
		position: relative;
		margin-left: var(--gutter);
		width: max-content;
		overflow: hidden;
		z-index: 100;
		/* margin: auto; */
	}

	.icons-inner {
		display: flex;
		align-items: center;
		margin-bottom: 2.5rem;
		height: 3.6em;
	}

	button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		outline: 1px solid rgba(97, 97, 97, 0.396);
		border-radius: 1000px;
		height: 3rem;
		margin: 0 8px;
		width: 48px;
	}

	.icon-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 28px;
	}

	span.text-container {
		overflow: hidden;
		width: max-content;
		width: 0px;
		/* height: 0px; */
	}
	span.text-inner {
		display: inline-block;
		white-space: nowrap;
		padding: 0 0.4rem;
		opacity: 0;
		font-weight: 500;
	}

	.page {
		display: flex;
	}

	.left {
		flex-basis: 42%;
		flex-basis: 52%;
		min-width: 510px;
		max-width: 630px;
		display: flex;
		flex-shrink: 0;
	}

	.number {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		font-size: 160px;
		height: 39vw;
		height: 34vw;
		/* min-height: 500px; */
		max-height: 528px;
		padding-right: 2vw;
	}

	.number .container {
		display: flex;
		overflow: hidden;
	}

	.number span {
		color: inherit;
		line-height: 0.8;
		/* width: 0.9em; */
		width: 1.2em;
	}

	.number div:last-child {
		transform: rotate(270deg) translateX(50%);
	}

	.card {
		position: relative;
		flex-grow: 1;
		height: 100%;
	}

	.card img.featured {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 20px;
		width: 100%;
		height: auto;
		object-fit: cover;
		aspect-ratio: 1/1.4;
	}

	.h-frame {
		margin-bottom: 1rem;
	}
	.admission-process {
		position: relative;
		padding-left: 4vw;
		padding-right: 4vw;
	}

	.right span,
	.right h2,
	.right h4 {
		/* padding-left: 4vw;
		padding-right: 4vw; */
		padding-left: 7vw;
	}

	.right span {
		text-transform: uppercase;
	}

	.right h2 {
		color: inherit;
	}
	.right h4 {
		max-width: 500px;
		max-width: 650px;
		margin-top: 10px;
		color: inherit;
	}

	@media (max-width: 1060px) {
		.wrapper {
			padding: 100px var(--gutter) 100px;
		}
	}

	@media (max-width: 1050px) {
		.left .number {
			min-height: 451px;
		}

		.left .number span {
			font-size: 140px;
		}
	}

	@media (max-width: 964px) {
		.Carousel .left {
			min-width: 410px;
			flex-basis: 50%;
		}
		.left .number {
			min-height: 340px;
		}
	}

	@media (max-width: 820px) {
		.spacer {
			display: none;
		}
		.Carousel {
			height: unset;
		}
		.wrapper {
			padding-left: 0;
			padding-right: 0;
		}

		.page {
			flex-direction: column;
		}

		.icons-inner {
			margin-bottom: 2.5rem;
		}

		.left .number div:last-child {
			display: none;
		}

		.right span,
		.right h4,
		.right h2 {
			padding: 0 var(--gutter);
		}

		.Carousel .inner {
			flex-direction: column;
		}

		.Carousel .inner .left {
			padding-left: var(--gutter);
			width: 100%;
			height: 460px;
			max-width: unset;
			min-width: unset;
			flex-basis: unset;
		}

		.Carousel .left .number {
			min-height: unset;
		}

		.Carousel .left .card-inner {
			height: 100%;
			display: flex;
		}

		.Carousel .card img.featured {
			width: auto;
			height: 100%;
			margin-right: 4vw;
			aspect-ratio: 1/1.4;
		}

		.Carousel .card .card-spacer {
			min-width: 15.5vw;
			height: 20px;
		}

		.Carousel .inner .right {
			margin-top: 46px;
			padding-bottom: 100px;
		}
	}

	@media (max-width: 642px) {
		.Carousel .inner .left {
			height: 77vw;
		}
		.Carousel .left .number span {
			font-size: 130px;
		}
	}

	@media (max-width: 414px) {
		.Carousel .left .number span {
			font-size: 80px;
			font-size: 60px;
		}

		.inner .left {
			flex-basis: unset;
		}

		.inner .right {
			margin-top: 24px;
		}
	}

	@media (min-width: 821px) {
		.icons {
			margin: auto;
		}

		.main-title {
			text-align: center;
		}
	}

	/* Flex Basis to control size of cards */
	@media (max-width: 1528px) {
		.inner .left {
			flex-basis: 45%;
		}
	}

	@media (max-width: 1328px) {
		.inner .left {
			flex-basis: 46%;
		}
	}

	@media (max-width: 964px) {
		.inner .left {
			flex-basis: 56%;
		}
	}
</style>
