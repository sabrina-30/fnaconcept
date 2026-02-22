import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

interface NavItem {
  label: string;
  targetId: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  mobileMenuOpen = false;

  navItems: NavItem[] = [
    { label: 'Accueil', targetId: 'hero' },
    { label: 'À propos', targetId: 'about' },
    { label: 'Nos Services', targetId: 'services' },
    { label: 'Réalisations', targetId: 'realizations' },
    { label: 'Contact', targetId: 'contact' }
  ];

  constructor(private scrollService: ScrollService) {}

  // Listen for Escape key to close mobile menu
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: Event): void {
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
      event.preventDefault();
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  navigateToSection(targetId: string): void {
    this.scrollService.scrollToSection(targetId);
    // Close mobile menu after navigation
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }
}
