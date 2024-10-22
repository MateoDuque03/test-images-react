import { renderHook, act } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { useImagesContext } from '../context/useImageContext';

vi.mock('../context/useImageContext');

describe('useInfiniteScroll', () => {
  const mockGetListImages = vi.fn();
  const mockSetPage = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    (useImagesContext as Mock).mockReturnValue({
      getListImages: mockGetListImages,
      setPage: mockSetPage,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  
  it('fetches images on scroll and return loading false', () => {
    const { result } = renderHook(() => useInfiniteScroll());
    act(() => {
      window.innerHeight = 1000;
      document.documentElement.scrollTop = 1000;
      window.dispatchEvent(new Event('scroll'));
    })
    
    expect(result.current.loading).toBeFalsy()
  });

  it('fetches images when scrolled to bottom', () => {
    const { result } = renderHook(() => useInfiniteScroll());

    act(() => {
      result.current.loading = false
      window.innerHeight = 500;
      document.documentElement.scrollTop = 500;
      Object.defineProperty(document.documentElement, 'offsetHeight', { value: 1000, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(mockGetListImages).toHaveBeenCalled();
    expect(mockSetPage).toHaveBeenCalled();
  });

  it('does not fetch images when already loading', () => {
    const { result } = renderHook(() => useInfiniteScroll());
    
    act(() => {
      result.current.loading = true;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(mockGetListImages).not.toHaveBeenCalled();
  });
});
