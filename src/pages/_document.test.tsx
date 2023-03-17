import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Document from './_document'

describe('Document component', () => {
  it('renders the HTML document', () => {
    const { getByText, getByRole } = render(<Document />)

    expect(getByText('E Commerce')).toBeInTheDocument()
    expect(getByRole('heading', { name: 'E Commerce' })).toBeInTheDocument()
    expect(getByRole('meta', { name: 'E Commerce app' })).toBeInTheDocument()

    expect(getByRole('main')).toBeInTheDocument()
    expect(getByRole('script', { name: 'NextScript' })).toBeInTheDocument()
  })
})
