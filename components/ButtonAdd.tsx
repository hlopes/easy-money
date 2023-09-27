import type { MouseEventHandler } from 'react';
import { LuPlus } from 'react-icons/lu';

import { Button } from './ui/button';

type ButtonAddProps = {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function ButtonAdd({
  disabled = false,
  onClick,
}: ButtonAddProps) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      <LuPlus />
      Add New
    </Button>
  );
}
