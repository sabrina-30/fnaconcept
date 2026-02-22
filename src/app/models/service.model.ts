export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'maconnerie',
    name: 'Maçonnerie',
    description: 'Construction et rénovation de murs, cloisons, et structures porteuses.',
    icon: 'icon-masonry'
  },
  {
    id: 'peinture',
    name: 'Peinture',
    description: 'Application de peinture intérieure et extérieure pour un rendu impeccable.',
    icon: 'icon-paint'
  },
  {
    id: 'platrerie',
    name: 'Plâtrerie',
    description: 'Pose de plâtre, faux plafonds, et finitions murales soignées.',
    icon: 'icon-plaster'
  },
  {
    id: 'electricite',
    name: 'Électricité',
    description: 'Installation et mise aux normes de systèmes électriques sécurisés.',
    icon: 'icon-electric'
  },
  {
    id: 'plomberie',
    name: 'Plomberie',
    description: 'Travaux de plomberie, sanitaires, et systèmes de chauffage.',
    icon: 'icon-plumbing'
  }
];
