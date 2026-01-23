export interface MenuItem {
  label: string;
  link: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
  isExpanded?: boolean;
}

export interface NavItem {
  label: string;
  link: string;
  hasDropdown?: boolean;
  isExpanded?: boolean;
  sections?: MenuSection[];
}

