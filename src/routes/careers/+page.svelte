<script>
   import { onMount } from "svelte";

   let embed;

	 function fetchJobs() {
		 if (GH) window.gh = new GH();
	 };

   onMount(() => {
      const s = document.createElement('script');
      s.onload = fetchJobs;
      s.src = "https://widget.gohire.io/widget/TO1GdZdO";
      embed.appendChild(s);
      return () => {
        embed.removeChild(s);
        window.gh = undefined;
      }
   });
</script>

<svelte:head>
   <title>Careers | Bloomingdale International School</title>
	 <script async src="" on:load={fetchJobs}></script>
</svelte:head>

<section id="careers">
	<div class="wrapper">
		<h2 class="lg-header-text">Open positions</h2>
		<p class="subhead lg-body-text">
			Our philosophy is simple — hire a team of diverse, passionate people and foster a culture that
			empowers you to do your best work.
		</p>
      <div class="embed" bind:this={embed}>
         <gohire-jobs>Loading...</gohire-jobs>
      </div>
	</div>
</section>

<style>
	#careers {
		min-height: 100vh;
		background-image: var(--gradient-blue-orange-reverse);
	}

	#careers h2 {
		text-align: center;
	}

	.subhead {
		text-align: center;
		width: 552px;
		margin: 0px auto;
		padding-top: 40px;
	}

	@media screen and (max-width: 750px) {
		#careers h2 {
			text-align: left;
		}
		.subhead {
			width: 100%;
			text-align: left;
			padding-top: 32px;
		}
	}
</style>
