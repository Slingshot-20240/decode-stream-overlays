<script lang="ts">
	import * as types from '$lib/types';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import PreviewOverlay from '$lib/PreviewOverlay.svelte';
	import AutoOverlay from '$lib/AutoOverlay.svelte';
	import AutoEndOverlay from '$lib/AutoEndOverlay.svelte';
	import TeleopOverlay from '$lib/TeleopOverlay.svelte';
	import EndgameOverlay from '$lib/EndgameOverlay.svelte';
	import AwaitingReviewOverlay from '$lib/AwaitingReviewOverlay.svelte';
	import ResultsOverlay from '$lib/ResultsOverlay.svelte';
	import ResultsUpNextOverlay from '$lib/ResultsUpNextOverlay.svelte';
	import AbortedOverlay from '$lib/AbortedOverlay.svelte';

	import MatchStartSound from '$lib/assets/audio/match_start.wav';
	import AutoEndSound from '$lib/assets/audio/auto_end.wav';
	import PickUpControllersSound from '$lib/assets/audio/pick_up_controllers.wav';
	import ThreeTwoOneSound from '$lib/assets/audio/3-2-1.wav';
	import TeleopStartSound from '$lib/assets/audio/teleop_start.wav';
	import EndgameSound from '$lib/assets/audio/endgame.wav';
	import MatchEndSound from '$lib/assets/audio/match_end.wav';
	import AbortSound from '$lib/assets/audio/abort.wav';

	let scoringIp = '';
	let eventCode = '';
	let leagueTitle = '';
	let eventTitle = '';
	let useLocalTime = false;

	let type: types.DisplayType = types.DisplayType.NONE;
	let showResultsUpNextOverlay = false;
	let informationalData: types.InformationMessage;
	let scoringData: types.ScoreResultMessage;

	let rankingStore: Record<string, { leagueRanking: number; eventRanking: number }> = {};

	let latestInformationIndex = -1;
	let latestScoringIndex = -1;

	let matchStartSound: HTMLAudioElement;
	let autoEndSound: HTMLAudioElement;
	let pickUpControllersSound: HTMLAudioElement;
	let threeTwoOneSound: HTMLAudioElement;
	let teleopStartSound: HTMLAudioElement;
	let endgameSound: HTMLAudioElement;
	let matchEndSound: HTMLAudioElement;
	let abortSound: HTMLAudioElement;

	let initialized = false;
	let timeSync = {
		id: 0,
		sentAt: 0,
		receivedTs: 0,
		receivedAtLocal: 0,
		interval: undefined as NodeJS.Timeout | undefined
	};
	let timer = 150;
	let timerPeriod = types.TimerPeriod.NONE;
	let timerRunning = false;
	let timeout: NodeJS.Timeout;

	function ts(): number {
		return performance.now() - timeSync.receivedAtLocal + timeSync.receivedTs;
	}

	function startTimer(seconds: number = 150) {
		let floored = Math.floor(seconds);
		timer = floored;

		if (seconds >= 150) {
			matchStartSound.pause();
			matchStartSound.currentTime = 0;
			matchStartSound.play();
		}

		setTimeout(
			() => {
				timerRunning = true;
				let start = 0;
				let nextAt = 0;

				let interval = function () {
					if (!timerRunning) return;

					if (!start) {
						start = new Date().getTime();
						nextAt = start;
					} else if (timer <= 121 && timerPeriod === types.TimerPeriod.AUTO) {
						timer = 8;
						timerPeriod = types.TimerPeriod.TRANSITION;
						autoEndSound.pause();
						autoEndSound.currentTime = 0;
						autoEndSound.play();
					} else if (timer <= 1 && timerPeriod === types.TimerPeriod.TRANSITION) {
						timer = 120;
						timerPeriod = types.TimerPeriod.TELEOP;
						teleopStartSound.pause();
						teleopStartSound.currentTime = 0;
						teleopStartSound.play();
					} else if (timer <= 0) {
						timerRunning = false;
						timerPeriod = types.TimerPeriod.NONE;
					} else {
						timer--;
					}

					if (timerPeriod === types.TimerPeriod.AUTO && timer <= 130) {
						type = types.DisplayType.AUTO_END;
					} else if (timerPeriod === types.TimerPeriod.TRANSITION) {
						if (timer === 6) {
							pickUpControllersSound.pause();
							pickUpControllersSound.currentTime = 0;
							pickUpControllersSound.play();
						} else if (timer === 3) {
							threeTwoOneSound.pause();
							threeTwoOneSound.currentTime = 0;
							threeTwoOneSound.play();
						}
					} else if (timerPeriod === types.TimerPeriod.TELEOP && timer > 0) {
						if (timer > 20) {
							type = types.DisplayType.TELEOP;
						} else {
							type = types.DisplayType.ENDGAME;
							if (timer === 20) {
								endgameSound.pause();
								endgameSound.currentTime = 0;
								endgameSound.play();
							}
						}
					} else if (timer <= 0) {
						timerRunning = false;
						timerPeriod = types.TimerPeriod.NONE;
						type = types.DisplayType.AWAITING_REVIEW;
						matchEndSound.pause();
						matchEndSound.currentTime = 0;
						matchEndSound.play();
						return;
					}

					nextAt += 1000;

					timeout = setTimeout(interval, nextAt - new Date().getTime());
				};

				interval();
			},
			(seconds - floored) * 1000
		);
	}

	function stopTimer() {
        timer = 0;
		timerRunning = false;
		clearTimeout(timeout);
		abortSound.pause();
		abortSound.currentTime = 0;
		abortSound.play();
	}

	function updateType(message: any) {
		let newShowResultsUpNextOverlay = false;

		switch (message?.type) {
			case 'SHOW_SETUP':
				if (scoringData === undefined || type !== types.DisplayType.RESULTS) {
					type = types.DisplayType.PREVIEW;
				} else {
					newShowResultsUpNextOverlay = true;
				}
				break;
			case 'SHOW_PREVIEW':
				type = types.DisplayType.PREVIEW;
				break;
			case 'SHOW_RANDOM':
				type = types.DisplayType.PREVIEW;
				break;
			case 'SHOW_MATCH':
				type = types.DisplayType.AUTO;
				break;
			case 'START_MATCH':
				let offset = (ts() - message.ts) / 1000;
				let startSeconds = 30 - offset;

				if (startSeconds < 0) {
					if (startSeconds > -8) {
						timerPeriod = types.TimerPeriod.TRANSITION;
						type = types.DisplayType.AUTO_END;
						startTimer(Math.abs(startSeconds));
					} else {
						startSeconds = 158 - offset;
						if (startSeconds > 0) {
							if (startSeconds > 20) {
								type = types.DisplayType.TELEOP;
							} else {
								type = types.DisplayType.ENDGAME;
							}
							timerPeriod = types.TimerPeriod.TELEOP;
							startTimer(startSeconds);
						} else {
							type = types.DisplayType.AWAITING_REVIEW;
						}
					}
				} else {
					timerPeriod = types.TimerPeriod.AUTO;
					if (startSeconds > 10) {
						type = types.DisplayType.AUTO;
					} else {
						type = types.DisplayType.AUTO_END;
					}
					startTimer(150 - offset);
				}
				break;
			case 'SHOW_RESULTS':
				type = types.DisplayType.RESULTS;
				break;
			case 'ABORT_MATCH':
				stopTimer();
				type = types.DisplayType.ABORTED;
				break;
		}

		showResultsUpNextOverlay = newShowResultsUpNextOverlay;
	}

	onMount(() => {
		const params = new URLSearchParams(location.search);
		scoringIp = params.get('ip') || '';
		eventCode = params.get('code') || '';
		leagueTitle = params.get('league') || '';
		eventTitle = params.get('event') || '';
		useLocalTime = params.get('useLocalTime') === 'true';

		matchStartSound = document.getElementById('match-start-sound') as HTMLAudioElement;
		autoEndSound = document.getElementById('auto-end-sound') as HTMLAudioElement;
		pickUpControllersSound = document.getElementById(
			'pick-up-controllers-sound'
		) as HTMLAudioElement;
		threeTwoOneSound = document.getElementById('three-two-one-sound') as HTMLAudioElement;
		teleopStartSound = document.getElementById('teleop-start-sound') as HTMLAudioElement;
		endgameSound = document.getElementById('endgame-sound') as HTMLAudioElement;
		matchEndSound = document.getElementById('match-end-sound') as HTMLAudioElement;
		abortSound = document.getElementById('abort-sound') as HTMLAudioElement;

		connect();
	});

	function connect() {
		let ws = new WebSocket(`ws://${scoringIp}/stream/display/command/?code=${eventCode}`);

		ws.onopen = () => {
			console.log('WebSocket connection opened');

			if (useLocalTime) {
				timeSync.receivedTs = Date.now();
				timeSync.receivedAtLocal = performance.now();

				if (!initialized) {
					initialized = true;
					if (
						informationalData?.index > scoringData?.index ||
						scoringData?.type === 'SCORE_UPDATE'
					) {
						updateType(informationalData);
					} else {
						updateType(scoringData);
					}
				}
			} else {
				ws.send(`TIMESYNC:{"jsonrpc":"2.0","id":${timeSync.id},"method":"timesync"}`);
				timeSync.sentAt = ts();
				timeSync.interval = setInterval(() => {
					timeSync.id++;
					ws.send(`TIMESYNC:{"jsonrpc":"2.0","id":${timeSync.id},"method":"timesync"}`);
					timeSync.sentAt = ts();
				}, 30000);
			}
		};

		ws.onmessage = (event) => {
			if (event.data === 'ping') {
				ws.send('pong');
				return;
			}

			if (event.data === 'pong') {
				return;
			}

			if (event.data.startsWith('TIMESYNC:')) {
				const message = JSON.parse(event.data.substring(9));
				timeSync.receivedAtLocal = performance.now();
				timeSync.receivedTs = message.result + (ts() - timeSync.sentAt) / 2;

				if (!initialized) {
					initialized = true;
					if (
						informationalData?.index > scoringData?.index ||
						scoringData?.type === 'SCORE_UPDATE'
					) {
						updateType(informationalData);
					} else {
						updateType(scoringData);
					}
				}
				return;
			}

			const message = JSON.parse(event.data);
			console.log(message);

			const pitUpdateTeams = message.params?.message?.payload as any[];
			if (message.params?.message?.type === 'RANKINGS' && pitUpdateTeams) {
				pitUpdateTeams.forEach((team: any) => {
					rankingStore[team.team] = {
						leagueRanking:
							team.leagueRank > 0 ? team.leagueRank : rankingStore[team.team]?.leagueRanking || 0,
						eventRanking: team.rank > 0 ? team.rank : rankingStore[team.team]?.eventRanking || 0
					};
				});

				const newInformationalData = { ...informationalData };
				newInformationalData.params?.blue?.teams.forEach((team: types.InformationalTeamInfo) => {
					team.leagueRanking = rankingStore[team.number]?.leagueRanking || 0;
					team.ranking = rankingStore[team.number]?.eventRanking || 0;
				});
				newInformationalData.params?.red?.teams.forEach((team: types.InformationalTeamInfo) => {
					team.leagueRanking = rankingStore[team.number]?.leagueRanking || 0;
					team.ranking = rankingStore[team.number]?.eventRanking || 0;
				});
				informationalData = newInformationalData;

				const newScoringData = { ...scoringData };
				newScoringData.params?.blue?.teams.forEach((team: types.TeamInfo) => {
					team.leagueRanking = rankingStore[team.number]?.leagueRanking || 0;
					team.ranking = rankingStore[team.number]?.eventRanking || 0;
				});
				newScoringData.params?.red?.teams.forEach((team: types.TeamInfo) => {
					team.leagueRanking = rankingStore[team.number]?.leagueRanking || 0;
					team.ranking = rankingStore[team.number]?.eventRanking || 0;
				});
				scoringData = newScoringData;

				return;
			}

			if (
				(latestInformationIndex >= message.index &&
					[
						'SHOW_SETUP',
						'SHOW_PREVIEW',
						'SHOW_RANDOM',
						'SHOW_MATCH',
						'START_MATCH',
						'ABORT_MATCH'
					].includes(message.type)) ||
				(latestScoringIndex >= message.index &&
					['SCORE_UPDATE', 'SHOW_RESULTS'].includes(message.type))
			) {
				if (message.params?.matchName === scoringData?.params?.matchName && message.params?.rand) {
					const newScoringData = { ...scoringData };
					newScoringData.params.rand = message.params?.rand;
					scoringData = newScoringData;
				}
				return;
			}

			if (
				[
					'SHOW_SETUP',
					'SHOW_PREVIEW',
					'SHOW_RANDOM',
					'SHOW_MATCH',
					'START_MATCH',
					'ABORT_MATCH'
				].includes(message.type)
			) {
				latestInformationIndex = message.index;

				const newInformationalData = { ...message };
				newInformationalData.params?.blue?.teams.forEach((team: types.InformationalTeamInfo) => {
					team.leagueRanking = rankingStore[team.number]?.leagueRanking || 0;
					team.ranking = rankingStore[team.number]?.eventRanking || 0;
				});
				newInformationalData.params?.red?.teams.forEach((team: types.InformationalTeamInfo) => {
					team.leagueRanking = rankingStore[team.number]?.leagueRanking || 0;
					team.ranking = rankingStore[team.number]?.eventRanking || 0;
				});

				informationalData = newInformationalData;

				if (initialized) {
					updateType(message);
				}
			} else if (['SCORE_UPDATE', 'SHOW_RESULTS'].includes(message.type)) {
				latestScoringIndex = message.index;

				const newScoringData = { ...message };
				if (message.type !== 'SHOW_RESULTS') {
					newScoringData.params?.blue?.teams.forEach((team: types.TeamInfo) => {
						team.leagueRanking = rankingStore[team.number]?.leagueRanking || 0;
						team.ranking = rankingStore[team.number]?.eventRanking || 0;
					});
					newScoringData.params?.red?.teams.forEach((team: types.TeamInfo) => {
						team.leagueRanking = rankingStore[team.number]?.leagueRanking || 0;
						team.ranking = rankingStore[team.number]?.eventRanking || 0;
					});
				}

				scoringData = newScoringData;

				if (initialized) {
					updateType(message);
				}
			}
		};

		ws.onclose = () => {
			console.log('WebSocket connection closed');
			clearInterval(timeSync.interval);
			connect();
		};

		ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};
	}

	let currentComponent: any;

	const overlayMap: Partial<Record<types.DisplayType, any>> = {
		[types.DisplayType.PREVIEW]: PreviewOverlay,
		[types.DisplayType.AUTO]: AutoOverlay,
		[types.DisplayType.AUTO_END]: AutoEndOverlay,
		[types.DisplayType.TELEOP]: TeleopOverlay,
		[types.DisplayType.ENDGAME]: EndgameOverlay,
		[types.DisplayType.AWAITING_REVIEW]: AwaitingReviewOverlay,
		[types.DisplayType.RESULTS]: ResultsOverlay,
		[types.DisplayType.ABORTED]: AbortedOverlay
	};

	$: currentComponent = overlayMap[type];
</script>

<main>
	<container>
		{#key type}
			<div in:fade={{ duration: 500 }} out:fade={{ delay: 500, duration: 500 }}>
				<svelte:component
					this={currentComponent}
					{leagueTitle}
					{eventTitle}
					data={scoringData as types.ScoreResultMessage}
					info={informationalData as types.InformationMessage}
					{timer}
				/>
			</div>
		{/key}

		{#if showResultsUpNextOverlay}
			<div in:fade={{ duration: 500 }} out:fade={{ delay: 500, duration: 500 }}>
				<ResultsUpNextOverlay info={informationalData as types.InformationMessage} />
			</div>
		{/if}
	</container>

	<audio-container>
		<audio id="match-start-sound" src={MatchStartSound} preload="auto"></audio>
		<audio id="auto-end-sound" src={AutoEndSound} preload="auto"></audio>
		<audio id="pick-up-controllers-sound" src={PickUpControllersSound} preload="auto"></audio>
		<audio id="three-two-one-sound" src={ThreeTwoOneSound} preload="auto"></audio>
		<audio id="teleop-start-sound" src={TeleopStartSound} preload="auto"></audio>
		<audio id="endgame-sound" src={EndgameSound} preload="auto"></audio>
		<audio id="match-end-sound" src={MatchEndSound} preload="auto"></audio>
		<audio id="abort-sound" src={AbortSound} preload="auto"></audio>
	</audio-container>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #0000;
	}

	main {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;

		container {
			position: relative;
			width: 100vw;
			height: calc(100vw / 16 * 9);

			:global(#overlay-container, #results-up-next-overlay-container) {
				position: absolute;
				top: 0;
				left: 0;
				transform-origin: top left;
				/* transform: scale(calc(100vw / 1920px)); */
				transform: scale(2);
			}

			:global(#overlay-container) {
				z-index: 0;
			}

			:global(#results-up-next-overlay-container) {
				z-index: 1;
			}
		}

		@media (min-aspect-ratio: 16 / 9) {
			container {
				width: calc(100vh / 9 * 16);
				height: 100vh;

				:global(#overlay-container, #results-up-next-overlay-container) {
					/* transform: scale(calc(100vh / 1080px)); */
					transform: scale(2);
				}
			}
		}

		audio-container {
			position: absolute;
			width: 0;
			height: 0;
			overflow: hidden;
			top: 100vh;
			opacity: 0;
			z-index: -1;
		}
	}
</style>
