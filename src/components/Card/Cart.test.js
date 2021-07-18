import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

test('that the card renders', () => {
  render(<Card />)

  const cardText = screen.queryByText(/I am a card/i)
  expect(cardText).toBeInTheDocument()

})