<script>
  import envelope from '$lib/icons/illustrations/envelope.svg';
</script>

<svelte:head>
	<title>Thank You | Bloomingdale International School</title>
</svelte:head>

<section>
    <div>
      <img src={envelope} alt="Smiling envelope" class="page-icon" />
    </div>
    <h1>Thank You!</h1>
    <p>
      for contacting us. One of our executives will connect with you shortly!
    </p>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    color: white;
    background-color: var(--brand-colors-blue-dark)
  }

  .page-icon {
    width: 140px;
    height: auto;
  }

  h1 {
    font-size: 3.4rem;
    margin-top: 2rem;
  }

  p {
    font-size: 1.8rem;
    text-align: center;
    margin-top: 1rem;
  }
</style>