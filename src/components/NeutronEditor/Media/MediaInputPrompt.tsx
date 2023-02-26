import React from 'react';
import { MediaInputPropmtProps } from '../NeutronEditor.types';
import { AiOutlineClose } from 'react-icons/ai';
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
    <div className="h-full flex gap-2 items-center">
      <input
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
        className="fill-red-600 hover:fill-red-500 cursor-pointer"
      />
    </div>
  )
);

export default MediaInputPrompt;
