import { render, screen } from './../test-utils'
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders Header and Images components', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
