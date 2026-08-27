export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarLayout {
  width: string;
  maxWidth: number;
  isMobile: boolean;
  isTablet: boolean;
  isUltra: boolean;
}

export interface MobileMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavLinksProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}