import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesComponent } from './services.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { services } from '../../models/service.model';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent, ServiceCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display section title "Nos Services"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h2');
    expect(titleElement?.textContent).toContain('Nos Services');
  });

  it('should render five service cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const serviceCards = compiled.querySelectorAll('app-service-card');
    expect(serviceCards.length).toBe(5);
  });

  it('should have services data from model', () => {
    expect(component.services).toEqual(services);
    expect(component.services.length).toBe(5);
  });

  it('should have grid layout classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const gridElement = compiled.querySelector('.grid');
    expect(gridElement).toBeTruthy();
    expect(gridElement?.classList.contains('grid-cols-1')).toBe(true);
    expect(gridElement?.classList.contains('md:grid-cols-2')).toBe(true);
    expect(gridElement?.classList.contains('lg:grid-cols-3')).toBe(true);
  });

  it('should render all five services with correct names', () => {
    const expectedServices = ['Maçonnerie', 'Peinture', 'Plâtrerie', 'Électricité', 'Plomberie'];
    expect(component.services.map(s => s.name)).toEqual(expectedServices);
  });

  it('should have section id "services"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionElement = compiled.querySelector('section');
    expect(sectionElement?.id).toBe('services');
  });

  it('should apply section-container class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionElement = compiled.querySelector('section');
    expect(sectionElement?.classList.contains('section-container')).toBe(true);
  });
});
