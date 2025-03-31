import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button Component', () => {
  it('should render with default props', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button', { name: 'Click me' })
    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeDisabled()
  })

  it('should apply secondary class when secondary prop is true', () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} secondary>
        Click me
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button.className).toContain('secondary')
  })

  it('should apply block class when block prop is true', () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} block>
        Click me
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button.className).toContain('block')
  })

  it('should apply both secondary and block classes when both props are true', () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} secondary block>
        Click me
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button.className).toContain('secondary')
    expect(button.className).toContain('block')
  })
})
