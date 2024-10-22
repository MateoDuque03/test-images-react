import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { ImageContextProvider } from './src/context/useImageContext.tsx'

const AllTheProviders = ({ children }: { children: ReactNode } ) => {
  return (
    <ImageContextProvider>
      {children}
    </ImageContextProvider>
  )
}

const customRender = (ui: any, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: AllTheProviders,
    ...options,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };