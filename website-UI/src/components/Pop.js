import React, { useState } from 'react';
import { Overlay } from 'react-portal-overlay';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Overlay open={open} onClose={() => setOpen(false)}>
      <h1>My overlay</h1>
    </Overlay>
  );
};