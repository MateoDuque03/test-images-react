import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import { describe, it, expect, vi } from 'vitest';

describe('useDebounce', () => {
  it('debounces the function calls', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useDebounce());
    
    const mockFunction = vi.fn();
    const debounce = result.current;

    act(() => {
      debounce(mockFunction, 1000);
      debounce(mockFunction, 1000);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
