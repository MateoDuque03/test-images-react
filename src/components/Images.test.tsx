import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { useImagesContext } from '../context/useImageContext';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Images } from './Images';

vi.mock('../context/useImageContext');
vi.mock('../hooks/useInfiniteScroll');

describe('Images Component', () => {
  const mockImagesContext = {
    listImages: [
      {
        id: '1',
        main_attachment: {
          big: 'image-big.jpg',
          small: 'image-small.jpg',
        },
        title: 'Test Image',
        author: 'Author 1',
        likes_count: 10,
      },
    ],
    setNewLike: vi.fn(),
  };

  const mockUseInfiniteScroll = {
    loading: false,
  };

  beforeEach(() => {
    (useImagesContext as Mock).mockReturnValue(mockImagesContext);
    (useInfiniteScroll as Mock).mockReturnValue(mockUseInfiniteScroll);
  });

  it('renders image list correctly', () => {
    render(<Images />);

    expect(screen.getByAltText('image-big.jpg')).toBeInTheDocument();
    expect(screen.getByText('TEST IMAGE')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
  });

  it('calls setNewLike when like icon is clicked', () => {
    render(<Images />);

    const likeButton = screen.getByRole('like');
    fireEvent.click(likeButton);
    expect(mockImagesContext.setNewLike).toHaveBeenCalledWith('1');
  });

  it('displays loading message when loading more images', () => {
    (useInfiniteScroll as Mock).mockReturnValue({ loading: true });
    render(<Images />);
    expect(screen.getByText('Loading more images...')).toBeInTheDocument();
  });

  it('shows message when no images found', () => {
    (useImagesContext as Mock).mockReturnValue({ listImages: [] });
    render(<Images />);
    expect(screen.getByText('No images found for your search')).toBeInTheDocument();
  });
});
