import React from 'react'
import { render, screen, waitFor } from 'tests/test-utils'
import { Partners } from 'tests/__mocks__/data/Partners'
import Home from 'pages/index'

describe('HomePage', () => {
  it('It renders Home page', async () => {
    const { asFragment } = render(<Home partners={Partners} />)
    expect(screen.getByTestId('home-element')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })
})
