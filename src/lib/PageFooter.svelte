<script>
	// Assets
	import logo from '$lib/images/logo-white.svg';
	import IBcontinuum from '$lib/logos/ib-continuum.png';
	import student1 from '$lib/images/boy-student-cropped.webp';
	import student2 from '$lib/images/girl-student-cropped.webp';

	import fbIconFilled from '$lib/icons/fb-icon-filled.svg';
	import ytIconFilled from '$lib/icons/yt-icon-filled.svg';
	import igIconFilled from '$lib/icons/ig-icon-filled.svg';

	import SvgIcon from '$lib/SvgIcon.svelte';
	import MyLink from './buttons/MyLink.svelte';

	import SiteMenu from './SiteMenu.svelte';
</script>

<svelte:head>
	<style>
		.grecaptcha-badge {
			z-index: 200;
		}
	</style>
</svelte:head>

<footer class="page-footer">
	<div class="unlock">
		<div class="behind">
			<div class="upper" />
			<div class="lower" />
		</div>
		<div class="unlock-inner">
			<p class="caption lg-header-text">
				Unlock your
				<span
					><img class="small-circle-portrait" src={student1} alt="" /><img
						class="small-circle-portrait"
						src={student2}
						alt=""
					/></span
				>
				child's potential &ndash; apply to join today
			</p>

			<MyLink style="btn btn-calc blue" href="/enquiry">Enquiry</MyLink>
		</div>
	</div>
	<div class="footer-main">
		<div class="first">
			<div class="keep-learning">
				<p class="sub-head">Keep learning.</p>
				<label for="email">Subscribe to bloomingdale updates</label>
				<form
					class="subscribe btn btn-grey"
					name="mc-embedded-subscribe-form"
					method="post"
					action="https://bloomingdale.us21.list-manage.com/subscribe/post?u=71f60b8b747d689bbbe78dae5&amp;id=cff7ab4293&amp;f_id=00b851e1f0"
				>
					<input
						id="email"
						name="EMAIL"
						class="lg-body-text"
						type="email"
						placeholder="Enter your email here*"
						autocomplete="email"
					/>
					<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
					<div style="position: absolute; left: -5000px;" aria-hidden="true">
						<input
							type="text"
							name="b_71f60b8b747d689bbbe78dae5_cff7ab4293"
							tabindex="-1"
							value=""
						/>
					</div>
					<button type="submit" name="subscribe" value="Subscribe" class="btn"
						><SvgIcon shape="arrow-right" /></button
					>
				</form>
			</div>
			<div class="site-menu">
				<SiteMenu theme="dark" />
			</div>
		</div>
		<div class="horizontal-rule" />
		<div class="second">
			<div class="about-us">
				<img class="logo" src={logo} alt="Bloomingdale International School" />

				<img class="IB-continuum" src={IBcontinuum} alt="IB Continuum" />
			</div>
			<div class="campus-details">
				<div>
					<p class="campus-name">Galileo Campus</p>
					<address>Bloomingdale International School Road<br />Penamaluru</address>
					<p class="number">Admissions: +91&nbsp;9525&nbsp;525525<br/>Parents: +91&nbsp;9513&nbsp;632659</p>
				</div>
				<div>
					<p class="campus-name">Village Campus</p>
					<address>Municipal&nbsp;Employees Colony<br />Main&nbsp;Road</address>
					<p class="number">Admissions: +91&nbsp;9525&nbsp;525525<br/>Parents: +91&nbsp;9513&nbsp;632659</p>
				</div>
				<div class="social-buttons">
					<a href="https://www.facebook.com/bloomingdaleInternational">
						<img src={fbIconFilled} alt="Follow us on Facebook" /></a
					>
					<a href="https://www.youtube.com/channel/UCfxagGB-11pAlBL0vbfe9RA">
						<img src={ytIconFilled} alt="Follow us on YouTube" /></a
					>
					<a href="https://www.instagram.com/bloomingdaleinternational/">
						<img src={igIconFilled} alt="Follow us on Instagram" /></a
					>
				</div>
				<div class="policies">
					<a href="/privacy">Privacy policy</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	.page-footer {
		position: relative;
		z-index: 100;
	}
	.unlock {
		position: relative;
	}

	.unlock-inner {
		margin-top: var(--negative-margin);
		border-top-left-radius: var(--b-r-section);
		border-top-right-radius: var(--b-r-section);
		background-color: var(--brand-colors-blue);
		padding: 80px var(--gutter) calc(80px + var(--b-r-section));
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
	}

	.behind {
		display: none;
	}
	.small-circle-portrait {
		width: 36px;
		height: 36px;
		border: 0.1em var(--brand-colors-blue) solid;
	}
	.small-circle-portrait:last-child {
		margin-left: -6px;
	}

	p {
		max-width: 514px;
		color: white;
	}

	.caption {
		margin-bottom: 48px;
	}

	p span {
		vertical-align: -0.3em;
		display: inline-flex;
	}

	/* MAIN */
	.footer-main {
		position: relative;
		margin-top: var(--negative-margin);
		border-top-right-radius: var(--b-r-section);
		border-top-left-radius: var(--b-r-section);
		color: white;
		background-color: var(--secondary-black);
		padding: 40px var(--gutter);
	}

	.keep-learning {
		grid-area: subscribe;
		/* padding-right: 2em; */
	}

	.sub-head {
		font-size: 36px;
		margin-bottom: 1.5rem;
	}

	.footer-main label {
		display: block;
		font-size: 12px;
		line-height: 120%;
		color: hsla(0, 0%, 100%, 0.8);
		margin-bottom: 12px;
	}

	.footer-main input {
		outline: 0;
		color: white;
	}

	.btn-grey {
		background-color: hsla(0, 0%, 100%, 0.1);
		color: white;
	}

	.subscribe {
		max-width: 390px;
		box-sizing: border-box;
		white-space: nowrap;
		margin-top: 5px;
		padding: 8px 18px;
	}

	.subscribe input {
		border: none;
		background: none;
		font-family: inherit;
		color: #fff;
		flex-grow: 1;
		margin-left: 12px;
		font-weight: 400;
	}

	.subscribe input::placeholder {
		color: #fff;
		font-weight: 200;
	}

	.site-menu {
		padding: 40px 0;
	}

	.horizontal-rule {
		height: 1px;
		background-color: hsla(0, 0%, 100%, 0.2);
	}

	.about-us .logo {
		margin-top: 48px;
		height: 32px;
		width: auto;
	}

	.about-us .IB-continuum {
		margin-top: 32px;
		height: 56px;
		width: auto;
		display: inline-block;
	}

	.campus-details {
		font-size: 16px;
	}

	.campus-name {
		color: hsla(0, 0%, 100%, 1);
		font-size: 18px;
		margin-bottom: 0.8em;
		padding-top: 48px;
	}

	.campus-details address {
		color: hsla(0, 0%, 100%, 0.8);
		font-size: 14px;
		line-height: 1.4;
		font-style: normal;
		margin-bottom: 0.8em;
	}
	.number {
		color: hsla(0, 0%, 100%, 0.8);
		font-size: 14px;
	}

	.social-buttons {
		margin: 32px 0;
		display: flex;
		gap: 16px;
	}
	.social-buttons > a {
		display: flex;
		width: 40px;
		height: 40px;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		justify-content: center;
		align-items: center;
	}

	.policies {
		line-height: 28px;

		display: flex;
		flex-direction: column;
	}

	.policies {
		align-self: flex-end;
		font-size: 16px;
		color: hsla(0, 0%, 100%, 0.8);
	}
	@media (min-width: 965px) {
		.page-footer {
			margin-top: calc(0px - (var(--footer-padding) + var(--b-r-section)));
			position: relative;
		}

		.unlock {
			border-radius: var(--b-r-section);
		}

		.behind {
			position: absolute;
			top: 0;
			display: flex;
			flex-direction: column;
			height: 100%;
			width: 100%;
			z-index: -1;
		}
		.upper {
			flex-basis: 50%;
		}
		.lower {
			border-top-left-radius: var(--b-r-section);
			border-top-right-radius: var(--b-r-section);
			flex-basis: 50%;
			background-color: var(--secondary-black);
		}

		.unlock-inner {
			height: calc(2 * var(--footer-padding));
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			padding: 0px var(--gutter) 0px;
			border-radius: var(--b-r-section);
			margin-left: 4.2vw;
			margin-right: 4.2vw;
		}

		.footer-main {
			border-radius: unset;
			margin-top: unset;
			position: unset;
			padding-top: 72px;
		}
		.site-menu {
			padding-top: 0;
		}
		.first,
		.second {
			display: flex;
		}
		.first > *,
		.second > * {
			width: 100%;
			/* padding-right: 10px; */
		}
		.subscribe {
			width: 80%;
			max-width: 400px;
		}

		.campus-details {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-areas:
				'campus-1 campus2 .'
				'social . privacy';
		}

		.campus-details > div:nth-child(2) {
			order: -1;
		}

		.social-buttons {
			grid-area: social;
		}

		.policies {
			grid-area: privacy;
			align-self: flex-start;
		}

		.policies a {
			margin-left: 32px;
		}

		.caption {
			max-width: 894px;
		}

		.small-circle-portrait {
			width: 70px;
			height: 70px;
		}

		.small-circle-portrait:last-child {
			margin-left: -12px;
		}
	}
</style>
