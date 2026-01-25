<svelte:options customElement="teleop-overlay" />

<script lang="ts">
	import type { ScoreResultMessage } from './types';

	export let data: ScoreResultMessage = {} as ScoreResultMessage;
</script>

<div id="teleop-overlay" class="overlay-container">
	<div id="overlay-content">
		<div id="blue-score-details" class="score-details-group">
			<div class="score-detail">
				<h2>{data.params?.blueScores?.teleopClassifiedArtifacts}</h2>
			</div>
			<div class="score-detail">
				<h2>{data.params?.blueScores?.teleopOverflowArtifacts}</h2>
			</div>
			<div class="score-detail">
				<h2>{data.params?.blueScores?.teleopDepotArtifacts}</h2>
			</div>
		</div>

		<div id="red-score-details" class="score-details-group">
			<div class="score-detail">
				<h2>{data.params?.redScores?.teleopClassifiedArtifacts}</h2>
			</div>
			<div class="score-detail">
				<h2>{data.params?.redScores?.teleopOverflowArtifacts}</h2>
			</div>
			<div class="score-detail">
				<h2>{data.params?.redScores?.teleopDepotArtifacts}</h2>
			</div>
		</div>
	</div>

	<svg
		class="overlay-background"
		width="3840px"
		height="2160px"
		viewBox="0 0 3840 2160"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<title>Teleop</title>
		<defs>
			<path d="M0,0 L3840,0 L3840,2160 L0,2160 L0,0 Z" id="path-1"></path>
			<filter
				x="-27.1%"
				y="-45.8%"
				width="154.2%"
				height="208.3%"
				filterUnits="objectBoundingBox"
				id="filter-182"
			>
				<feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
				<feGaussianBlur stdDeviation="8" in="shadowOffsetOuter1" result="shadowBlurOuter1"
				></feGaussianBlur>
				<feColorMatrix
					values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
					type="matrix"
					in="shadowBlurOuter1"
					result="shadowMatrixOuter1"
				></feColorMatrix>
				<feMerge>
					<feMergeNode in="shadowMatrixOuter1"></feMergeNode>
					<feMergeNode in="SourceGraphic"></feMergeNode>
				</feMerge>
			</filter>
			<filter
				x="-27.1%"
				y="-45.8%"
				width="154.2%"
				height="208.3%"
				filterUnits="objectBoundingBox"
				id="filter-183"
			>
				<feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
				<feGaussianBlur stdDeviation="8" in="shadowOffsetOuter1" result="shadowBlurOuter1"
				></feGaussianBlur>
				<feColorMatrix
					values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
					type="matrix"
					in="shadowBlurOuter1"
					result="shadowMatrixOuter1"
				></feColorMatrix>
				<feMerge>
					<feMergeNode in="shadowMatrixOuter1"></feMergeNode>
					<feMergeNode in="SourceGraphic"></feMergeNode>
				</feMerge>
			</filter>
		</defs>
		<g
			id="Teleop"
			stroke="none"
			fill="none"
			xlink:href="#path-1"
			fill-rule="evenodd"
			stroke-width="1"
		>
			<g id="Red-Depot" filter="url(#filter-182)" transform="translate(1048, 280)">
				<rect id="Background" fill="#830F12" x="0" y="0" width="96" height="48"></rect>
				<rect id="Score-Background" fill="#ED1C24" x="0" y="0" width="48" height="48"></rect>
				<polyline
					id="Depot"
					stroke="#FFFFFF"
					stroke-width="4"
					transform="translate(73.5, 24.5) scale(-1, 1) translate(-73.5, -24.5)"
					points="61 34 83 12 72 23 86 37"
				></polyline>
			</g>
			<g id="Blue-Depot" filter="url(#filter-183)" transform="translate(776, 280)">
				<rect id="Background" fill="#004272" x="0" y="0" width="96" height="48"></rect>
				<rect id="Score-Background" fill="#0066B3" x="48" y="0" width="48" height="48"></rect>
				<polyline id="Depot" stroke="#FFFFFF" stroke-width="4" points="11 34 33 12 22 23 36 37"
				></polyline>
			</g>
		</g>
	</svg>
</div>

<style>
	@import url('/style/auto-teleop.css');
</style>
