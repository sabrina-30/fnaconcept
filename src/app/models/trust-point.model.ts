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
    icon: 'icon-document'
  },
  {
    id: 'respect-delais',
    title: 'Respect rigoureux des délais',
    description: 'Planification précise et tenue des engagements',
    icon: 'icon-clock'
  },
  {
    id: 'accompagnement',
    title: 'Accompagnement personnalisé',
    description: 'Suivi de projet de A à Z',
    icon: 'icon-support'
  }
];
