<svelte:options customElement="endgame-overlay" />

<script lang="ts">
	import type { ScoreResultMessage } from './types';

	import PurpleArtifact from '$lib/assets/image/purple_artifact.svg';
	import GreenArtifact from '$lib/assets/image/green_artifact.svg';
	import NoArtifact from '$lib/assets/image/no_artifact.svg';
	import FullPark from '$lib/assets/image/full_park.svg';
	import PartialPark from '$lib/assets/image/partial_park.svg';
	import NoPark from '$lib/assets/image/no_park.svg';

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

	function parkImage(state: 'NONE' | 'PARTIAL' | 'FULL') {
		switch (state) {
			case 'PARTIAL':
				return PartialPark;
			case 'FULL':
				return FullPark;
			default:
				return NoPark;
		}
	}
</script>

<div id="endgame-overlay" class="overlay-container">
	<div id="overlay-content">
		<div id="blue-teleop-special-score-details" class="special-score-details-group">
			<div class="motifs">
				<div class="motifs-artifacts">
					<img src={artifactImage(data.params?.blueScores?.teleopClassifierState[0])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.teleopClassifierState[1])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.teleopClassifierState[2])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.teleopClassifierState[3])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.teleopClassifierState[4])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.teleopClassifierState[5])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.teleopClassifierState[6])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.teleopClassifierState[7])} alt="" />
					<img src={artifactImage(data.params?.blueScores?.teleopClassifierState[8])} alt="" />
				</div>
				<div class="motifs-count"><h2>{data.params?.blueScores?.teleopPatternPoints / 2}</h2></div>
			</div>

			<div class="locations-group">
				<div class="location">
					<div class="location-team-number"><h2>{data.params?.blue?.teams[0]?.number}</h2></div>
					<img src={parkImage(data.params?.blueScores?.robot1Teleop)} alt="" />
				</div>
				<div class="location">
					<div class="location-team-number"><h2>{data.params?.blue?.teams[1]?.number}</h2></div>
					<img src={parkImage(data.params?.blueScores?.robot2Teleop)} alt="" />
				</div>
			</div>
		</div>

		<div id="red-teleop-special-score-details" class="special-score-details-group">
			<div class="motifs">
				<div class="motifs-count"><h2>{data.params?.redScores?.teleopPatternPoints / 2}</h2></div>
				<div class="motifs-artifacts">
					<img src={artifactImage(data.params?.redScores?.teleopClassifierState[0])} alt="" />
					<img src={artifactImage(data.params?.redScores?.teleopClassifierState[1])} alt="" />
					<img src={artifactImage(data.params?.redScores?.teleopClassifierState[2])} alt="" />
					<img src={artifactImage(data.params?.redScores?.teleopClassifierState[3])} alt="" />
					<img src={artifactImage(data.params?.redScores?.teleopClassifierState[4])} alt="" />
					<img src={artifactImage(data.params?.redScores?.teleopClassifierState[5])} alt="" />
					<img src={artifactImage(data.params?.redScores?.teleopClassifierState[6])} alt="" />
					<img src={artifactImage(data.params?.redScores?.teleopClassifierState[7])} alt="" />
					<img src={artifactImage(data.params?.redScores?.teleopClassifierState[8])} alt="" />
				</div>
			</div>

			<div class="locations-group">
				<div class="location">
					<img src={parkImage(data.params?.redScores?.robot1Teleop)} alt="" />
					<div class="location-team-number"><h2>{data.params?.red?.teams[0]?.number}</h2></div>
				</div>
				<div class="location">
					<img src={parkImage(data.params?.redScores?.robot2Teleop)} alt="" />
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
		<title>Endgame</title>
		<defs>
			<path d="M0,0 L1920,0 L1920,1080 L0,1080 L0,0 Z" id="path-1"></path>
			<filter
				x="-5.7%"
				y="-21.2%"
				width="111.4%"
				height="150.0%"
				filterUnits="objectBoundingBox"
				id="filter-412"
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
				id="filter-413"
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
			id="Endgame"
			stroke="none"
			fill="none"
			xlink:href="#path-1"
			fill-rule="evenodd"
			stroke-width="1"
		>
			<g id="Red-Endgame-Score-Zone" filter="url(#filter-412)" transform="translate(1440, 168)">
				<g id="Red-2-Location" transform="translate(232, 56)">
					<rect id="Background" fill="#830F12" x="0" y="0" width="224" height="48"></rect>
					<rect id="Score-Background" fill="#ED1C24" x="0" y="0" width="48" height="48"></rect>
					<polygon
						id="Location"
						fill="#FFFFFF"
						points="186 23.2631579 214 10 200.736842 38 200.736842 23.2631579"
					></polygon>
				</g>
				<g id="Red-1-Location" transform="translate(0, 56)">
					<rect id="Background" fill="#830F12" x="0" y="0" width="224" height="48"></rect>
					<rect id="Score-Background" fill="#ED1C24" x="0" y="0" width="48" height="48"></rect>
					<polygon
						id="Location"
						fill="#FFFFFF"
						points="186 23.2631579 214 10 200.736842 38 200.736842 23.2631579"
					></polygon>
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
			<g id="Blue-Endgame-Score-Zone" filter="url(#filter-413)" transform="translate(24, 168)">
				<g id="Blue-2-Location" transform="translate(232, 56)">
					<rect id="Background" fill="#004272" x="0" y="0" width="224" height="48"></rect>
					<rect id="Score-Background" fill="#0066B3" x="176" y="0" width="48" height="48"></rect>
					<polygon
						id="Location"
						fill="#FFFFFF"
						points="10 23.2631579 38 10 24.7368421 38 24.7368421 23.2631579"
					></polygon>
				</g>
				<g id="Blue-1-Location" transform="translate(0, 56)">
					<rect id="Background" fill="#004272" x="0" y="0" width="224" height="48"></rect>
					<rect id="Score-Background" fill="#0066B3" x="176" y="0" width="48" height="48"></rect>
					<polygon
						id="Location"
						fill="#FFFFFF"
						points="10 23.2631579 38 10 24.7368421 38 24.7368421 23.2631579"
					></polygon>
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
	@import url('/style/endgame.css');
</style>
