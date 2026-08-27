export interface HeroTitle {
    firstLine: string;
    secondLine: string;
}

export interface HeroButton {
    label: string;
    href: string;
}

export interface HeroButtons {
    primary: HeroButton;
    secondary: HeroButton;
}

export interface HeroBottom {
    left: string;
    right: string;
}

export interface HeroData {
    status: string;
    title: HeroTitle;
    description: string;
    currentLabel: string;
    roles: string[];
    buttons: HeroButtons;
    bottom: HeroBottom;
}

export interface UseHeroResult {
    index: number;
    offset: number;
}

export interface HeroDescriptionProps {
    description: string;
    currentLabel: string;
    roles: string[];
    index: number;
}

export interface HeroRoleProps {
    roles: string[];
    index: number;
}

export interface HeroStatusProps {
    status: string;
}

export interface HeroTitleProps {
    title: HeroTitle;
}

export interface HeroButtonsProps {
    buttons: HeroButtons;
}

export interface HeroBottomProps {
    bottom: HeroBottom;
    offset: number;
}