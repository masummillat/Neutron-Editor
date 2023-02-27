import React from 'react';
import { MediaInputPropmtProps } from '../NeutronEditor.types';
import { AiOutlineClose } from 'react-icons/ai';
import clsx from 'clsx';
const MediaInputPrompt = React.forwardRef(
  (
    {
      onURLChange,
      mediaUrl,
      onURLInputKeyDown,
      handleClose,
      placeholder
    }: MediaInputPropmtProps,
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => (
    <div className={clsx('media-input-wrapper')}>
      <input
        className={clsx('media-input')}
        autoFocus
        onChange={onURLChange}
        ref={ref}
        style={{
          border: 0,
          outline: 0,
          fontFamily: "'Georgia', serif"
        }}
        type="text"
        value={mediaUrl}
        onKeyDown={onURLInputKeyDown}
        placeholder={placeholder}
      />
      <AiOutlineClose
        onClick={handleClose}
        style={{ color: 'white', cursor: 'pointer' }}
      />
    </div>
  )
);

export default MediaInputPrompt;
