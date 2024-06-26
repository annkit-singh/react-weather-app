import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Suggestions from './Suggestions';
import { optionType } from './../types/index';

const mockOptions: optionType[] = [
  { name: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060 },
  { name: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6895, lon: 139.6917 },
];

const mockOnSelect = jest.fn();

// test('renders the list of options', () => {
//   render(<Suggestions options={mockOptions} onSelect={mockOnSelect} />);

//   expect(screen.getByText(/New York, USA/i)).toBeInTheDocument();
//   expect(screen.getByText(/Los Angeles, USA/i)).toBeInTheDocument();
//   expect(screen.getByText(/Tokyo, Japan/i)).toBeInTheDocument();
// });

test('calls onSelect with the correct option when an option is clicked', () => {
  render(<Suggestions options={mockOptions} onSelect={mockOnSelect} />);

  const optionButton = screen.getByText(/Los Angeles, USA/i);
  fireEvent.click(optionButton);

  expect(mockOnSelect).toHaveBeenCalledTimes(1);
  expect(mockOnSelect).toHaveBeenCalledWith({ name: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437 });
});
