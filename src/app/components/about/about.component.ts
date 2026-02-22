import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  sectionTitle = "L'excellence de la rénovation en Île-de-France";
  
  companyDescription = `FNA Concept est votre partenaire de confiance pour tous vos projets de rénovation intérieure en Île-de-France. 
    Forte d'une expertise reconnue en maçonnerie, peinture, plâtrerie, électricité et plomberie, notre équipe s'engage à transformer 
    vos espaces de vie avec professionnalisme et créativité. Nous plaçons votre satisfaction au cœur de nos priorités, en vous offrant 
    un accompagnement personnalisé de la conception à la réalisation. Chaque projet est unique, et nous mettons tout en œuvre pour 
    respecter vos attentes, vos délais et votre budget. Faites confiance à FNA Concept pour donner vie à vos idées et créer un 
    intérieur qui vous ressemble.`;
  
  imageAlt = "Intérieur rénové par FNA Concept - Exemple de nos réalisations en Île-de-France";
}
