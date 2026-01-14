import { NavItem } from '../models/menu.models';

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Shop',
    link: '/products',
    hasDropdown: true,
    isExpanded: false,
    sections: [
      {
        title: 'Categories',
        isExpanded: false,
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
        isExpanded: false,
        items: [
          { label: 'New Arrivals', link: '#' },
          { label: 'Bestsellers', link: '#' },
          { label: 'Trending Now', link: '#' },
          { label: 'Loungewear', link: '#' }
        ]
      },
      {
        title: 'Collections',
        isExpanded: false,
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
  {
    label: 'New Arrivals',
    link: '/products',
    hasDropdown: true,
    isExpanded: false,
    sections: [
      {
        title: 'New In',
        isExpanded: false,
        items: [
          { label: 'Just Dropped', link: '/products' },
          { label: 'This Week', link: '/products' },
          { label: 'Trending Now', link: '/products' },
          { label: 'Editor Picks', link: '/products' }
        ]
      },
      {
        title: 'By Category',
        isExpanded: false,
        items: [
          { label: 'Bags', link: '/products' },
          { label: 'Clothing', link: '/products' },
          { label: 'Leather Goods', link: '/products' },
          { label: 'Accessories', link: '/products' },
          { label: 'Shop All', link: '/products' }
        ]
      },
      {
        title: 'Collections',
        isExpanded: false,
        items: [
          { label: 'Party and events', link: '/products' },
          { label: 'Office looks', link: '/products' },
          { label: 'Online Exclusive', link: '/products' },
          { label: 'Knitwear', link: '/products' }
        ]
      }
    ]
  },
  { label: 'Sales', link: '/products' },
  { label: 'Journal', link: '/products' }
];

