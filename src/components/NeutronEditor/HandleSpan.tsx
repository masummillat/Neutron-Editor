import React from 'react';
import { HandleSpanProps } from './NeutronEditor.types';
const HandleSpan: React.FC<HandleSpanProps> = ({ offsetKey, children }) => {
  return (
    <span
      style={{
        color: 'rgba(98, 177, 254, 1.0)',
        direction: 'ltr',
        unicodeBidi: 'bidi-override'
      }}
      data-offset-key={offsetKey}>
      {children}
    </span>
  );
};

export default HandleSpan;
