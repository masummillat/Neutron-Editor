import React from 'react';
import { HashTagSpanProps } from './NeutronEditor.types';
const HashtagSpan: React.FC<HashTagSpanProps> = ({ offsetKey, children }) => {
  return (
    <span
      style={{ color: 'rgba(95, 184, 138, 1.0)' }}
      data-offset-key={offsetKey}>
      {children}
    </span>
  );
};

export default HashtagSpan;
