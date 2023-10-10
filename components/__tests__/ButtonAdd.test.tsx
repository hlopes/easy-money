import { render, screen } from '@testing-library/react';

import ButtonAdd from '../ButtonAdd';

import '@testing-library/jest-dom';

describe('ButtonAdd', () => {
  it('displays', async () => {
    render(<ButtonAdd />);

    // // ACT
    // await userEvent.click(screen.getByText('Load Greeting'));

    // await screen.findByRole('heading');

    // ASSERT
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
