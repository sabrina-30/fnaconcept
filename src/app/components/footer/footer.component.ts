import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = 2026;
  logoText = 'FNA Concept';
  tagline = 'FNA Concept - Votre partenaire rénovation de confiance.';
  copyright = `Copyright © ${this.currentYear} FNA Concept. Tous droits réservés.`;
}
