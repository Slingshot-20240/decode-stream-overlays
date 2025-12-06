<svelte:options customElement="auto-end-overlay" />

<script lang="ts">
	import type { ScoreResultMessage } from './types';

	import PurpleArtifact from '$lib/assets/image/purple_artifact.svg';
	import GreenArtifact from '$lib/assets/image/green_artifact.svg';
	import NoArtifact from '$lib/assets/image/no_artifact.svg';
	import Checkmark from '$lib/assets/image/checkmark.svg';
	import Xmark from '$lib/assets/image/xmark.svg';

	export let data: ScoreResultMessage = {} as ScoreResultMessage;

	function artifactImage(state: 'NONE' | 'GREEN' | 'PURPLE') {
		switch (state) {
			case 'GREEN':
				return GreenArtifact;
			case 'PURPLE':
				return PurpleArtifact;
			default:
				return NoArtifact;
		}
	}
</script>

<div id="auto-end-overlay" class="overlay-container">
	<div id="overlay-content">
		<div id="blue-special-score-details" class="special-score-details-group">
			<div class="motifs">
				<div class="motifs-artifacts">
					<img src={artifactImage(data.params?.blueScores?.autoClassifierState[0])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.autoClassifierState[1])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.autoClassifierState[2])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.autoClassifierState[3])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.autoClassifierState[4])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.autoClassifierState[5])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.autoClassifierState[6])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.autoClassifierState[7])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.autoClassifierState[8])} alt="" />
				</div>
				<div class="motifs-count"><h2>{data.params?.blueScores?.autoPatternPoints / 2}</h2></div>
			</div>

			<div class="locations-group">
				<div class="location">
					<div class="location-team-number"><h2>{data.params?.blue?.teams[0]?.number}</h2></div>
					<img src={data.params?.blueScores?.robot1Auto ? Checkmark : Xmark} alt="" />
				</div>
				<div class="location">
					<div class="location-team-number"><h2>{data.params?.blue?.teams[1]?.number}</h2></div>
					<img src={data.params?.blueScores?.robot2Auto ? Checkmark : Xmark} alt="" />
				</div>
			</div>
		</div>

		<div id="red-special-score-details" class="special-score-details-group">
			<div class="motifs">
				<div class="motifs-count"><h2>{data.params?.redScores?.autoPatternPoints / 2}</h2></div>
				<div class="motifs-artifacts">
					<img src={artifactImage(data.params?.redScores?.autoClassifierState[0])} alt="" />
					<img src={artifactImage(data.params?.redScores?.autoClassifierState[1])} alt="" />
					<img src={artifactImage(data.params?.redScores?.autoClassifierState[2])} alt="" />
					<img src={artifactImage(data.params?.redScores?.autoClassifierState[3])} alt="" />
					<img src={artifactImage(data.params?.redScores?.autoClassifierState[4])} alt="" />
					<img src={artifactImage(data.params?.redScores?.autoClassifierState[5])} alt="" />
					<img src={artifactImage(data.params?.redScores?.autoClassifierState[6])} alt="" />
					<img src={artifactImage(data.params?.redScores?.autoClassifierState[7])} alt="" />
					<img src={artifactImage(data.params?.redScores?.autoClassifierState[8])} alt="" />
				</div>
			</div>

			<div class="locations-group">
				<div class="location">
					<img src={data.params?.redScores?.robot1Auto ? Checkmark : Xmark} alt="" />
					<div class="location-team-number"><h2>{data.params?.red?.teams[0]?.number}</h2></div>
				</div>
				<div class="location">
					<img src={data.params?.redScores?.robot2Auto ? Checkmark : Xmark} alt="" />
					<div class="location-team-number"><h2>{data.params?.red?.teams[1]?.number}</h2></div>
				</div>
			</div>
		</div>
	</div>

	<svg
		class="overlay-background"
		width="1920px"
		height="1080px"
		viewBox="0 0 1920 1080"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<title>End Auto</title>
		<defs>
			<path d="M0,0 L1920,0 L1920,1080 L0,1080 L0,0 Z" id="path-1"></path>
			<filter
				x="-5.7%"
				y="-21.2%"
				width="111.4%"
				height="150.0%"
				filterUnits="objectBoundingBox"
				id="filter-842"
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
				x="-5.7%"
				y="-21.2%"
				width="111.4%"
				height="150.0%"
				filterUnits="objectBoundingBox"
				id="filter-843"
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
			id="End-Auto"
			stroke="none"
			fill="none"
			xlink:href="#path-1"
			fill-rule="evenodd"
			stroke-width="1"
		>
			<g id="Red-Score-Zone" filter="url(#filter-842)" transform="translate(1440, 168)">
				<g id="Red-2-Leave" transform="translate(232, 56)">
					<rect id="Background" fill="#830F12" x="0" y="0" width="224" height="48"></rect>
					<rect id="Score-Background" fill="#ED1C24" x="0" y="0" width="48" height="48"></rect>
					<g
						id="Leave"
						transform="translate(197, 24) scale(-1, 1) translate(-197, -24)translate(182, 12)"
						stroke="#FFFFFF"
						stroke-width="4"
					>
						<polyline id="Path" points="16 6 16 0 5.21804822e-14 0 0 24 16 24 16 18"></polyline>
						<line x1="10" y1="12" x2="30" y2="12" id="Path-2"></line>
						<polyline id="Path-3" points="23 4 30 12 23 20"></polyline>
					</g>
				</g>
				<g id="Red-1-Leave" transform="translate(0, 56)">
					<rect id="Background" fill="#830F12" x="0" y="0" width="224" height="48"></rect>
					<rect id="Score-Background" fill="#ED1C24" x="0" y="0" width="48" height="48"></rect>
					<g
						id="Leave"
						transform="translate(197, 24) scale(-1, 1) translate(-197, -24)translate(182, 12)"
						stroke="#FFFFFF"
						stroke-width="4"
					>
						<polyline id="Path" points="16 6 16 0 5.21804822e-14 0 0 24 16 24 16 18"></polyline>
						<line x1="10" y1="12" x2="30" y2="12" id="Path-2"></line>
						<polyline id="Path-3" points="23 4 30 12 23 20"></polyline>
					</g>
				</g>
				<g id="Red-Motifs" transform="translate(88, 0)">
					<rect
						id="Background"
						stroke="#ED1C24"
						stroke-width="4"
						fill="#FFFFFF"
						x="-86"
						y="2"
						width="452"
						height="44"
					></rect>
					<rect id="Icon-Background" fill="#ED1C24" x="320" y="0" width="48" height="48"></rect>
					<g id="Motif" transform="translate(328, 9)" fill="#FFFFFF">
						<circle id="Oval" cx="16" cy="7.11111111" r="7.11111111"></circle>
						<circle id="Oval" cx="7.11111111" cy="23.1111111" r="7.11111111"></circle>
						<circle id="Oval" cx="24.8888889" cy="23.1111111" r="7.11111111"></circle>
					</g>
					<rect id="Score-Background" fill="#ED1C24" x="-88" y="0" width="48" height="48"></rect>
				</g>
			</g>
			<g id="Blue-Score-Zone" filter="url(#filter-843)" transform="translate(24, 168)">
				<g id="Blue-2-Leave" transform="translate(232, 56)">
					<rect id="Background" fill="#004272" x="0" y="0" width="224" height="48"></rect>
					<rect id="Score-Background" fill="#0066B3" x="176" y="0" width="48" height="48"></rect>
					<g id="Leave" transform="translate(12, 12)" stroke="#FFFFFF" stroke-width="4">
						<polyline id="Path" points="16 6 16 0 5.21804822e-14 0 0 24 16 24 16 18"></polyline>
						<line x1="10" y1="12" x2="30" y2="12" id="Path-2"></line>
						<polyline id="Path-3" points="23 4 30 12 23 20"></polyline>
					</g>
				</g>
				<g id="Blue-1-Leave" transform="translate(0, 56)">
					<rect id="Background" fill="#004272" x="0" y="0" width="224" height="48"></rect>
					<rect id="Score-Background" fill="#0066B3" x="176" y="0" width="48" height="48"></rect>
					<g id="Leave" transform="translate(12, 12)" stroke="#FFFFFF" stroke-width="4">
						<polyline id="Path" points="16 6 16 0 5.21804822e-14 0 0 24 16 24 16 18"></polyline>
						<line x1="10" y1="12" x2="30" y2="12" id="Path-2"></line>
						<polyline id="Path-3" points="23 4 30 12 23 20"></polyline>
					</g>
				</g>
				<g id="Blue-Motifs" transform="translate(48, 0)">
					<rect
						id="Background"
						stroke="#0066B3"
						stroke-width="4"
						fill="#FFFFFF"
						x="-46"
						y="2"
						width="452"
						height="44"
					></rect>
					<rect id="Score-Background" fill="#0066B3" x="360" y="0" width="48" height="48"></rect>
					<rect id="Icon-Background" fill="#0066B3" x="-48" y="0" width="48" height="48"></rect>
					<g id="Motif" transform="translate(-40, 9)" fill="#FFFFFF">
						<circle id="Oval" cx="16" cy="7.11111111" r="7.11111111"></circle>
						<circle id="Oval" cx="7.11111111" cy="23.1111111" r="7.11111111"></circle>
						<circle id="Oval" cx="24.8888889" cy="23.1111111" r="7.11111111"></circle>
					</g>
				</g>
			</g>
		</g>
	</svg>
</div>

<style>
	@import url('/style/auto-end.css');
</style>
