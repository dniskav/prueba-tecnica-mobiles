import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EnvIndicator } from '../EnvIndicator'
import { environment } from '../../../infrastructure/environment'

// Mockear el módulo CSS para que no interfiera en las pruebas
vi.mock('../envIndicator.module.css', () => ({
  default: {
    container: 'container-mock',
    badge: 'badge-mock'
  }
}))

// Mockear el environment
vi.mock('../../../infrastructure/environment', () => ({
  environment: {
    isProduction: false,
    mode: 'development'
  }
}))

describe('EnvIndicator Component', () => {
  // Guardar estado original del entorno y restablecer después de cada prueba
  let originalEnvironment: typeof environment

  beforeEach(() => {
    originalEnvironment = { ...environment }
  })

  afterEach(() => {
    // Restaurar el entorno después de cada prueba
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
