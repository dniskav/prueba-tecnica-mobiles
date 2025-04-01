import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EnvIndicator } from '../EnvIndicator'
import { environment } from '../../../infrastructure/environment'

// Mock the CSS module to avoid interference in tests
vi.mock('../envIndicator.module.css', () => ({
  default: {
    container: 'container-mock',
    badge: 'badge-mock'
  }
}))

// Mock the environment
vi.mock('../../../infrastructure/environment', () => ({
  environment: {
    isProduction: false,
    mode: 'development'
  }
}))

describe('EnvIndicator Component', () => {
  // Save original environment state and restore after each test
  let originalEnvironment: typeof environment

  beforeEach(() => {
    originalEnvironment = { ...environment }
  })

  afterEach(() => {
    // Restore the environment after each test
    vi.mocked(environment).isProduction = originalEnvironment.isProduction
    vi.mocked(environment).mode = originalEnvironment.mode
  })

  it('should display environment mode in development', () => {
    // Arrange
    vi.mocked(environment).isProduction = false
    vi.mocked(environment).mode = 'development'

    // Act
    render(<EnvIndicator />)

    // Assert
    expect(screen.getByText('DEVELOPMENT')).toBeInTheDocument()
  })

  it('should display environment mode in staging', () => {
    // Arrange
    vi.mocked(environment).isProduction = false
    vi.mocked(environment).mode = 'staging'

    // Act
    render(<EnvIndicator />)

    // Assert
    expect(screen.getByText('STAGING')).toBeInTheDocument()
  })

  it('should not render anything in production', () => {
    // Arrange
    vi.mocked(environment).isProduction = true

    // Act
    const { container } = render(<EnvIndicator />)

    // Assert
    expect(container).toBeEmptyDOMElement()
  })

  it('should apply the correct CSS classes in non-production environments', () => {
    // Arrange
    vi.mocked(environment).isProduction = false
    vi.mocked(environment).mode = 'test'

    // Act
    render(<EnvIndicator />)

    // Assert
    const container = screen.getByText('TEST').parentElement
    expect(container).toHaveClass('container-mock')

    const badge = screen.getByText('TEST')
    expect(badge).toHaveClass('badge-mock')
  })
})
