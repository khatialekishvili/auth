export interface MenuItem {
  label: string;
  link: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface NavItem {
  label: string;
  link: string;
  hasDropdown?: boolean;
  sections?: MenuSection[];
}

