import { render, screen } from '@testing-library/react';
import { GlassContainer } from './GlassContainer';

describe('GlassContainer', () => {
  it('renders children correctly', () => {
    render(
      <GlassContainer>
        <div>Test content</div>
      </GlassContainer>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom padding class', () => {
    const { container } = render(
      <GlassContainer padding="p-4">
        <div>Test content</div>
      </GlassContainer>
    );

    const paddingDiv = container.querySelector('.p-4');
    expect(paddingDiv).toBeInTheDocument();
  });

  it('applies custom margin class', () => {
    const { container } = render(
      <GlassContainer margin="m-4">
        <div>Test content</div>
      </GlassContainer>
    );

    const marginDiv = container.querySelector('.m-4');
    expect(marginDiv).toBeInTheDocument();
  });
});
