// src/components/Greeting.test.tsx
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Greeting from './Greeting';

describe('Greeting Component', () => {
  // Test case 1: Renders with default greeting when no name is provided
  it('should display "Hello, Guest!" when no name prop is passed', () => {
    render(<Greeting />);

    // Assert that the "Hello, Guest!" message (in a <p> tag) is in the document
    expect(screen.getByText('Hello, Guest!')).toBeInTheDocument();

    // Ensure the specific h1 for named greetings is NOT in the document.
    // We can query for the h1 element specifically, or use a more precise regex.
    // Option A: Query for the h1 role, then check if it's there.
    // We expect there to be NO heading (h1, h2 etc.) that contains "Hello, " followed by a name.
    // In this specific case, if there's no name, there's no <h1> at all,
    // so checking for the "Hello, Guest!" and then simply making sure
    // a *named* heading isn't there is cleaner.

    // Let's refine this to specifically target the H1 when a name is present.
    // Instead of a broad regex, we can use screen.queryByRole('heading')
    // and specifically check for text *other* than "Hello, Guest!".

    // Simplified approach for this test:
    // We've already confirmed "Hello, Guest!" exists.
    // We want to confirm that a *named* greeting (which implies an h1) doesn't exist.
    // The previous regex was too broad.
    // A better assertion here is to confirm the absence of the <h1> element itself
    // or specifically an h1 with a varying name.
    // Since the h1 only appears *with a name*, if no name is passed, the h1 won't be there.
    // So, we can directly query for the h1 if it would have been there.

    // A better approach for the *second* assertion in this test:
    // Ensure that no <h1> with a specific name is rendered.
    // In the "no name" case, the h1 won't be rendered.
    // The original regex was problematic because "Hello, Guest!" also matches it.

    // If you want to check for the *absence* of the <h1> that is *only* rendered
    // when a name is present, you can look for an element with the 'heading' role
    // that doesn't contain "Guest".
    expect(screen.queryByRole('heading', { name: /Hello, .+!/i })).not.toBeInTheDocument();
  });

  // Test case 2: Renders with a specific name when provided
  it('should display "Hello, Alice!" when name prop is "Alice"', () => {
    render(<Greeting name="Alice" />);

    // Check if the greeting with the specific name is present (this is an h1)
    expect(screen.getByRole('heading', { name: 'Hello, Alice!' })).toBeInTheDocument();

    // Ensure the default guest greeting (which is a p tag) is NOT in the document
    expect(screen.queryByText('Hello, Guest!')).not.toBeInTheDocument();
  });

  // Test case 3: Checks if the button is rendered and clickable
  it('should render a clickable button', () => {
    render(<Greeting />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});