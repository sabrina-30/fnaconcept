import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { ScrollService } from '../../services/scroll.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let scrollService: { scrollToSection: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    scrollService = {
      scrollToSection: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        { provide: ScrollService, useValue: scrollService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mobileMenuOpen initially false', () => {
    expect(component.mobileMenuOpen).toBe(false);
  });

  it('should have five navigation items', () => {
    expect(component.navItems.length).toBe(5);
  });

  it('should have correct navigation items', () => {
    const expectedItems = [
      { label: 'Accueil', targetId: 'hero' },
      { label: 'À propos', targetId: 'about' },
      { label: 'Nos Services', targetId: 'services' },
      { label: 'Réalisations', targetId: 'realizations' },
      { label: 'Contact', targetId: 'contact' }
    ];
    expect(component.navItems).toEqual(expectedItems);
  });

  describe('toggleMobileMenu', () => {
    it('should toggle mobileMenuOpen from false to true', () => {
      component.mobileMenuOpen = false;
      component.toggleMobileMenu();
      expect(component.mobileMenuOpen).toBe(true);
    });

    it('should toggle mobileMenuOpen from true to false', () => {
      component.mobileMenuOpen = true;
      component.toggleMobileMenu();
      expect(component.mobileMenuOpen).toBe(false);
    });
  });

  describe('navigateToSection', () => {
    it('should call scrollService.scrollToSection with correct targetId', () => {
      component.navigateToSection('about');
      expect(scrollService.scrollToSection).toHaveBeenCalledWith('about');
    });

    it('should close mobile menu after navigation when menu is open', () => {
      component.mobileMenuOpen = true;
      component.navigateToSection('services');
      expect(component.mobileMenuOpen).toBe(false);
    });

    it('should keep mobile menu closed when navigating with menu already closed', () => {
      component.mobileMenuOpen = false;
      component.navigateToSection('contact');
      expect(component.mobileMenuOpen).toBe(false);
    });
  });

  describe('Template rendering', () => {
    it('should display logo text "FNA Concept"', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logo = compiled.querySelector('.text-2xl');
      expect(logo?.textContent?.trim()).toBe('FNA Concept');
    });

    it('should render all navigation items in desktop menu', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const desktopNavButtons = compiled.querySelectorAll('.hidden.md\\:flex button');
      expect(desktopNavButtons.length).toBe(5);
    });

    it('should display CTA button with text "Demander un devis"', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const ctaButton = compiled.querySelector('.btn-primary');
      expect(ctaButton?.textContent?.trim()).toBe('Demander un devis');
    });

    it('should show hamburger icon when mobile menu is closed', () => {
      component.mobileMenuOpen = false;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const hamburgerIcon = compiled.querySelector('svg path[d*="M4 6h16M4 12h16M4 18h16"]');
      expect(hamburgerIcon).toBeTruthy();
    });

    it('should show close icon when mobile menu is open', async () => {
      // Create a fresh fixture with the menu already open
      const testFixture = TestBed.createComponent(NavigationComponent);
      const testComponent = testFixture.componentInstance;
      testComponent.mobileMenuOpen = true;
      testFixture.detectChanges();
      
      const compiled = testFixture.nativeElement as HTMLElement;
      const closeIcon = compiled.querySelector('svg path[d*="M6 18L18 6M6 6l12 12"]');
      expect(closeIcon).toBeTruthy();
    });

    it('should display mobile menu panel when mobileMenuOpen is true', async () => {
      // Create a fresh fixture with the menu already open
      const testFixture = TestBed.createComponent(NavigationComponent);
      const testComponent = testFixture.componentInstance;
      testComponent.mobileMenuOpen = true;
      testFixture.detectChanges();
      
      const compiled = testFixture.nativeElement as HTMLElement;
      const mobilePanel = compiled.querySelector('.md\\:hidden.bg-white');
      expect(mobilePanel).toBeTruthy();
    });

    it('should not display mobile menu panel when mobileMenuOpen is false', () => {
      component.mobileMenuOpen = false;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const mobilePanel = compiled.querySelector('.md\\:hidden.bg-white');
      expect(mobilePanel).toBeFalsy();
    });

    it('should have sticky positioning class', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nav = compiled.querySelector('nav');
      expect(nav?.classList.contains('sticky')).toBe(true);
      expect(nav?.classList.contains('top-0')).toBe(true);
    });

    it('should have high z-index for staying on top', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nav = compiled.querySelector('nav');
      expect(nav?.classList.contains('z-50')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on mobile menu button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mobileMenuButton = compiled.querySelector('.md\\:hidden button');
      expect(mobileMenuButton?.getAttribute('aria-label')).toBe('Ouvrir le menu');
    });

    it('should update aria-label when mobile menu is open', async () => {
      // Create a fresh fixture with the menu already open
      const testFixture = TestBed.createComponent(NavigationComponent);
      const testComponent = testFixture.componentInstance;
      testComponent.mobileMenuOpen = true;
      testFixture.detectChanges();
      
      const compiled = testFixture.nativeElement as HTMLElement;
      const mobileMenuButton = compiled.querySelector('.md\\:hidden button');
      expect(mobileMenuButton?.getAttribute('aria-label')).toBe('Fermer le menu');
    });

    it('should have aria-expanded attribute on mobile menu button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const mobileMenuButton = compiled.querySelector('.md\\:hidden button');
      expect(mobileMenuButton?.getAttribute('aria-expanded')).toBe('false');
    });

    it('should update aria-expanded when mobile menu is open', async () => {
      // Create a fresh fixture with the menu already open
      const testFixture = TestBed.createComponent(NavigationComponent);
      const testComponent = testFixture.componentInstance;
      testComponent.mobileMenuOpen = true;
      testFixture.detectChanges();
      
      const compiled = testFixture.nativeElement as HTMLElement;
      const mobileMenuButton = compiled.querySelector('.md\\:hidden button');
      expect(mobileMenuButton?.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Integration with ScrollService', () => {
    it('should navigate to hero section when logo is clicked', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logo = compiled.querySelector('.text-2xl') as HTMLButtonElement;
      logo.click();
      expect(scrollService.scrollToSection).toHaveBeenCalledWith('hero');
    });

    it('should navigate to contact section when CTA button is clicked', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const ctaButton = compiled.querySelector('.btn-primary') as HTMLButtonElement;
      ctaButton.click();
      expect(scrollService.scrollToSection).toHaveBeenCalledWith('contact');
    });
  });
});

// Property-Based Tests
import * as fc from 'fast-check';

describe('Property 2: Navigation Sticky Positioning', () => {
  // Feature: fna-concept-corporate-website, Property 2: For any scroll position on the page, the navigation bar should remain visible and fixed at the top of the viewport.
  
  it('should remain visible and fixed at the top for any scroll position', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000 }), // Random scroll positions from 0 to 10000px
        (scrollPosition) => {
          // Create a fresh fixture for each test iteration
          const testFixture = TestBed.createComponent(NavigationComponent);
          testFixture.detectChanges();
          
          const compiled = testFixture.nativeElement as HTMLElement;
          const nav = compiled.querySelector('nav');
          
          // Verify navigation element exists
          expect(nav).toBeTruthy();
          
          // Verify sticky positioning class is present
          const hasSticky = nav?.classList.contains('sticky');
          expect(hasSticky).toBe(true);
          
          // Verify top-0 class is present (fixed at top)
          const hasTopZero = nav?.classList.contains('top-0');
          expect(hasTopZero).toBe(true);
          
          // Verify high z-index for staying on top of other content
          const hasHighZIndex = nav?.classList.contains('z-50');
          expect(hasHighZIndex).toBe(true);
          
          // Simulate scroll by setting window.scrollY
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: scrollPosition
          });
          
          // Trigger change detection after scroll
          testFixture.detectChanges();
          
          // Verify navigation is still present and has sticky classes after scroll
          const navAfterScroll = compiled.querySelector('nav');
          expect(navAfterScroll).toBeTruthy();
          expect(navAfterScroll?.classList.contains('sticky')).toBe(true);
          expect(navAfterScroll?.classList.contains('top-0')).toBe(true);
          expect(navAfterScroll?.classList.contains('z-50')).toBe(true);
          
          // Verify the navigation element is in the DOM (visible)
          expect(navAfterScroll?.isConnected).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain sticky positioning with different viewport heights', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 5000 }), // Random scroll position
        fc.integer({ min: 400, max: 2000 }), // Random viewport height
        (scrollPosition, viewportHeight) => {
          // Create a fresh fixture for each test iteration
          const testFixture = TestBed.createComponent(NavigationComponent);
          testFixture.detectChanges();
          
          const compiled = testFixture.nativeElement as HTMLElement;
          
          // Simulate viewport height
          Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: viewportHeight
          });
          
          // Simulate scroll position
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: scrollPosition
          });
          
          testFixture.detectChanges();
          
          const nav = compiled.querySelector('nav');
          
          // Verify navigation has sticky positioning regardless of viewport height and scroll position
          expect(nav).toBeTruthy();
          expect(nav?.classList.contains('sticky')).toBe(true);
          expect(nav?.classList.contains('top-0')).toBe(true);
          expect(nav?.classList.contains('z-50')).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should remain at the top of the viewport with consistent positioning', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000 }), // Random scroll position
        (scrollPosition) => {
          // Create a fresh fixture
          const testFixture = TestBed.createComponent(NavigationComponent);
          testFixture.detectChanges();
          
          const compiled = testFixture.nativeElement as HTMLElement;
          const nav = compiled.querySelector('nav');
          
          // Verify the nav element has the correct positioning classes
          // sticky + top-0 ensures it stays at the top of the viewport
          const hasCorrectPositioning = 
            nav?.classList.contains('sticky') && 
            nav?.classList.contains('top-0');
          
          expect(hasCorrectPositioning).toBe(true);
          
          // The z-50 class ensures it stays above other content
          expect(nav?.classList.contains('z-50')).toBe(true);
          
          // Verify the navigation is always present in the DOM
          expect(nav?.isConnected).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Property 4: Mobile Navigation Display', () => {
  // Feature: fna-concept-corporate-website, Property 4: For any mobile viewport width (<768px), the navigation bar should display a hamburger menu icon instead of full navigation links.
  // **Validates: Requirements 2.7**
  
  it('should display hamburger menu icon instead of full navigation links for any mobile viewport width', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }), // Mobile viewport widths from 320px to 767px
        (viewportWidth) => {
          // Create a fresh fixture for each test iteration
          const testFixture = TestBed.createComponent(NavigationComponent);
          testFixture.detectChanges();
          
          const compiled = testFixture.nativeElement as HTMLElement;
          
          // Simulate mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth
          });
          
          // Trigger change detection
          testFixture.detectChanges();
          
          // Verify hamburger menu button exists (visible on mobile)
          const mobileMenuButton = compiled.querySelector('.md\\:hidden button');
          expect(mobileMenuButton).toBeTruthy();
          
          // Verify hamburger icon is present (when menu is closed)
          const hamburgerIcon = compiled.querySelector('.md\\:hidden svg path[d*="M4 6h16M4 12h16M4 18h16"]');
          expect(hamburgerIcon).toBeTruthy();
          
          // Verify desktop navigation is hidden (has md:flex class which means hidden on mobile)
          const desktopNav = compiled.querySelector('.hidden.md\\:flex');
          expect(desktopNav).toBeTruthy();
          
          // Verify desktop CTA button is hidden (has md:block class which means hidden on mobile)
          const desktopCTA = compiled.querySelector('.hidden.md\\:block');
          expect(desktopCTA).toBeTruthy();
          
          // The desktop navigation should have the 'hidden' class which hides it on mobile
          expect(desktopNav?.classList.contains('hidden')).toBe(true);
          expect(desktopCTA?.classList.contains('hidden')).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should show mobile menu panel when hamburger is clicked on mobile viewport', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }), // Mobile viewport widths
        (viewportWidth) => {
          // Create a fresh fixture
          const testFixture = TestBed.createComponent(NavigationComponent);
          const testComponent = testFixture.componentInstance;
          testFixture.detectChanges();
          
          const compiled = testFixture.nativeElement as HTMLElement;
          
          // Simulate mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth
          });
          
          testFixture.detectChanges();
          
          // Initially, mobile menu should be closed
          expect(testComponent.mobileMenuOpen).toBe(false);
          
          // Mobile menu panel should not be visible
          let mobilePanel = compiled.querySelector('.md\\:hidden.bg-white');
          expect(mobilePanel).toBeFalsy();
          
          // Click the hamburger button to open mobile menu
          const mobileMenuButton = compiled.querySelector('.md\\:hidden button') as HTMLButtonElement;
          expect(mobileMenuButton).toBeTruthy();
          mobileMenuButton.click();
          testFixture.detectChanges();
          
          // Mobile menu should now be open
          expect(testComponent.mobileMenuOpen).toBe(true);
          
          // Mobile menu panel should be visible
          mobilePanel = compiled.querySelector('.md\\:hidden.bg-white');
          expect(mobilePanel).toBeTruthy();
          
          // Verify close icon is now shown instead of hamburger
          const closeIcon = compiled.querySelector('.md\\:hidden svg path[d*="M6 18L18 6M6 6l12 12"]');
          expect(closeIcon).toBeTruthy();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should not display desktop navigation links on mobile viewport', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }), // Mobile viewport widths
        (viewportWidth) => {
          // Create a fresh fixture
          const testFixture = TestBed.createComponent(NavigationComponent);
          testFixture.detectChanges();
          
          const compiled = testFixture.nativeElement as HTMLElement;
          
          // Simulate mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth
          });
          
          testFixture.detectChanges();
          
          // Desktop navigation should have 'hidden' class (hidden on mobile, visible on md and up)
          const desktopNav = compiled.querySelector('.hidden.md\\:flex');
          expect(desktopNav).toBeTruthy();
          expect(desktopNav?.classList.contains('hidden')).toBe(true);
          
          // Desktop CTA button should have 'hidden' class
          const desktopCTA = compiled.querySelector('.hidden.md\\:block');
          expect(desktopCTA).toBeTruthy();
          expect(desktopCTA?.classList.contains('hidden')).toBe(true);
          
          // Mobile menu button should be visible (has md:hidden class which means visible on mobile)
          const mobileMenuButton = compiled.querySelector('.md\\:hidden button');
          expect(mobileMenuButton).toBeTruthy();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain hamburger menu icon across different mobile viewport widths', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }), // Mobile viewport widths
        fc.boolean(), // Random menu state (open or closed)
        (viewportWidth, shouldOpenMenu) => {
          // Create a fresh fixture
          const testFixture = TestBed.createComponent(NavigationComponent);
          const testComponent = testFixture.componentInstance;
          
          // Set menu state BEFORE initial change detection
          if (shouldOpenMenu) {
            testComponent.mobileMenuOpen = true;
          }
          
          // Now run initial change detection
          testFixture.detectChanges();
          
          const compiled = testFixture.nativeElement as HTMLElement;
          
          // Simulate mobile viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth
          });
          
          // Mobile menu button should always be present on mobile
          const mobileMenuButton = compiled.querySelector('.md\\:hidden button');
          expect(mobileMenuButton).toBeTruthy();
          
          // Verify correct icon is shown based on menu state
          if (shouldOpenMenu) {
            // Close icon should be shown
            const closeIcon = compiled.querySelector('.md\\:hidden svg path[d*="M6 18L18 6M6 6l12 12"]');
            expect(closeIcon).toBeTruthy();
          } else {
            // Hamburger icon should be shown
            const hamburgerIcon = compiled.querySelector('.md\\:hidden svg path[d*="M4 6h16M4 12h16M4 18h16"]');
            expect(hamburgerIcon).toBeTruthy();
          }
          
          // Desktop navigation should always be hidden on mobile
          const desktopNav = compiled.querySelector('.hidden.md\\:flex');
          expect(desktopNav?.classList.contains('hidden')).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
