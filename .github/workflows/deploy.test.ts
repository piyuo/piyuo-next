// ===============================================
// Test Suite: deploy.test.ts
// Description: Unit tests for GitHub Actions deploy workflow configuration
//
// Test Groups:
//   - Setup and Configuration Tests
//   - Build Process Tests
//   - Deployment Command Tests
//   - Environment Variable Tests
// ===============================================

import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { parse } from 'yaml';

describe('GitHub Actions Deploy Workflow', () => {
  const workflowPath = path.join(__dirname, 'deploy.yml');
  let deployWorkflow: any;

  beforeAll(() => {
    // Load and parse the deploy.yml workflow file
    if (!existsSync(workflowPath)) {
      throw new Error(`Deploy workflow file not found at: ${workflowPath}`);
    }

    const workflowContent = readFileSync(workflowPath, 'utf8');
    deployWorkflow = parse(workflowContent);
  });

  describe('Workflow Configuration', () => {
    test('should have correct workflow name', () => {
      expect(deployWorkflow.name).toBe('Deploy to Cloudflare Workers');
    });

    test('should trigger on push to main branch', () => {
      expect(deployWorkflow.on.push.branches).toContain('main');
    });

    test('should support manual workflow dispatch', () => {
      expect(deployWorkflow.on).toHaveProperty('workflow_dispatch');
    });
  });

  describe('Job Configuration', () => {
    let deployJob: any;

    beforeAll(() => {
      deployJob = deployWorkflow.jobs.deploy;
    });

    test('should use ubuntu-latest runner', () => {
      expect(deployJob['runs-on']).toBe('ubuntu-latest');
    });

    test('should have correct permissions', () => {
      expect(deployJob.permissions).toEqual({
        contents: 'read',
        deployments: 'write'
      });
    });

    test('should only deploy on release commits', () => {
      expect(deployJob.if).toContain("contains(github.event.head_commit.message, 'chore(main)')");
    });
  });

  describe('Build Steps', () => {
    let buildSteps: any[];

    beforeAll(() => {
      buildSteps = deployWorkflow.jobs.deploy.steps;
    });

    test('should checkout code', () => {
      const checkoutStep = buildSteps.find(step => step.name === 'Checkout');
      expect(checkoutStep).toBeDefined();
      expect(checkoutStep.uses).toBe('actions/checkout@v4');
    });

    test('should use correct pnpm version', () => {
      const pnpmStep = buildSteps.find(step => step.name === 'Use pnpm 10.12.4');
      expect(pnpmStep).toBeDefined();
      expect(pnpmStep.run).toBe('corepack prepare pnpm@10.12.4 --activate');
    });

    test('should setup Node.js with pnpm cache', () => {
      const nodeStep = buildSteps.find(step => step.name === 'Setup Node.js');
      expect(nodeStep).toBeDefined();
      expect(nodeStep.with['node-version']).toBe('22');
      expect(nodeStep.with.cache).toBe('pnpm');
    });

    test('should install dependencies with pnpm', () => {
      const installStep = buildSteps.find(step => step.name === 'Install dependencies');
      expect(installStep).toBeDefined();
      expect(installStep.run).toBe('pnpm install');
    });

    test('should run tests before build', () => {
      const testStep = buildSteps.find(step => step.name === 'Run tests');
      expect(testStep).toBeDefined();
      expect(testStep.run).toBe('pnpm test');
    });

    test('should build application with OpenNext Cloudflare', () => {
      const buildStep = buildSteps.find(step => step.name === 'Build application');
      expect(buildStep).toBeDefined();
      expect(buildStep.run).toBe('pnpm pages:build');
      expect(buildStep.env).toHaveProperty('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID');
    });
  });

  describe('Deployment Configuration', () => {
    let deployStep: any;

    beforeAll(() => {
      const buildSteps = deployWorkflow.jobs.deploy.steps;
      deployStep = buildSteps.find(step => step.name === 'Deploy to Cloudflare Workers');
    });

    test('should use correct Wrangler action version', () => {
      expect(deployStep).toBeDefined();
      expect(deployStep.uses).toBe('cloudflare/wrangler-action@v3');
    });

    test('should use correct API credentials', () => {
      expect(deployStep.with.apiToken).toBe('${{ secrets.CLOUDFLARE_API_TOKEN }}');
      expect(deployStep.with.accountId).toBe('${{ secrets.CLOUDFLARE_ACCOUNT_ID }}');
    });

    test('should deploy correct directory for OpenNext Cloudflare output', () => {
      // This is the key test - it should deploy the correct directory for @opennextjs/cloudflare
      // instead of the old .vercel/output/static from @cloudflare/next-on-pages
      expect(deployStep.with.command).toMatch(/deploy/);
      expect(deployStep.with.command).not.toContain('.vercel/output/static');
    });

    test('should use wrangler deploy command instead of pages deploy', () => {
      // With @opennextjs/cloudflare, we should use `wrangler deploy` instead of `wrangler pages deploy`
      expect(deployStep.with.command).toMatch(/^deploy$/);
    });
  });

  describe('Environment Variables', () => {
    test('should have environment variables for secrets', () => {
      const buildSteps = deployWorkflow.jobs.deploy.steps;
      const buildStep = buildSteps.find(step => step.name === 'Build application');

      expect(buildStep.env).toHaveProperty('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID');
    });
  });
});
