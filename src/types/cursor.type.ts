export interface CursorPosition {
    x: number;
    y: number;
}

export interface CursorColors {
    default: string;
    moving: string;
}

export interface CursorAnimation {
    smoothness: number;
    returnDelay: number;
    colorTransition: string;
}

export interface CursorData {
    size: number;
    colors: CursorColors;
    animation: CursorAnimation;
    shadow: string;
    zIndex: number;
}