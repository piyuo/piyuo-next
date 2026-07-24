import '@testing-library/jest-dom'; // Extends Jest with custom matchers

// Check if we're in a Node environment (proxy tests)
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

  // Mock additional Node.js globals that Next.js proxy needs
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
    private _url: string;
    method: string;
    headers: Map<string, string>;

    constructor(input: any, init?: any) {
      this._url = typeof input === 'string' ? input : input.url;
      this.method = init?.method || 'GET';
      this.headers = new Map(Object.entries(init?.headers || {}));

      // Define url as a getter to match NextRequest behavior
      Object.defineProperty(this, 'url', {
        get() {
          return this._url;
        },
        enumerable: true,
        configurable: true
      });
    }
  };

  const mockResponse = class {
    body: any;
    status: number;
    headers: Map<string, string>;

    constructor(body?: any, init?: any) {
      this.body = body;
      this.status = init?.status || 200;
      this.headers = new Map(Object.entries(init?.headers || {}));
    }

    async json() {
      if (typeof this.body === 'string') {
        return JSON.parse(this.body);
      }
      return this.body;
    }

    static json(data: any, init?: ResponseInit) {
      return new mockResponse(data, init);
    }
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

    // Override to handle case-insensitive header names
    set(key: string, value: string): this {
      return super.set(key.toLowerCase(), value);
    }

    get(key: string): string | undefined {
      return super.get(key.toLowerCase());
    }

    has(key: string): boolean {
      return super.has(key.toLowerCase());
    }

    delete(key: string): boolean {
      return super.delete(key.toLowerCase());
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
