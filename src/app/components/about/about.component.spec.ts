import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AboutComponent]
    });

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have section title property', () => {
    expect(component.sectionTitle).toBe("L'excellence de la rénovation en Île-de-France");
  });

  it('should have company description property', () => {
    expect(component.companyDescription).toBeTruthy();
    expect(component.companyDescription).toContain('FNA Concept');
  });

  it('should have image alt text property', () => {
    expect(component.imageAlt).toBeTruthy();
    expect(component.imageAlt.length).toBeGreaterThan(0);
  });

  it('should render section with correct id', () => {
    fixture.detectChanges();
    const section: HTMLElement = fixture.nativeElement.querySelector('#about');
    expect(section).toBeTruthy();
  });

  it('should render section title', () => {
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector('#about-title');
    expect(title).toBeTruthy();
    expect(title.textContent?.trim()).toBe(component.sectionTitle);
  });

  it('should render company description', () => {
    fixture.detectChanges();
    const description: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(description).toBeTruthy();
    expect(description.textContent?.trim()).toBe(component.companyDescription);
  });

  it('should render image with correct attributes', () => {
    fixture.detectChanges();
    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(image).toBeTruthy();
    expect(image.src).toContain('about-image.jpg');
    expect(image.alt).toBe(component.imageAlt);
    expect(image.getAttribute('loading')).toBe('lazy');
  });

  it('should have responsive grid layout classes', () => {
    fixture.detectChanges();
    const grid: HTMLElement = fixture.nativeElement.querySelector('.grid');
    expect(grid).toBeTruthy();
    expect(grid.classList.contains('grid-cols-1')).toBe(true);
    expect(grid.classList.contains('md:grid-cols-2')).toBe(true);
  });

  it('should have section-container class', () => {
    fixture.detectChanges();
    const section: HTMLElement = fixture.nativeElement.querySelector('#about');
    expect(section.classList.contains('section-container')).toBe(true);
  });

  it('should have section-title class on heading', () => {
    fixture.detectChanges();
    const title: HTMLElement = fixture.nativeElement.querySelector('#about-title');
    expect(title.classList.contains('section-title')).toBe(true);
  });
});
