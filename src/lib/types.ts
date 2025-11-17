// MARK: - GENERAL
//
export enum DisplayType {
    NONE = "NONE",
    PREVIEW = "PREVIEW",
    AUTO = "AUTO",
    AUTO_END = "AUTO_END",
    TELEOP = "TELEOP",
    ENDGAME = "ENDGAME",
    AWAITING_REVIEW = "AWAITING_REVIEW",
    RESULTS = "RESULTS",
    ABORTED = "ABORTED"
}

export enum TimerPeriod {
    NONE = "NONE",
    AUTO = "AUTO",
    TRANSITION = "TRANSITION",
    TELEOP = "TELEOP",
}

// MARK: - INFORMATIONAL UPDATES
// 
export interface InformationMessage {
    type: "SHOW_SETUP" | "SHOW_PREVIEW" | "SHOW_RANDOM" | "SHOW_MATCH" | "START_MATCH";
    params: {
        forceFullscreen: boolean;

        number: number;
        series: number;
        displayNumber: number;
        matchName: string;
        field: number;
        tournamentLevel: string;

        red: InformationalAllianceInfo;
        blue: InformationalAllianceInfo;

        singleTeam: boolean;
    };
    ts: number;
    index: number;
    field: number;
    init: boolean;
}

export interface InformationalTeamInfo {
    number: string;
    name: string;
    carriesCard: boolean;
    ranking: number;
    leagueRanking: number;
}

export interface InformationalAllianceInfo {
    teams: InformationalTeamInfo[];
    wins: number;
    wonSeries: boolean;
}

// MARK: - SCORE UPDATE & MATCH RESULTS
// 
export interface ScoreResultMessage {
    type: "SCORE_UPDATE" | "SHOW_RESULTS";
    params: {
        redScores: ScoreDetails;
        blueScores: ScoreDetails;

        rand: number;
        hrReview: boolean;
        redScore: number;
        blueScore: number;
        redHighScore: boolean;
        blueHighScore: boolean;
        winner: string;
        isEventConclusion: boolean;
        isDivisionConclusion: boolean;
        highScoreLevel: "EVENT" | string;
        number: number;
        series: number;
        displayNumber: number;
        matchName: string;
        field: number;
        tournamentLevel: string;
        red: AllianceInfo;
        blue: AllianceInfo;
        singleTeam: boolean;
    };
    ts: number;
    index: number;
    field: number;
    init: boolean;
}

export type ClassifierState =
    | "NONE"
    | "GREEN"
    | "PURPLE";

export type ParkState =
    | "NONE"
    | "PARTIAL"
    | "FULL";

export interface ScoreDetails {
    autoClassifiedArtifacts: number;
    autoOverflowArtifacts: number;
    autoClassifierState: ClassifierState[];
    robot1Auto: boolean;
    robot2Auto: boolean;

    teleopClassifiedArtifacts: number;
    teleopOverflowArtifacts: number;
    teleopDepotArtifacts: number;
    teleopClassifierState: ClassifierState[];
    robot1Teleop: ParkState;
    robot2Teleop: ParkState;

    minorFouls: number;
    majorFouls: number;

    autoLeavePoints: number;
    autoArtifactPoints: number;
    autoPatternPoints: number;
    teleopArtifactPoints: number;
    teleopDepotPoints: number;
    teleopPatternPoints: number;
    teleopBasePoints: number;

    autoPoints: number;
    teleopPoints: number;
    foulPointsCommitted: number;
    preFoulTotal: number;

    violations: string[];

    ownMajorFouls: number;
    ownMinorFouls: number;
    otherMajorFouls: number;
    otherMinorFouls: number;
    hrMajorFouls: number;
    hrMinorFouls: number;

    movementRP: boolean;
    goalRP: boolean;
    patternRP: boolean;

    clazz: string;
    adjust: number;
}

export interface AllianceInfo {
    teams: TeamInfo[];
    wins: number;
    wonSeries: boolean;
}

export interface TeamInfo {
    number: string;
    name: string;
    card: number;
    ranking: number;
    leagueRanking: number;
    rankMove: "UP" | "DOWN" | "SAME" | string;
}