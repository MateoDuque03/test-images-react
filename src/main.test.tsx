import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import { ImageContextProvider } from './context/useImageContext'

describe('App component', () => {
  it('renders without crashing', () => {
    render(
      <ImageContextProvider>
        <App />
      </ImageContextProvider>
    )

    expect(screen.getByText(/No images found for your search/i)).toBeInTheDocument()
  })
})
