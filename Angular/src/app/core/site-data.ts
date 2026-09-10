import { ContentCard, Trustee } from './models';

export const navLinks = [
  { label: 'Home', route: '/' },
  { label: 'About Us', route: '/about' },
  { label: 'Our Work', route: '/causes' },
  { label: 'Donate', route: '/donate' },
  { label: 'Contact', route: '/contact' },
];

export const focusAreas: ContentCard[] = [
  {
    title: 'Free School for Special Children',
    description: 'Education, learning support and opportunities for special children to grow with confidence.',
    imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80',
    route: '/causes',
    iconPath: 'M12 4 3 9l9 5 9-5-9-5Zm0 7L3 6v8l9 5 9-5V6l-9 5Zm0 2.2L5.8 9 12 5.8 18.2 9 12 13.2Z',
    ctaLabel: 'Learn More',
  },
  {
    title: 'Free Stitching Centre',
    description: 'Stitching skills and practical support for women and people working towards self-reliance.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    route: '/causes',
    iconPath: 'M12 21s-7-4.6-7-10.2A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 7 3.8C19 16.4 12 21 12 21Zm-1-12H8v2h3v3h2v-3h3V9h-3V6h-2v3Z',
    ctaLabel: 'Learn More',
  },
  {
    title: 'Free Medical Camps',
    description: 'Free medical camps to help make basic health and medical support accessible to those in need.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    route: '/causes',
    iconPath: 'M12 12a4 4 0 1 0-0.001-8.001A4 4 0 0 0 12 12Zm0 2c-3.3 0-6 2.2-6 5v1h12v-1c0-2.8-2.7-5-6-5Z',
    ctaLabel: 'Learn More',
  },
  {
    title: 'Support for Needy Families',
    description: 'An effort to support poor and needy people and families according to their circumstances.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    route: '/causes',
    iconPath: 'M4 20h16M6 20V9l6-5 6 5v11M10 20v-6h4v6',
    ctaLabel: 'Learn More',
  },
  {
    title: 'Support for Needy Daughters’ Marriages',
    description: 'Support, as far as possible, for marriages of daughters from families facing hardship.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    route: '/donate',
    iconPath: 'M12 21s-7-4.6-7-10.2A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 7 3.8C19 16.4 12 21 12 21Z',
    ctaLabel: 'Learn More',
  },
];

export const causes: ContentCard[] = [
  {
    title: 'Free School for Special Children',
    description: 'Working to provide special children with education, learning and opportunities to move forward.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    route: '/donate',
    iconPath: 'M12 4 3 9l9 5 9-5-9-5Zm0 7L3 6v8l9 5 9-5V6l-9 5Zm0 2.2L5.8 9 12 5.8 18.2 9 12 13.2Z',
    ctaLabel: 'Support This Cause',
  },
  {
    title: 'Free Stitching Centre',
    description: 'Supporting women and needy people to learn stitching skills and move towards self-reliance.',
    imageUrl: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?auto=format&fit=crop&w=1200&q=80',
    route: '/donate',
    iconPath: 'M12 21s-7-4.6-7-10.2A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 7 3.8C19 16.4 12 21 12 21Zm-1-12H8v2h3v3h2v-3h3V9h-3V6h-2v3Z',
    ctaLabel: 'Support This Cause',
  },
  {
    title: 'Free Medical Camps',
    description: 'Organising free medical camps to make health and medical support accessible to needy people.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    route: '/donate',
    iconPath: 'M12 12a4 4 0 1 0-0.001-8.001A4 4 0 0 0 12 12Zm0 2c-3.3 0-6 2.2-6 5v1h12v-1c0-2.8-2.7-5-6-5Z',
    ctaLabel: 'Support This Cause',
  },
  {
    title: 'Support for Poor and Needy People',
    description: 'An effort to provide economic and social support to people and families according to their needs.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cdcb9902d4a3?auto=format&fit=crop&w=1200&q=80',
    route: '/donate',
    iconPath: 'M4 20h16M6 20V9l6-5 6 5v11M10 20v-6h4v6',
    ctaLabel: 'Support This Cause',
  },
  {
    title: 'Support for Needy Daughters’ Marriages',
    description: 'An effort to provide possible support for the marriages of daughters from families in need.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    route: '/donate',
    iconPath: 'M12 21s-7-4.6-7-10.2A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 7 3.8C19 16.4 12 21 12 21Z',
    ctaLabel: 'Support This Cause',
  },
];

export const trustees: Trustee[] = [
  {
    name: 'Reeta Devi',
    designation: 'Trustee',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  },
];
