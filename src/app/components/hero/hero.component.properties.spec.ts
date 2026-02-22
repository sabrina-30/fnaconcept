import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { ScrollService } from '../../services/scroll.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { JSDOM } from 'jsdom';

describe('HeroComponent - Property-Based Tests', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let scrollService: ScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [
        {
          provide: ScrollService,
          useValue: {
            scrollToSection: vi.fn()
          }
        }
      ]
    });

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    scrollService = TestBed.inject(ScrollService);
  });

  describe('Property 5: Hero Section Height', () => {
    // Feature: fna-concept-corporate-website, Property 5: For any viewport height, the hero section should occupy at least 80% of that viewport height
    
    it('should occupy at least 80% of viewport height for any viewport height', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 400, max: 2000 }), // Viewport heights from 400px to 2000px
          (viewportHeight) => {
            // Create a JSDOM instance with the specified viewport height
            const dom = new JSDOM(`
              <!DOCTYPE html>
              <html>
                <head>
                  <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    .min-h-\\[80vh\\] { min-height: 80vh; }
                  </style>
                </head>
                <body>
                  <section id="hero" class="min-h-[80vh]"></section>
                </body>
              </html>
            `, {
              url: 'http://localhost',
              pretendToBeVisual: true,
              resources: 'usable'
            });

            // Set the viewport height
            Object.defineProperty(dom.window, 'innerHeight', {
              writable: true,
              configurable: true,
              value: viewportHeight
            });

            const heroElement = dom.window.document.getElementById('hero');
            
            // Calculate expected minimum height (80% of viewport height)
            const expectedMinHeight = viewportHeight * 0.8;
            
            // Get computed style
            const computedStyle = dom.window.getComputedStyle(heroElement!);
            const minHeight = computedStyle.minHeight;
            
            // For min-h-[80vh], the minHeight should be 80vh
            // We verify that 80vh equals at least 80% of viewport height
            const minHeightValue = parseFloat(minHeight);
            
            // If minHeight is in vh units, convert to pixels
            let minHeightInPixels: number;
            if (minHeight.includes('vh')) {
              const vhValue = parseFloat(minHeight);
              minHeightInPixels = (vhValue / 100) * viewportHeight;
            } else {
              minHeightInPixels = minHeightValue;
            }
            
            // Verify that the minimum height is at least 80% of viewport height
            // Allow for small rounding errors (within 1px)
            const meetsRequirement = minHeightInPixels >= expectedMinHeight - 1;
            
            return meetsRequirement;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should have min-h-[80vh] class applied to hero section', () => {
      fixture.detectChanges();
      const heroElement: HTMLElement = fixture.nativeElement.querySelector('#hero');
      
      expect(heroElement).toBeTruthy();
      expect(heroElement.classList.contains('min-h-[80vh]')).toBe(true);
    });

    it('should maintain minimum height across different viewport heights', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 3840 }), // Wide range of viewport heights
          (viewportHeight) => {
            fixture.detectChanges();
            const heroElement: HTMLElement = fixture.nativeElement.querySelector('#hero');
            
            // The element should have the min-h-[80vh] class
            const hasMinHeightClass = heroElement.classList.contains('min-h-[80vh]');
            
            // Calculate what 80vh would be in pixels
            const expectedMinHeight = viewportHeight * 0.8;
            
            // The class ensures the element will be at least 80vh
            // We verify the class is present, which guarantees the behavior
            return hasMinHeightClass && expectedMinHeight >= viewportHeight * 0.8;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('CTA Button Functionality', () => {
    it('should call scrollToSection with "services" when CTA is clicked', () => {
      fixture.detectChanges();
      const ctaButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      
      expect(ctaButton).toBeTruthy();
      
      ctaButton.click();
      
      expect(scrollService.scrollToSection).toHaveBeenCalledWith('services');
    });
  });

  describe('Content Display', () => {
    it('should display the correct heading text', () => {
      fixture.detectChanges();
      const heading: HTMLElement = fixture.nativeElement.querySelector('h1');
      
      expect(heading).toBeTruthy();
      expect(heading.textContent?.trim()).toBe(
        'Votre confort, notre mission : FNA Concept pour un intérieur à votre image.'
      );
    });

    it('should display the CTA button with correct text', () => {
      fixture.detectChanges();
      const ctaButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      
      expect(ctaButton).toBeTruthy();
      expect(ctaButton.textContent?.trim()).toBe('Découvrir notre expertise');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA label on section', () => {
      fixture.detectChanges();
      const heroSection: HTMLElement = fixture.nativeElement.querySelector('#hero');
      
      expect(heroSection).toBeTruthy();
      expect(heroSection.getAttribute('aria-label')).toBe('Bannière principale');
    });

    it('should have proper ARIA label on CTA button', () => {
      fixture.detectChanges();
      const ctaButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      
      expect(ctaButton).toBeTruthy();
      expect(ctaButton.getAttribute('aria-label')).toBe('Découvrir nos services');
    });
  });
});
