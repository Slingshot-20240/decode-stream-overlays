<svelte:options customElement="preview-overlay" />

<script lang="ts">
	import type { InformationMessage, ScoreResultMessage } from './types';

	import PurpleArtifact from '$lib/assets/image/purple_artifact.svg';
	import GreenArtifact from '$lib/assets/image/green_artifact.svg';
	import NoArtifact from '$lib/assets/image/no_artifact.svg';

	export let info: InformationMessage = {} as InformationMessage;
	export let data: ScoreResultMessage = {} as ScoreResultMessage;

	$: if (data.params?.matchName !== info.params?.matchName) {
		data = {} as ScoreResultMessage;
	}
</script>

<div id="preview-overlay" class="overlay-container">
	<div id="overlay-content">
		<div id="up-next-header">
			<h2>Up Next</h2>
			<div id="randomization">
				{#if data.params?.rand === undefined}
					<img src={NoArtifact} alt="" />
					<img src={NoArtifact} alt="" />
					<img src={NoArtifact} alt="" />
				{:else}
					<img src={data.params?.rand === 1 ? GreenArtifact : PurpleArtifact} alt="" />
					<img src={data.params?.rand === 2 ? GreenArtifact : PurpleArtifact} alt="" />
					<img src={data.params?.rand === 3 ? GreenArtifact : PurpleArtifact} alt="" />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	@import url('/style/preview.css');
</style>
