<svelte:options customElement="results-up-next-overlay" />

<script lang="ts">
	import type { InformationMessage } from './types';

	import { Marquee } from '@selemondev/svelte-marquee';
	import '@selemondev/svelte-marquee/dist/style.css';

	export let info: InformationMessage = {} as InformationMessage;
	export let useLeagueRanking: boolean;
</script>

<div id="results-up-next-overlay" class="overlay-container">
	<div id="overlay-content">
		<div id="up-next-banner">
			<div id="blue-teams">
				<div class="team-card">
					<div class="team-number"><h2>{info.params?.blue?.teams[0]?.number}</h2></div>

					<div class="team-name">
						{#if info.params?.blue?.teams[0]?.name.length > 20}
							<Marquee fade={true}>
								<h2>{info.params?.blue?.teams[0]?.name}</h2>
							</Marquee>
						{:else}
							<h2>{info.params?.blue?.teams[0]?.name}</h2>
						{/if}
					</div>

					<div class="team-rank">
						<h2>
							{useLeagueRanking
								? info.params?.blue?.teams[0]?.leagueRanking
								: info.params?.blue?.teams[0]?.ranking || 'NP'}
						</h2>
					</div>
				</div>

				<div class="team-card">
					<div class="team-number"><h2>{info.params?.blue?.teams[1]?.number}</h2></div>

					<div class="team-name">
						{#if info.params?.blue?.teams[1]?.name.length > 20}
							<Marquee fade={true}>
								<h2>{info.params?.blue?.teams[1]?.name}</h2>
							</Marquee>
						{:else}
							<h2>{info.params?.blue?.teams[1]?.name}</h2>
						{/if}
					</div>

					<div class="team-rank">
						<h2>
							{useLeagueRanking
								? info.params?.blue?.teams[1]?.leagueRanking
								: info.params?.blue?.teams[1]?.ranking || 'NP'}
						</h2>
					</div>
				</div>
			</div>

			<div id="up-next-match-name">
				<h1>{info.params?.matchName}</h1>
			</div>

			<div id="red-teams">
				<div class="team-card">
					<div class="team-rank">
						<h2>
							{useLeagueRanking
								? info.params?.red?.teams[0]?.leagueRanking
								: info.params?.red?.teams[0]?.ranking || 'NP'}
						</h2>
					</div>

					<div class="team-name">
						{#if info.params?.red?.teams[0]?.name.length > 20}
							<Marquee fade={true}>
								<h2>{info.params?.red?.teams[0]?.name}</h2>
							</Marquee>
						{:else}
							<h2>{info.params?.red?.teams[0]?.name}</h2>
						{/if}
					</div>

					<div class="team-number"><h2>{info.params?.red?.teams[0]?.number}</h2></div>
				</div>

				<div class="team-card">
					<div class="team-rank">
						<h2>
							{useLeagueRanking
								? info.params?.red?.teams[1]?.leagueRanking
								: info.params?.red?.teams[1]?.ranking || 'NP'}
						</h2>
					</div>

					<div class="team-name">
						{#if info.params?.red?.teams[1]?.name.length > 20}
							<Marquee fade={true}>
								<h2>{info.params?.red?.teams[1]?.name}</h2>
							</Marquee>
						{:else}
							<h2>{info.params?.red?.teams[1]?.name}</h2>
						{/if}
					</div>

					<div class="team-number"><h2>{info.params?.red?.teams[1]?.number}</h2></div>
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
		<title>Results Up Next</title>
		<defs>
			<path d="M0,0 L1920,0 L1920,1080 L0,1080 L0,0 Z" id="path-1"></path>
			<filter
				x="-1.4%"
				y="-46.9%"
				width="102.7%"
				height="187.5%"
				filterUnits="objectBoundingBox"
				id="filter-2"
			>
				<feOffset dx="0" dy="-4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
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
				x="-3.8%"
				y="-20.8%"
				width="107.5%"
				height="158.3%"
				filterUnits="objectBoundingBox"
				id="filter-3"
			>
				<feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
				<feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1"
				></feGaussianBlur>
				<feColorMatrix
					values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
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
				x="-3.8%"
				y="-20.8%"
				width="107.5%"
				height="158.3%"
				filterUnits="objectBoundingBox"
				id="filter-4"
			>
				<feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
				<feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1"
				></feGaussianBlur>
				<feColorMatrix
					values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
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
				x="-3.8%"
				y="-20.8%"
				width="107.5%"
				height="158.3%"
				filterUnits="objectBoundingBox"
				id="filter-5"
			>
				<feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
				<feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1"
				></feGaussianBlur>
				<feColorMatrix
					values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
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
				x="-3.8%"
				y="-20.8%"
				width="107.5%"
				height="158.3%"
				filterUnits="objectBoundingBox"
				id="filter-6"
			>
				<feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
				<feGaussianBlur stdDeviation="4" in="shadowOffsetOuter1" result="shadowBlurOuter1"
				></feGaussianBlur>
				<feColorMatrix
					values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
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
			id="Results-Up-Next"
			stroke="none"
			fill="none"
			xlink:href="#path-1"
			fill-rule="evenodd"
			stroke-width="1"
		>
			<g id="Bottom-Bar" filter="url(#filter-2)" transform="translate(0, 1016)">
				<g id="Red-Teams" transform="translate(1152, 0)">
					<rect id="Background" fill="#830F12" x="0" y="0" width="768" height="64"></rect>
					<g id="Red-Team-Card-2" filter="url(#filter-3)" transform="translate(388, 8)">
						<rect id="Background" fill="#ED1C24" x="0" y="0" width="372" height="48"></rect>
						<rect id="Rank-Background" fill="#FFFFFF" x="0" y="0" width="48" height="48"></rect>
					</g>
					<g id="Red-Team-Card-1" filter="url(#filter-4)" transform="translate(8, 8)">
						<rect id="Background" fill="#ED1C24" x="0" y="0" width="372" height="48"></rect>
						<rect id="Rank-Background" fill="#FFFFFF" x="0" y="0" width="48" height="48"></rect>
					</g>
				</g>
				<g id="Info" transform="translate(768, 0)">
					<rect id="Background" fill="#FFFFFF" x="0" y="0" width="384" height="64"></rect>
					<text
						id="Up-Next"
						font-family="InterVariable-SemiBold, Inter Variable"
						font-size="16"
						font-weight="500"
						fill="#000000"
					>
						<tspan x="16" y="28">Up</tspan>
						<tspan x="16" y="48">Next</tspan>
					</text>
				</g>
				<g id="Blue-Teams">
					<rect id="Background" fill="#004272" x="0" y="0" width="768" height="64"></rect>
					<g id="Blue-Team-Card-2" filter="url(#filter-5)" transform="translate(388, 8)">
						<rect id="Background" fill="#0066B3" x="0" y="0" width="372" height="48"></rect>
						<rect id="Rank-Background" fill="#FFFFFF" x="324" y="0" width="48" height="48"></rect>
					</g>
					<g id="Blue-Team-Card-1" filter="url(#filter-6)" transform="translate(8, 8)">
						<rect id="Background" fill="#0066B3" x="0" y="0" width="372" height="48"></rect>
						<rect id="Rank-Background" fill="#FFFFFF" x="324" y="0" width="48" height="48"></rect>
					</g>
				</g>
			</g>
		</g>
	</svg>
</div>

<style>
	@import url('/style/results-up-next.css');
</style>
