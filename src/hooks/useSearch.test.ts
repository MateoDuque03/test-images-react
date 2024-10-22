import { renderHook, act } from '@testing-library/react';
import { useSearch } from './useSearch';
import { describe, it, expect } from 'vitest';

describe('useSearch', () => {
  it('sets an error when search is empty', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.isFirstSearch.current = false
      result.current.hasError('');
    });

    expect(result.current.error).toBe('Cannot be empty');
  });

  it('sets an error when search is less than 3 characters', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.isFirstSearch.current = false
      result.current.hasError('ab');
    });

    expect(result.current.error).toBe('Must be longer than 3 characters');
  });

  it('sets an error when search contains numbers', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.isFirstSearch.current = false
      result.current.hasError('123');
    });

    expect(result.current.error).toBe('Cannot contain numbers');
  });

  it('does not set an error for valid search input', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearch('validSearch');
    });

    expect(result.current.error).toBe('');
  });
});
