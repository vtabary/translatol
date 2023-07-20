import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
import 'jest-preset-angular/setup-jest';
import '@angular/localize/init';
