import { isMobile } from './MobileDetect';

describe('isMobile Function Unit Tests', () => {
  let originalInnerWidth: number;

  beforeAll(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterAll(() => {
    window.innerWidth = originalInnerWidth;
  });

  test('Should return true when window width is <= 767', () => {
    window.innerWidth = 767;
    const result = isMobile();
    expect(result).toBe(true);
  });

  test('Should return false when window width is > 767', () => {
    window.innerWidth = 768;
    const result = isMobile();
    expect(result).toBe(false);
  });
});
