import { TestBed } from '@angular/core/testing';
import { ViewportScroller } from '@angular/common';
import { ScrollService } from './scroll.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ScrollService', () => {
  let service: ScrollService;
  let viewportScroller: ViewportScroller;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScrollService,
        {
          provide: ViewportScroller,
          useValue: {
            scrollToPosition: vi.fn()
          }
        }
      ]
    });
    service = TestBed.inject(ScrollService);
    viewportScroller = TestBed.inject(ViewportScroller);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('scrollToSection', () => {
    it('should call scrollIntoView with smooth behavior when element exists', () => {
      // Create a mock element
      const mockElement = document.createElement('div');
      mockElement.id = 'test-section';
      const scrollIntoViewSpy = vi.fn();
      mockElement.scrollIntoView = scrollIntoViewSpy;
      
      // Mock document.getElementById
      const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

      service.scrollToSection('test-section');

      expect(getElementByIdSpy).toHaveBeenCalledWith('test-section');
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });

      getElementByIdSpy.mockRestore();
    });

    it('should scroll to position [0, 0] when element does not exist', () => {
      // Mock document.getElementById to return null
      const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(null);

      service.scrollToSection('non-existent-section');

      expect(getElementByIdSpy).toHaveBeenCalledWith('non-existent-section');
      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);

      getElementByIdSpy.mockRestore();
    });

    it('should log warning when element does not exist', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(null);

      service.scrollToSection('missing-section');

      expect(consoleWarnSpy).toHaveBeenCalledWith('Section with id "missing-section" not found');

      consoleWarnSpy.mockRestore();
      getElementByIdSpy.mockRestore();
    });

    it('should handle empty string section ID', () => {
      const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(null);

      service.scrollToSection('');

      expect(getElementByIdSpy).toHaveBeenCalledWith('');
      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);

      getElementByIdSpy.mockRestore();
    });

    it('should handle special characters in section ID', () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'section-with-special-chars-123';
      const scrollIntoViewSpy = vi.fn();
      mockElement.scrollIntoView = scrollIntoViewSpy;
      
      const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

      service.scrollToSection('section-with-special-chars-123');

      expect(getElementByIdSpy).toHaveBeenCalledWith('section-with-special-chars-123');
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });

      getElementByIdSpy.mockRestore();
    });
  });

  describe('scrollToTop', () => {
    it('should call scrollToPosition with [0, 0]', () => {
      service.scrollToTop();

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
    });

    it('should call scrollToPosition exactly once', () => {
      service.scrollToTop();

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledTimes(1);
    });
  });

  describe('Smooth Scroll Behavior', () => {
    it('should always use smooth scroll behavior for valid sections', () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'hero';
      const scrollIntoViewSpy = vi.fn();
      mockElement.scrollIntoView = scrollIntoViewSpy;
      
      const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

      service.scrollToSection('hero');

      expect(scrollIntoViewSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: 'smooth'
        })
      );

      getElementByIdSpy.mockRestore();
    });

    it('should always use block start for valid sections', () => {
      const mockElement = document.createElement('div');
      mockElement.id = 'contact';
      const scrollIntoViewSpy = vi.fn();
      mockElement.scrollIntoView = scrollIntoViewSpy;
      
      const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

      service.scrollToSection('contact');

      expect(scrollIntoViewSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          block: 'start'
        })
      );

      getElementByIdSpy.mockRestore();
    });
  });
});
