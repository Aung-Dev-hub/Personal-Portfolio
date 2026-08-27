export interface HighlightItem {
    icon: string;
    text: string;
}

export interface AboutBadgeData {
    year: string;
    label: string;
}

export interface AboutTitleData {
    normal: string;
    highlight: string;
}

export interface AboutData {
    eyebrow: string;
    title: AboutTitleData;
    paragraphs: string[];
    badge: AboutBadgeData;
    highlights: HighlightItem[];
}