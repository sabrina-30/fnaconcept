import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { ScrollService } from '../../services/scroll.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('HeroComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template Structure', () => {
    it('should render hero section with correct ID', () => {
      fixture.detectChanges();
      const heroSection: HTMLElement = fixture.nativeElement.querySelector('#hero');
      
      expect(heroSection).toBeTruthy();
    });

    it('should have dark overlay div', () => {
      fixture.detectChanges();
      const overlay: HTMLElement = fixture.nativeElement.querySelector('.bg-black.bg-opacity-50');
      
      expect(overlay).toBeTruthy();
    });

    it('should have content container with proper z-index', () => {
      fixture.detectChanges();
      const contentContainer: HTMLElement = fixture.nativeElement.querySelector('.z-10');
      
      expect(contentContainer).toBeTruthy();
    });
  });

  describe('Content', () => {
    it('should display the main heading', () => {
      fixture.detectChanges();
      const heading: HTMLElement = fixture.nativeElement.querySelector('h1');
      
      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain('Votre confort, notre mission');
    });

    it('should display the complete heading text', () => {
      fixture.detectChanges();
      const heading: HTMLElement = fixture.nativeElement.querySelector('h1');
      
      expect(heading.textContent?.trim()).toBe(
        'Votre confort, notre mission : FNA Concept pour un intérieur à votre image.'
      );
    });

    it('should display CTA button', () => {
      fixture.detectChanges();
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      
      expect(button).toBeTruthy();
      expect(button.textContent?.trim()).toBe('Découvrir notre expertise');
    });
  });

  describe('CTA Button Interaction', () => {
    it('should call onCtaClick when button is clicked', () => {
      const onCtaClickSpy = vi.spyOn(component, 'onCtaClick');
      fixture.detectChanges();
      
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      button.click();
      
      expect(onCtaClickSpy).toHaveBeenCalled();
    });

    it('should call scrollService.scrollToSection with "services"', () => {
      fixture.detectChanges();
      
      component.onCtaClick();
      
      expect(scrollService.scrollToSection).toHaveBeenCalledWith('services');
    });

    it('should scroll to services section when CTA button is clicked', () => {
      fixture.detectChanges();
      
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      button.click();
      
      expect(scrollService.scrollToSection).toHaveBeenCalledWith('services');
    });
  });

  describe('Styling', () => {
    it('should have min-h-[80vh] class on hero section', () => {
      fixture.detectChanges();
      const heroSection: HTMLElement = fixture.nativeElement.querySelector('#hero');
      
      expect(heroSection.classList.contains('min-h-[80vh]')).toBe(true);
    });

    it('should have background image styling', () => {
      fixture.detectChanges();
      const heroSection: HTMLElement = fixture.nativeElement.querySelector('#hero');
      
      expect(heroSection.classList.contains('bg-cover')).toBe(true);
      expect(heroSection.classList.contains('bg-center')).toBe(true);
    });

    it('should have btn-primary class on CTA button', () => {
      fixture.detectChanges();
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      
      expect(button.classList.contains('btn-primary')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on hero section', () => {
      fixture.detectChanges();
      const heroSection: HTMLElement = fixture.nativeElement.querySelector('#hero');
      
      expect(heroSection.getAttribute('aria-label')).toBe('Bannière principale');
    });

    it('should have aria-label on CTA button', () => {
      fixture.detectChanges();
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      
      expect(button.getAttribute('aria-label')).toBe('Découvrir nos services');
    });

    it('should have semantic heading element', () => {
      fixture.detectChanges();
      const heading = fixture.nativeElement.querySelector('h1');
      
      expect(heading).toBeTruthy();
      expect(heading.tagName).toBe('H1');
    });
  });
});
