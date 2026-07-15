// ===============================================
// Module: app/[locale]/docs/payload-format/MarkdownRenderer.test.tsx
// Description: Tests for the MarkdownRenderer component
//
// Sections:
//   - Imports and Setup
//   - Rendering Tests
//   - Markdown Feature Tests
//   - Styling Tests
// ===============================================

import { render } from "@testing-library/react";
import { MarkdownRenderer } from "./MarkdownRenderer";

// Mock remark-gfm and rehype-highlight to avoid dependency issues
jest.mock("remark-gfm", () => () => {});
jest.mock("rehype-highlight", () => () => {});

// Mock react-markdown to avoid issues with dependencies in test environment
jest.mock("react-markdown", () => {
  return function ReactMarkdown({ children }: { children: string }) {
    // Simple mock that converts basic markdown to HTML
    const html = children
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
      .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .split("\n\n")
      .map((p) => {
        if (
          !p.startsWith("<h") &&
          !p.startsWith("<li") &&
          !p.startsWith("<blockquote") &&
          p.trim()
        ) {
          return `<p>${p}</p>`;
        }
        return p;
      })
      .join("");

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };
});

describe("MarkdownRenderer", () => {
  describe("Basic Rendering", () => {
    it("should render simple markdown content", () => {
      const content = "# Hello World\n\nThis is a paragraph.";
      const { container } = render(<MarkdownRenderer content={content} />);

      expect(container.querySelector("h1")).toHaveTextContent("Hello World");
      expect(container.querySelector("p")).toHaveTextContent("This is a paragraph.");
    });

    it("should render with prose classes for typography", () => {
      const content = "# Test";
      const { container } = render(<MarkdownRenderer content={content} />);

      const proseDiv = container.querySelector(".prose");
      expect(proseDiv).toBeInTheDocument();
      expect(proseDiv).toHaveClass("prose-slate");
    });
  });

  describe("Markdown Features", () => {
    it("should render headings at different levels", () => {
      const content = `# H1\n\n## H2\n\n### H3`;
      const { container } = render(<MarkdownRenderer content={content} />);

      expect(container.querySelector("h1")).toBeTruthy();
      expect(container.querySelector("h2")).toBeTruthy();
      expect(container.querySelector("h3")).toBeTruthy();
    });

    it("should render inline code", () => {
      const content = "This is `inline code` in text.";
      const { container } = render(<MarkdownRenderer content={content} />);

      const code = container.querySelector("code");
      expect(code).toBeTruthy();
    });

    it("should render links", () => {
      const content = "[Link text](https://example.com)";
      const { container} = render(<MarkdownRenderer content={content} />);

      const link = container.querySelector("a");
      expect(link).toBeTruthy();
      expect(link?.getAttribute("href")).toBe("https://example.com");
    });

    it("should render strong/bold text", () => {
      const content = "**bold text**";
      const { container } = render(<MarkdownRenderer content={content} />);

      const strong = container.querySelector("strong");
      expect(strong).toBeTruthy();
    });
  });

  describe("Component Structure", () => {
    it("should wrap content in prose container", () => {
      const content = "# Test";
      const { container } = render(<MarkdownRenderer content={content} />);

      const proseDiv = container.querySelector(".prose");
      expect(proseDiv).toBeTruthy();
      expect(proseDiv).toHaveClass("prose-slate");
    });

    it("should handle empty content", () => {
      const { container } = render(<MarkdownRenderer content="" />);
      expect(container.querySelector(".prose")).toBeTruthy();
    });

    it("should handle content with only whitespace", () => {
      const { container } = render(<MarkdownRenderer content="   \n\n   " />);
      expect(container.querySelector(".prose")).toBeTruthy();
    });
  });
});
