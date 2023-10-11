import { render, screen } from '@testing-library/react';

import ButtonAdd from '../ButtonAdd';

import '@testing-library/jest-dom';

describe('ButtonAdd', () => {
  it('displays', async () => {
    render(<ButtonAdd />);

    expect(screen.getByRole('button', { name: 'Add New' })).toBeInTheDocument();
  });
});
