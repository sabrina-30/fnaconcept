export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const services: Service[] = [
  {
    id: 'maconnerie',
    name: 'Maçonnerie',
    description: 'Construction et rénovation de murs, cloisons, et structures porteuses.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop'  },
  {
    id: 'peinture',
    name: 'Peinture',
    description: 'Application de peinture intérieure et extérieure pour un rendu impeccable.',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop'  },
  {
    id: 'platrerie',
    name: 'Plâtrerie',
    description: 'Pose de plâtre, faux plafonds, et finitions murales soignées.',
    imageUrl: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?q=80&w=1000&auto=format&fit=crop'},
 {
    id: 'electricite',
    name: 'Électricité',
    description: 'Installation et mise aux normes de systèmes électriques sécurisés.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'plomberie',
    name: 'Plomberie',
    description: 'Travaux de plomberie, sanitaires, et systèmes de chauffage.',
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1000&auto=format&fit=crop'
  }
];
