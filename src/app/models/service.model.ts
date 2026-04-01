export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const services: Service[] = [
  {
    id: 'maconnerie',
    name: 'Pose de sol',
    description: 'Carrelage, parquet, lino et sol PVC.',
    imageUrl: 'sol.jpg'  },
  {
    id: 'peinture',
    name: 'Peinture',
    description: 'Application de peinture intérieure et extérieure pour un rendu impeccable.',
    imageUrl: '/peinture.jpg'  },
  {
    id: 'platrerie',
    name: 'Plâtrerie',
    description: 'Pose de plâtre, faux plafonds, et finitions murales soignées.',
    imageUrl: 'platerie2.jpg'},
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
  },
  {
    id: 'menuiserie',
    name: 'Menuiserie',
    description: 'Pose de cuisine et placard et solution sur mesure.',
    imageUrl: '/menuiserie2.jpg'
  }
];
