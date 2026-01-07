<script>
	import MyLink from '../../lib/buttons/MyLink.svelte';
	import Button from '../../lib/buttons/Button.svelte';
	import ButtonDropdown from '../../lib/buttons/ButtonDropdown.svelte';
	//import ButtonExp from '../../lib/buttons/ButtonExp.svelte';
</script>

<section>
  <!--
	<ButtonExp style="btn btn-orange">Experiment</ButtonExp><br />
  -->

	<MyLink style="btn btn-orange opposite">reverse</MyLink><br />
	<MyLink style="btn btn-orange">Enquiry form</MyLink><br />
	<MyLink style="btn btn-orange">Learn more</MyLink><br />
	<MyLink style="btn btn-blue">Learn more</MyLink><br />
	<MyLink style="btn btn-purple">Learn more</MyLink><br />
	<MyLink style="btn btn-lime">Learn more</MyLink><br />
	<MyLink style="btn btn-alt">Learn more</MyLink><br />

	<Button style="btn btn-calc blue">Calculate</Button><br />
	<Button style="btn btn-calc orange">Calculate</Button><br />
	<Button style="btn btn-calc blue">Enquiry</Button><br />
	<ButtonDropdown>Day</ButtonDropdown>
</section>

<style>
	section {
		height: 120vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgb(180, 180, 180);
	}
</style>
