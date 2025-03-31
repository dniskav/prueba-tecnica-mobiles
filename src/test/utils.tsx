import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from '../ui/stores/productContext'
import userEvent from '@testing-library/user-event'

// Interface for extended render options
interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
}

// Function to render components with all necessary providers
export function renderWithProviders(
  ui: ReactElement,
  { route = '/', ...renderOptions }: ExtendedRenderOptions = {}
) {
  // Set URL for the test
  window.history.pushState({}, 'Test page', route)

  function AllProviders({ children }: { children: React.ReactNode }) {
    return (
      <ProductProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ProductProvider>
    )
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...renderOptions })
  }
}

// Function to mock currency formatter
export function mockCurrencyFormatter() {
  return (value: number) => `EUR ${value.toFixed(2)}`
}
