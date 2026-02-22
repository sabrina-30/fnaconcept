import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCardComponent } from './service-card.component';
import { Service } from '../../../models/service.model';

describe('ServiceCardComponent', () => {
  let component: ServiceCardComponent;
  let fixture: ComponentFixture<ServiceCardComponent>;

  const mockService: Service = {
    id: 'test-service',
    name: 'Test Service',
    description: 'This is a test service description.',
    icon: 'test-icon'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCardComponent);
    component = fixture.componentInstance;
    component.service = mockService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display service name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nameElement = compiled.querySelector('h3');
    expect(nameElement?.textContent).toContain('Test Service');
  });

  it('should display service description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const descriptionElement = compiled.querySelector('p');
    expect(descriptionElement?.textContent).toContain('This is a test service description.');
  });

  it('should display service icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const iconElement = compiled.querySelector('.text-fna-warm');
    expect(iconElement?.textContent).toContain('test-icon');
  });

  it('should have card styling classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardElement = compiled.querySelector('.bg-white.rounded-lg.shadow-md');
    expect(cardElement).toBeTruthy();
  });

  it('should display complete description without truncation', async () => {
    const longDescription = 'This is a very long description that should be displayed completely without any truncation to ensure all information is visible to the user.';
    
    // Create a new fixture with the long description
    const newFixture = TestBed.createComponent(ServiceCardComponent);
    const newComponent = newFixture.componentInstance;
    newComponent.service = {
      ...mockService,
      description: longDescription
    };
    newFixture.detectChanges();

    const compiled = newFixture.nativeElement as HTMLElement;
    const descriptionElement = compiled.querySelector('p');
    expect(descriptionElement?.textContent).toBe(longDescription);
  });
});
