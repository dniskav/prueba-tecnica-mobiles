import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Specs } from '../Specs'

// Importar la interfaz ProductSpecs del componente directamente
// ya que Specs.tsx la define internamente
interface ProductSpecs {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

describe('Specs Component', () => {
  const mockSpecs: ProductSpecs = {
    screen: '6.1 inches',
    resolution: '2532 x 1170',
    processor: 'A15 Bionic',
    mainCamera: '12 MP',
    selfieCamera: '12 MP',
    battery: '3240 mAh',
    os: 'iOS 15',
    screenRefreshRate: '60 Hz'
  }

  it('should render specifications correctly', () => {
    render(<Specs specs={mockSpecs} />)

    // Verify the title is displayed
    expect(screen.getByText('SPECIFICATIONS')).toBeInTheDocument()

    // Verify all spec labels are displayed
    expect(screen.getByText('SCREEN')).toBeInTheDocument()
    expect(screen.getByText('RESOLUTION')).toBeInTheDocument()
    expect(screen.getByText('PROCESSOR')).toBeInTheDocument()
    expect(screen.getByText('MAIN CAMERA')).toBeInTheDocument()
    expect(screen.getByText('SELFIE CAMERA')).toBeInTheDocument()
    expect(screen.getByText('BATTERY')).toBeInTheDocument()
    expect(screen.getByText('OS')).toBeInTheDocument()
    expect(screen.getByText('SCREEN REFRESH RATE')).toBeInTheDocument()

    // Verify all spec values are displayed
    expect(screen.getByText('6.1 inches')).toBeInTheDocument()
    expect(screen.getByText('2532 x 1170')).toBeInTheDocument()
    expect(screen.getByText('A15 Bionic')).toBeInTheDocument()
    expect(screen.getAllByText('12 MP')).toHaveLength(2) // Main and selfie cameras
    expect(screen.getByText('3240 mAh')).toBeInTheDocument()
    expect(screen.getByText('iOS 15')).toBeInTheDocument()
    expect(screen.getByText('60 Hz')).toBeInTheDocument()
  })

  it('should apply custom className when provided', () => {
    render(<Specs specs={mockSpecs} className="custom-class" />)

    // Get the specs container
    const specsContainer = screen.getByText('SPECIFICATIONS').closest('div')
    expect(specsContainer).toHaveClass('custom-class')
  })

  it('should handle specs with missing properties', () => {
    // Create a partial specs object
    const incompleteSpecs = {
      screen: '6.1 inches',
      resolution: '2532 x 1170',
      // processor is missing
      mainCamera: '12 MP',
      // selfieCamera is missing
      battery: '3240 mAh',
      os: 'iOS 15',
      screenRefreshRate: '60 Hz'
    } as ProductSpecs

    render(<Specs specs={incompleteSpecs} />)

    // Verify the available specs are displayed
    expect(screen.getByText('SCREEN')).toBeInTheDocument()
    expect(screen.getByText('6.1 inches')).toBeInTheDocument()

    // Verify missing specs don't cause errors
    expect(screen.queryByText('PROCESSOR')).toBeNull()
  })
})
