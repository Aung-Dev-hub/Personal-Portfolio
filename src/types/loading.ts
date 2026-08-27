export interface LoadingAnimationConfig {
    progressInterval: number;
    progressMin: number;
    progressMax: number;
    messageInterval: number;
    exitDelay: number;
}

export interface LoadingScreenData {
    name: string;
    messages: string[];
    animation: LoadingAnimationConfig;
}

export interface LoadingScreenProps {
    onComplete: () => void;
}

export interface LoadingAnimationProps {
    name: string;
    messages: string[];
    progress: number;
    messageIndex: number;
}