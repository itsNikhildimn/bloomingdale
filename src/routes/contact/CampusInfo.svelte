<script>
	import emailIcon from '$lib/icons/email-icon-blue.svg';
	import addressIcon from '$lib/icons/address-icon-orange.svg';
	import phoneIcon from '$lib/icons/phone-icon-purple.svg';
	import galileoCampus from '$lib/images/galileo-campus.webp';
	import villageCampus from '$lib/images/campus/village-campus.webp';
</script>

<section id="campus-info">
	<div class="wrapper">
		<div class="campus-card">
			<h2 class="md-header-text">Galileo Campus</h2>
			<div class="contact-info">
				<div class="contact email-contact">
					<img src={emailIcon} alt="Email address" />
					<div>
						<h4 class="sm-header-text">Email</h4>
						<p>support@bloomingdale.edu.in</p>
					</div>
				</div>
				<div class="contact address-info">
					<img src={addressIcon} alt="Location" />
					<div>
						<h4 class="sm-header-text">School location</h4>
						<p>Penamaluru, Vijayawada,<br />Andhra Pradesh</p>
					</div>
				</div>
				<div class="contact phone-info">
					<img src={phoneIcon} alt="Phone number" />
					<div>
						<h4 class="sm-header-text">Phone</h4>
						<p><span class="tel">Admissions: +919525525525 ext 1</span> <span class="tel">Front Office: +919513632659 ext 112</span></p>
					</div>
				</div>
			</div>
			<img src={galileoCampus} alt="Galileo campus" />
		</div>

		<div class="campus-card">
			<h2 class="md-header-text">Early Years Village Campus</h2>
			<div class="contact-info">
				<div class="contact email-contact">
					<img src={emailIcon} alt="Email address" />
					<div>
						<h4 class="sm-header-text">Email</h4>
						<p>support@bloomingdale.edu.in</p>
					</div>
				</div>
				<div class="contact address-info">
					<img src={addressIcon} alt="Location" />
					<div>
						<h4 class="sm-header-text">School location</h4>
						<p>Municipal Employee Colony,<br />Vijayawada</p>
					</div>
				</div>
				<div class="contact phone-info">
					<img src={phoneIcon} alt="Phone number" />
					<div>
						<h4 class="sm-header-text">Phone</h4>
						<p><span class="tel">Admissions: +91 9525525525 ext 1</span> <span class="tel">Front Office: +919513632659 ext 211</span></p>
					</div>
				</div>
			</div>
			<img src={villageCampus} alt="Early years campus" />
		</div>
	</div>
</section>

<style>
	#campus-info {
		min-height: 100vh;
		background-image: var(--gradient-blue-orange-reverse);
		border-radius: var(--b-r-section) var(--b-r-section) 0 0;
		margin-top: var(--negative-margin);
		position: relative;
	}

	.campus-card {
		background-color: white;
		border-radius: var(--b-r-container);
		padding: 32px;
		display: grid;
		grid-template-rows: auto 1fr;
		grid-template-areas: 'title image' 'info image';
		row-gap: 50px;
		margin-bottom: 24px;
	}

	.campus-card h2 {
		grid-area: title;
		font-weight: 500;
	}

	.contact-info {
		grid-area: info;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		gap: 1rem;
	}

	.contact {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		column-gap: 16px;
	}

	.contact h4 {
		margin-bottom: 0.3rem;
	}

	.contact p {
		color: var(--grey);
	}

	.sm-header-text {
		font-size: 20px; /* mob 18 */
		line-height: 140%;
		font-weight: 500;
	}

	.contact .tel {
		white-space: nowrap;
	}

	.campus-card > img {
		grid-area: image;
		justify-self: flex-end;
		height: 336px;
		width: auto;
		border-radius: 16px;
	}

	@media screen and (max-width: 1000px) {
		.sm-header-text {
			font-size: 16px;
		}
		.campus-card {
			grid-template-rows: auto;
			grid-template-areas: 'title' 'info' 'image';
			row-gap: 40px;
		}
		.contact-info {
			row-gap: 24px;
		}
		.campus-card > img {
			width: 100%;
			height: auto;
		}
	}
</style>
