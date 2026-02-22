export interface TrustPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const trustPoints: TrustPoint[] = [
  {
    id: 'devis-gratuit',
    title: 'Devis gratuit et transparent',
    description: 'Estimation détaillée sans engagement',
    icon: 'https://raw.githubusercontent.com/tailwindlabs/heroicons/master/optimized/24/outline/document-text.svg'
  },
  {
    id: 'respect-delais',
    title: 'Respect rigoureux des délais',
    description: 'Planification précise et tenue des engagements',
    icon: 'https://raw.githubusercontent.com/tailwindlabs/heroicons/master/optimized/24/outline/clock.svg'
  },
  {
    id: 'accompagnement',
    title: 'Accompagnement personnalisé',
    description: 'Suivi de projet de A à Z',
    icon: 'https://raw.githubusercontent.com/tailwindlabs/heroicons/master/optimized/24/outline/users.svg'
  }
];
