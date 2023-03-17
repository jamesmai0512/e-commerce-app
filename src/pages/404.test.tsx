import { fireEvent, render } from '@testing-library/react'
// import { createMemoryHistory } from 'history';
import Custom404 from './404'

describe('Custom404', () => {
  it('Should render the page not found message', () => {
    const component = render(<Custom404 />)
    const message = component.getByText('PAGE NOT FOUND')
    expect(message).toBeInTheDocument()
  })

  it('Should render the return to home button', () => {
    const component = render(<Custom404 />)
    const button = component.getByText('Return To Home')
    expect(button).toBeInTheDocument()
  })
})
