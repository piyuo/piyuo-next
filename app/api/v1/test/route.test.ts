/**
 * Tests for /api/v1/test endpoint
 *
 * TOC:
 * - Test setup
 * - GET request tests
 * - POST request tests
 * - Error handling tests
 */

import { NextRequest } from 'next/server';
import { GET, POST } from './route';

// ============================================================================
// Test setup
// ============================================================================

/**
 * Helper function to create a mock NextRequest with JSON body
 */
function createMockRequest(body: unknown): NextRequest {
  const mockRequest = {
    json: jest.fn().mockResolvedValue(body),
  } as unknown as NextRequest;

  return mockRequest;
}

/**
 * Helper function to create a mock NextRequest with invalid body
 */
function createInvalidMockRequest(): NextRequest {
  const mockRequest = {
    json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
  } as unknown as NextRequest;

  return mockRequest;
}

describe('/api/v1/test', () => {

  // ============================================================================
  // GET request tests
  // ============================================================================

  describe('GET', () => {
    it('should return "no data" message when nothing has been posted', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        message: 'No data posted yet',
        lastPostedAt: null,
      });
    });

    it('should return the last posted data after a POST', async () => {
      // First, post some data
      const testPayload = { test: 'data', number: 42 };
      const postRequest = createMockRequest(testPayload);

      await POST(postRequest);

      // Then, get the data
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Last posted data');
      expect(data.postedAt).toBeTruthy();
      expect(data.data).toEqual(testPayload);
    });
  });

  // ============================================================================
  // POST request tests
  // ============================================================================

  describe('POST', () => {
    it('should accept and store JSON payload', async () => {
      const testPayload = { foo: 'bar', count: 123 };
      const request = createMockRequest(testPayload);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Data received and stored');
      expect(data.timestamp).toBeTruthy();
    });

    it('should handle complex nested JSON objects', async () => {
      const complexPayload = {
        user: { id: 1, name: 'Test User' },
        items: [{ id: 1, value: 'a' }, { id: 2, value: 'b' }],
        metadata: { created: '2024-01-01', tags: ['test', 'api'] },
      };

      const request = createMockRequest(complexPayload);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      // Verify it's stored by getting it back
      const getResponse = await GET();
      const getData = await getResponse.json();
      expect(getData.data).toEqual(complexPayload);
    });

    it('should overwrite previous data with new POST', async () => {
      // Post first payload
      const firstPayload = { first: 'data' };
      const firstRequest = createMockRequest(firstPayload);
      await POST(firstRequest);

      // Post second payload
      const secondPayload = { second: 'data' };
      const secondRequest = createMockRequest(secondPayload);
      await POST(secondRequest);

      // Verify only the second payload is stored
      const getResponse = await GET();
      const data = await getResponse.json();
      expect(data.data).toEqual(secondPayload);
      expect(data.data).not.toEqual(firstPayload);
    });
  });

  // ============================================================================
  // Error handling tests
  // ============================================================================

  describe('Error handling', () => {
    it('should return 400 for invalid JSON in POST', async () => {
      const request = createInvalidMockRequest();

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid JSON payload');
    });

    it('should handle empty POST body', async () => {
      const request = createInvalidMockRequest();

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });
  });
});
