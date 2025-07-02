const { default: JSDOMEnvironment } = require('jest-environment-jsdom');
const { default: NodeEnvironment } = require('jest-environment-node');

class ConditionalEnvironment {
  constructor(config, context) {
    // Use node environment for middleware tests
    if (context.testPath.includes('middleware.test')) {
      return new NodeEnvironment(config, context);
    }
    // Use jsdom for all other tests (React components)
    return new JSDOMEnvironment(config, context);
  }
}

module.exports = ConditionalEnvironment;
