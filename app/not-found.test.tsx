// ===============================================
// Not Found Page Tests
// Description: Test suite for the global 404 page
//
// Purpose:
//   - Validates 404 page renders correctly
//   - Tests accessibility and user experience
//   - Ensures proper navigation links
// ===============================================

import { render } from '@testing-library/react';
import NotFound from './not-found';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('NotFound Page', () => {
  test('should render 404 page with proper content', () => {
    const { getByText, getByRole } = render(<NotFound />);

    // Check main heading
    expect(getByText('404')).toBeInTheDocument();
    expect(getByText('Page Not Found')).toBeInTheDocument();

    // Check description
    expect(getByText(/The page you are looking for doesn't exist or has been moved/)).toBeInTheDocument();

    // Check home link
    const homeLink = getByRole('link', { name: /go back home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('should have proper styling and layout', () => {
    const { container } = render(<NotFound />);

    // Check container structure
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('min-h-screen');
    expect(mainContainer).toHaveClass('flex');
    expect(mainContainer).toHaveClass('items-center');
    expect(mainContainer).toHaveClass('justify-center');
  });

  test('should be accessible', () => {
    const { getByRole } = render(<NotFound />);

    // Check headings are properly structured
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('404');
    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Page Not Found');

    // Check link is accessible
    expect(getByRole('link')).toBeInTheDocument();
  });
});
