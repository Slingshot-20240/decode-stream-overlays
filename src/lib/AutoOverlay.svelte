<svelte:options customElement="auto-overlay" />

<script lang="ts">
	import type { ScoreResultMessage } from './types';

	export let data: ScoreResultMessage = {} as ScoreResultMessage;
</script>

<div id="auto-overlay" class="overlay-container">
	<div id="overlay-content">
		<div id="blue-score-details" class="score-details-group">
			<div class="score-detail">
				<h2>{data.params?.blueScores?.autoClassifiedArtifacts}</h2>
			</div>
			<div class="score-detail">
				<h2>{data.params?.blueScores?.autoOverflowArtifacts}</h2>
			</div>
		</div>

		<div id="red-score-details" class="score-details-group">
			<div class="score-detail">
				<h2>{data.params?.redScores?.autoClassifiedArtifacts}</h2>
			</div>
			<div class="score-detail">
				<h2>{data.params?.redScores?.autoOverflowArtifacts}</h2>
			</div>
		</div>
	</div>
</div>

<style>
	@import url('/style/auto-teleop.css');
</style>
