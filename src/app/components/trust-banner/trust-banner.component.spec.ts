import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrustBannerComponent } from './trust-banner.component';
import { trustPoints } from '../../models/trust-point.model';

describe('TrustBannerComponent', () => {
  let component: TrustBannerComponent;
  let fixture: ComponentFixture<TrustBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustBannerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TrustBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display section title "Pourquoi nous choisir ?"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h2');
    expect(title?.textContent).toContain('Pourquoi nous choisir ?');
  });

  it('should display all three trust points', () => {
    expect(component.trustPoints.length).toBe(3);
    const compiled = fixture.nativeElement as HTMLElement;
    const trustPointElements = compiled.querySelectorAll('.flex.flex-col.items-center.text-center');
    expect(trustPointElements.length).toBe(3);
  });

  it('should display trust point titles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = compiled.querySelectorAll('h3');
    expect(titles.length).toBe(3);
    expect(titles[0].textContent).toContain('Devis gratuit et transparent');
    expect(titles[1].textContent).toContain('Respect rigoureux des délais');
    expect(titles[2].textContent).toContain('Accompagnement personnalisé');
  });

  it('should display trust point descriptions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const descriptions = compiled.querySelectorAll('p');
    expect(descriptions.length).toBe(3);
    expect(descriptions[0].textContent).toContain('Estimation détaillée sans engagement');
    expect(descriptions[1].textContent).toContain('Planification précise et tenue des engagements');
    expect(descriptions[2].textContent).toContain('Suivi de projet de A à Z');
  });

  it('should display icons for each trust point', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('.w-16.h-16.bg-fna-warm');
    expect(icons.length).toBe(3);
  });

  it('should have responsive layout classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.flex');
    expect(container?.classList.contains('flex-col')).toBe(true);
    expect(container?.classList.contains('md:flex-row')).toBe(true);
  });
});
