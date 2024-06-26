
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Panel from './Panel';

describe('Panel Component', () => {
  test('renders correctly with wind icon', () => {
    const { getByText, getByTestId } = render(
      <Panel icon="wind" title="Wind" info="10 km/h" description="Strong wind" />
    );

    expect(getByText('Wind')).toBeInTheDocument();
    expect(getByText('10 km/h')).toBeInTheDocument();
    
    expect(getByText('Strong wind')).toBeInTheDocument();
  });

  test('renders correctly with feels icon', () => {
    const { getByText, getByTestId } = render(
      <Panel icon="feels" title="Feels Like" info="25°C" description="Comfortable" />
    );

    expect(getByText('Feels Like')).toBeInTheDocument();
    expect(getByText('25°C')).toBeInTheDocument();
    expect(getByText('Comfortable')).toBeInTheDocument();
  });

});

