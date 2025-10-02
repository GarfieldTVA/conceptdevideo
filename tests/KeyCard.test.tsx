import { act, fireEvent, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { KeyCard } from '@/components/KeyCard';
import { renderWithProviders } from './test-utils';
import { STREAM_KEY } from '@/lib/streamKey';

describe('KeyCard', () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockResolvedValue(undefined)
      },
      configurable: true
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the stream key and copies it', async () => {
    const { container } = renderWithProviders(<KeyCard />);

    expect(screen.getByText(STREAM_KEY)).toBeInTheDocument();
    const copyButton = screen.getByRole('button', { name: /copier/i });
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(STREAM_KEY);

    act(() => {
      jest.runAllTimers();
    });

    jest.useRealTimers();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
