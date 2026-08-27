// ===============================================
// Module: app/[locale]/docs/payload-format/page.test.tsx
// Description: Tests for the Payload Format documentation page
//
// Sections:
//   - Imports and Setup
//   - Metadata Tests
//   - Page Rendering Tests
//   - Error Handling Tests
// ===============================================

import { render } from "@testing-library/react";
import { notFound } from "next/navigation";
import PayloadFormatDocsPage, { generateMetadata } from "./page";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

// Mock the MarkdownRenderer component
jest.mock("./MarkdownRenderer", () => ({
  MarkdownRenderer: ({ content }: { content: string }) => (
    <div data-testid="markdown-renderer">{content}</div>
  ),
}));

describe("PayloadFormatDocsPage", () => {
  const mockMarkdownContent = `# Test Markdown
This is a test markdown file.`;

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockMarkdownContent),
    });
  });

  describe("generateMetadata", () => {
    it("should generate metadata for supported locale", async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ locale: "en" }),
      });

      expect(metadata.title).toBe("Payload Format - Piyuo Counter Documentation");
      expect(metadata.description).toContain("Technical documentation");
      expect(metadata.openGraph?.title).toBe("Payload Format - Piyuo Counter Documentation");
    });

    it("should generate fallback metadata for unsupported locale", async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ locale: "xx" }),
      });

      expect(metadata.title).toBe("Payload Format - Piyuo Counter Documentation");
      expect(metadata.description).toBeDefined();
    });
  });

  describe("Page Rendering", () => {
    it("should render the documentation page with markdown content", async () => {
      const params = Promise.resolve({ locale: "en" });
      const page = await PayloadFormatDocsPage({ params });
      const { container } = render(page);

      expect(container).toBeInTheDocument();
      expect(global.fetch).toHaveBeenCalled();
    });

    it("should render header with back to home link", async () => {
      const params = Promise.resolve({ locale: "en" });
      const page = await PayloadFormatDocsPage({ params });
      const { container } = render(page);

      const backLink = container.querySelector('a[href="/en"]');
      expect(backLink).toBeInTheDocument();
      expect(backLink?.textContent).toContain("Back to Home");
    });

    it("should render technical documentation heading", async () => {
      const params = Promise.resolve({ locale: "en" });
      const page = await PayloadFormatDocsPage({ params });
      const { getByText } = render(page);

      expect(getByText("Technical Documentation")).toBeInTheDocument();
      expect(getByText("Piyuo Counter Payload Format Specification")).toBeInTheDocument();
    });

    it("should render markdown content through MarkdownRenderer", async () => {
      const params = Promise.resolve({ locale: "en" });
      const page = await PayloadFormatDocsPage({ params });
      const { getByTestId } = render(page);

      const renderer = getByTestId("markdown-renderer");
      expect(renderer).toBeInTheDocument();
      expect(renderer.textContent).toContain("Test Markdown");
    });

    it("should render footer with contact information", async () => {
      const params = Promise.resolve({ locale: "en" });
      const page = await PayloadFormatDocsPage({ params });
      const { container } = render(page);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
      expect(footer?.textContent).toContain("support@piyuo.com");
    });
  });

  describe("Error Handling", () => {
    it("should call notFound when locale is not supported", async () => {
      const params = Promise.resolve({ locale: "invalid" });

      await PayloadFormatDocsPage({ params });

      expect(notFound).toHaveBeenCalled();
    });

    it("should call notFound when markdown file cannot be read", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("File not found"));

      // Suppress console.error for this expected error case
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const params = Promise.resolve({ locale: "en" });

      await PayloadFormatDocsPage({ params });

      expect(notFound).toHaveBeenCalled();

      // Restore console.error
      consoleErrorSpy.mockRestore();
    });
  });

  describe("Locale Support", () => {
    const supportedLocales = ["en", "zh", "ja", "es", "de"];

    supportedLocales.forEach((locale) => {
      it(`should render page for supported locale: ${locale}`, async () => {
        const params = Promise.resolve({ locale });
        const page = await PayloadFormatDocsPage({ params });
        const { container } = render(page);

        expect(container).toBeInTheDocument();
        const backLink = container.querySelector(`a[href="/${locale}"]`);
        expect(backLink).toBeInTheDocument();
      });
    });
  });
});
