import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { ImageContextProvider, useImagesContext } from './useImageContext';
import * as imageService from '../services/images';

vi.mock('../services/images', () => ({
  getImages: vi.fn(),
  getImagesByName: vi.fn(),
  setLikeToImage: vi.fn(),
}));

const TestComponent = () => {
  const { listImages, getByName } = useImagesContext();

  return (
    <div>
      <button onClick={() => getByName('test')}>Get Images</button>
      {listImages && listImages.length > 0 ? (
        listImages?.map(image => <p key={image.id}>{image.title}</p>)
      ) : (
        <p>No images found</p>
      )}
    </div>
  );
};

describe('useImagesContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default values', () => {
    act(() => {
      render(
        <ImageContextProvider>
          <TestComponent />
        </ImageContextProvider>
      );
    })

    expect(screen.getByText(/no images found/i)).toBeInTheDocument();
  });

  it('fetches images when getByName is called', async () => {
    (imageService.getImagesByName as Mock).mockResolvedValue([
      { id: 1, title: 'Image 1' },
      { id: 2, title: 'Image 2' },
    ]);

    act(() => {
      render(
        <ImageContextProvider>
          <TestComponent />
        </ImageContextProvider>
      );
    })
    
    screen.getByRole('button', { name: /get images/i }).click();

    await waitFor(() => {
      expect(screen.getByText(/image 1/i)).toBeInTheDocument();
      expect(screen.getByText(/image 2/i)).toBeInTheDocument();
    });
  });

  it('fetches images when getListImages is called', async () => {
    (imageService.getImages as Mock).mockResolvedValue([
      { id: 1, title: 'Image 1' },
      { id: 2, title: 'Image 2' },
    ]);

    act(() => {
      render(
        <ImageContextProvider>
          <TestComponent />
        </ImageContextProvider>
      );
    })

    await waitFor(() => {
      expect(imageService.getImages).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/image 1/i)).toBeInTheDocument();
      expect(screen.getByText(/image 2/i)).toBeInTheDocument();
    });
  });
});
