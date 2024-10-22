import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import { useImagesContext } from '../context/useImageContext';
import { useSearch } from '../hooks/useSearch';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../context/useImageContext');
vi.mock('../hooks/useSearch');

describe('Header Component', () => {
  const getByNameMock = vi.fn();

  beforeEach(() => {
    (useImagesContext as jest.Mock).mockReturnValue({
      getByName: getByNameMock,
    });

    (useSearch as jest.Mock).mockReturnValue({
      search: '',
      setSearch: vi.fn(),
      error: '',
      hasError: vi.fn(() => false),
      isDirty: false,
      setIsDirty: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and search input', () => {
    render(<Header />);

    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', '/src/assets/logo.png');

    const input = screen.getByPlaceholderText(/You're looking for something?/i);
    expect(input).toBeInTheDocument();
  });

  it('calls getByName when form is submitted', async () => {
    const setSearchMock = vi.fn();
    (useSearch as jest.Mock).mockReturnValue({
      search: 'test search',
      setSearch: setSearchMock,
      error: '',
      hasError: vi.fn(() => false),
      isDirty: false,
      setIsDirty: vi.fn(),
    });

    render(<Header />);

    const input = screen.getByPlaceholderText(/You're looking for something?/i);
    fireEvent.change(input, { target: { value: 'test search' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(getByNameMock).toHaveBeenCalledWith('test search');
    });
  });

  it('displays error message if search has error', async () => {
    (useSearch as jest.Mock).mockReturnValue({
      search: '',
      setSearch: vi.fn(),
      error: 'Cannot be empty',
      hasError: vi.fn(() => true),
      isDirty: true,
      setIsDirty: vi.fn(),
    });

    render(<Header />);

    const input = screen.getByPlaceholderText(/You're looking for something?/i);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);

    const errorMessage = screen.getByText('Cannot be empty');
    expect(errorMessage).toBeInTheDocument();
  });
});
