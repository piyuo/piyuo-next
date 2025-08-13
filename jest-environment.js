const { default: JSDOMEnvironment } = require('jest-environment-jsdom');
const { default: NodeEnvironment } = require('jest-environment-node');

class ConditionalEnvironment {
  constructor(config, context) {
    // Use node environment for middleware tests
    if (context.testPath.includes('middleware.test')) {
      return new NodeEnvironment(config, context);
    }
    // Use jsdom for all other tests (React components)
    const jsdomEnv = new JSDOMEnvironment(config, context);

    // Suppress "Not implemented: navigation" console errors
    if (jsdomEnv.global && jsdomEnv.global.window) {
      const originalConsoleError = jsdomEnv.global.console.error;
      jsdomEnv.global.console.error = function(...args) {
        // Suppress JSDOM navigation errors
        if (args[0] && args[0].message && args[0].message.includes('Not implemented: navigation')) {
          return;
        }
        if (typeof args[0] === 'string' && args[0].includes('Not implemented: navigation')) {
          return;
        }
        // Call original console.error for all other errors
        originalConsoleError.apply(this, args);
      };
    }

    return jsdomEnv;
  }
}

module.exports = ConditionalEnvironment;
