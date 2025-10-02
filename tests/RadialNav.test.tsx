import { fireEvent, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { RadialNav } from '@/components/RadialNav';
import { renderWithProviders } from './test-utils';

describe('RadialNav', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        media: query,
        matches: false,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn()
      })
    });
  });

  it('opens radial menu and is accessible', async () => {
    const { container } = renderWithProviders(<RadialNav />);

    const trigger = screen.getByRole('button', { name: /menu d’actions flottant/i });
    fireEvent.click(trigger);

    expect(screen.getByLabelText(/changer de langue/i)).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
