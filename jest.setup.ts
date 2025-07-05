import '@testing-library/jest-dom'; // Extends Jest with custom matchers

// Check if we're in a Node environment (middleware tests)
const isNodeEnvironment = typeof window === 'undefined';

// Global cleanup function to ensure tests don't leak resources
afterEach(() => {
  // Clear all timers to prevent hanging
  jest.clearAllTimers();
  jest.useRealTimers();

  // Clear any pending promises or async operations
  if (typeof global.gc === 'function') {
    global.gc();
  }
});

// Global afterAll to ensure cleanup
afterAll(async () => {
  // Clear all timers and mocks
  jest.clearAllTimers();
  jest.clearAllMocks();
  jest.restoreAllMocks();

  // Allow some time for cleanup
  await new Promise(resolve => setTimeout(resolve, 100));
});

if (isNodeEnvironment) {
  // Import whatwg-fetch for Node environment to provide Web APIs
  require('whatwg-fetch');

  // Mock additional Node.js globals that Next.js middleware needs
  if (!global.crypto) {
    const crypto = require('crypto');
    global.crypto = {
      getRandomValues: (arr: any) => crypto.randomFillSync(arr),
      randomUUID: () => crypto.randomUUID(),
      subtle: {} as SubtleCrypto,
    };
  }

  if (!global.performance) {
    global.performance = {
      now: () => Date.now(),
    } as Performance;
  }

  if (!global.TextEncoder) {
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
  }
} else {
  // JSDOM environment setup for React component tests
  // These mocks are only needed in JSDOM environment
  const mockRequest = class {
    constructor(input: any, init?: any) {
      this.url = typeof input === 'string' ? input : input.url;
      this.method = init?.method || 'GET';
      this.headers = new Map(Object.entries(init?.headers || {}));
    }
    url: string;
    method: string;
    headers: Map<string, string>;
  };

  const mockResponse = class {
    constructor(body?: any, init?: any) {
      this.status = init?.status || 200;
      this.headers = new Map(Object.entries(init?.headers || {}));
    }
    status: number;
    headers: Map<string, string>;
  };

  const mockHeaders = class extends Map {
    constructor(init?: any) {
      super();
      if (init) {
        if (Array.isArray(init)) {
          init.forEach(([key, value]) => this.set(key, value));
        } else if (typeof init === 'object') {
          Object.entries(init).forEach(([key, value]) => this.set(key, value as string));
        }
      }
    }
  };

  // Make Web APIs available globally for JSDOM
  Object.assign(global, {
    Request: mockRequest,
    Response: mockResponse,
    Headers: mockHeaders,
  });
}

// Mock fetch globally for both environments
global.fetch = jest.fn();
