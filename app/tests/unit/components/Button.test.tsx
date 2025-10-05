import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600')
  })

  it('renders with variant prop', () => {
    render(<Button variant="outline">Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('border-gray-300')
  })

  it('renders with size prop', () => {
    render(<Button size="sm">Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('h-8')
  })

  it('renders as disabled', () => {
    render(<Button disabled>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeDisabled()
  })

  it('renders as link when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Click me</a>
      </Button>
    )
    
    const link = screen.getByRole('link', { name: /click me/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })
})
