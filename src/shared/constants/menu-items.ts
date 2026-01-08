import { NavItem } from '../models/menu.models';

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Shop',
    link: '/products',
    hasDropdown: true,
    sections: [
      {
        title: 'Categories',
        items: [
          { label: 'Bags', link: '#' },
          { label: 'Clothing', link: '#' },
          { label: 'Leather Goods', link: '#' },
          { label: 'Accessories', link: '#' },
          { label: 'Gifts', link: '#' },
          { label: 'Shop All', link: '#' }
        ]
      },
      {
        title: 'Featured',
        items: [
          { label: 'New Arrivals', link: '#' },
          { label: 'Bestsellers', link: '#' },
          { label: 'Trending Now', link: '#' },
          { label: 'Loungewear', link: '#' }
        ]
      },
      {
        title: 'Collections',
        items: [
          { label: 'Party and events', link: '#' },
          { label: 'Office looks', link: '#' },
          { label: 'Selection', link: '#' },
          { label: 'Online Exclusive', link: '#' },
          { label: 'Knitwear', link: '#' },
          { label: 'Total Look', link: '#' },
          { label: 'Basics', link: '#' }
        ]
      }
    ]
  },
  { label: 'New Arrivals', link: '#' },
  { label: 'Sales', link: '#' },
  { label: 'Journal', link: '#' }
];

