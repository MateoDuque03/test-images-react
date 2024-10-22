import { getImages, getImagesByName, setLikeToImage } from './images';
import { vi, describe, it, expect, Mock } from 'vitest';

global.fetch = vi.fn()

describe('Image Services', () => {
  afterEach(() => {
    vi.clearAllMocks()
  });

  it('should fetch images for a given page', async () => {
    const mockResponse = [
      {
        type: 'photo',
        id: 1,
        title: 'Test Image',
        price: 10,
        author: 'Author Name',
        created_at: '2024-10-21T12:00:00Z',
        main_attachment: {
          big: 'big-image-url',
          small: 'small-image-url',
        },
        likes_count: 10,
        liked: false,
        links: [],
      },
    ];
    
    (fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const images = await getImages(1);
    
    expect(fetch).toHaveBeenCalledWith('http://localhost:3100/images?page=1');
    expect(images).toEqual(mockResponse);
  });

  it('should fetch images by name', async () => {
    const search = 'Test';
    const mockResponse = [
      {
        type: 'photo',
        id: 1,
        title: 'Test Image',
        price: 10,
        author: 'Author Name',
        created_at: '2024-10-21T12:00:00Z',
        main_attachment: {
          big: 'big-image-url',
          small: 'small-image-url',
        },
        likes_count: 10,
        liked: false,
        links: [],
      },
      {
        type: 'photo',
        id: 2,
        title: 'Another Image',
        price: 15,
        author: 'Another Author',
        created_at: '2024-10-21T12:00:00Z',
        main_attachment: {
          big: 'big-image-url-2',
          small: 'small-image-url-2',
        },
        likes_count: 5,
        liked: true,
        links: [],
      },
    ];
    
    (fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const images = await getImagesByName(search);
    
    expect(fetch).toHaveBeenCalledWith(`http://localhost:3100/images?search=${search}`);
    expect(images).toEqual([mockResponse[0]]);
  });

  it('should return an empty array if no search term is provided', async () => {
    const images = await getImagesByName('');
    expect(images).toEqual([]);
  });

  it('should set like to an image', async () => {
    const id = 1;
    (fetch as Mock).mockResolvedValueOnce({
      status: 200,
    });

    const status = await setLikeToImage(id);
    expect(fetch).toHaveBeenCalledWith(`http://localhost:3100/images/${id}/likes`, {
      method: "POST",
    });
    expect(status).toBe(200);
  });
});
