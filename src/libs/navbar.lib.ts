import type { NavbarLayout } from "@/types/navbar.type";

export function getNavbarLayout(viewportWidth: number, scrolled: boolean): NavbarLayout {
    const isMobile = viewportWidth > 0 && viewportWidth < 768;

    const isTablet = viewportWidth >= 768 && viewportWidth < 1280;

    const isUltra = viewportWidth >= 2560;

    const width = isMobile ? "calc(100% - 28px)" : isTablet ? scrolled ? "calc(100% - 96px)" : "calc(100% - 50px)" : scrolled ? "calc(100% - 180px)" : "calc(100% - 48px)";

    const maxWidth = isMobile ? 9999 : isUltra ? scrolled ? 1400 : 2200 : scrolled ? 900 : 1500;

    return {
        width,
        maxWidth,
        isMobile,
        isTablet,
        isUltra,
    };
}