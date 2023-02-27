import clsx from 'clsx';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import React, { useRef, useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { MdAudiotrack, MdImage, MdVideoCameraFront } from 'react-icons/md';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import MediaInputPrompt from '../Media/MediaInputPrompt';

interface SidebarToolboxProps {
  editorState: EditorState;
  sideTBP: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  handleHideSidbarToolbox: () => void;
  onChange: (editorState: EditorState) => void;
}

const getPlaceholder = (type: string) => {
  switch (type) {
    case 'audio':
      return 'Paste or type audio link ...';
    case 'image':
      return 'Paste or type image link ...';
    case 'video':
      return 'Paste or type video link ...';
    default:
      return 'Paste or type audio link ...';
  }
};

const SidebarToolbox: React.FC<SidebarToolboxProps> = ({
  editorState,
  sideTBP,
  handleHideSidbarToolbox,
  onChange
}) => {
  const [mediaUrlType, setMediaUrlType] = useState<string>('');
  const [showMediaInput, setShowMediaInput] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const mediaInputRef = useRef<HTMLInputElement | null>(null);
  const [showMediaOption, setShowMediaOption] = useState<boolean>(false);

  const [mediaWrapperRef] = useOnClickOutside(() => setShowMediaOption(false));
  const confirmMedia = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      mediaUrlType,
      'IMMUTABLE',
      { src: mediaUrl }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });

    // The third parameter here is a space string, not an empty string
    // If you set an empty string, you will get an error: Unknown DraftEntity key: null
    onChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    );
    setTimeout(() => {
      setShowMediaInput(false);
      setMediaUrl((u) => ' ');
      //   refs?.current?.focus();
      handleHideSidbarToolbox();
    }, 0);
  };

  const onMediaURLInputKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      confirmMedia();
    }
  };
  const promptForMedia = (type: string) => {
    setShowMediaInput((_s) => true);
    setMediaUrl((_m) => '');
    setMediaUrlType((_t) => type);
    console.log(mediaInputRef, mediaInputRef?.current);
    setTimeout(() => mediaInputRef?.current?.focus(), 0);
  };

  const onMediaURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaUrl(e.target.value);
  };
  const addAudio = () => {
    promptForMedia('audio');
  };

  const addImage = () => {
    promptForMedia('image');
  };

  const addVideo = () => {
    promptForMedia('video');
  };

  return (
    <div
      className={clsx('sidebar-toolbox')}
      style={{
        left: sideTBP.left,
        top: sideTBP?.top
      }}>
      <div className="relative" style={{ zIndex: 10 }}>
        <BiPlusCircle
          onClick={() => setShowMediaOption(true)}
          className={clsx('block-icon')}
          size={30}
        />
        {showMediaOption && (
          <div ref={mediaWrapperRef} className={clsx('sidebar-block-wrapper')}>
            {showMediaInput ? (
              <MediaInputPrompt
                mediaUrl={mediaUrl}
                onURLChange={onMediaURLChange}
                onURLInputKeyDown={onMediaURLInputKeyDown}
                ref={mediaInputRef}
                handleClose={handleHideSidbarToolbox}
                placeholder={getPlaceholder(mediaUrlType)}
              />
            ) : (
              <div className={clsx('block-icon-wrapper')}>
                <MdAudiotrack
                  size={25}
                  className={clsx('block-icon')}
                  onMouseDown={addAudio}
                />
                <MdVideoCameraFront
                  size={25}
                  className={clsx('block-icon')}
                  onMouseDown={addVideo}
                />
                <MdImage
                  size={25}
                  className={clsx('block-icon')}
                  onMouseDown={addImage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarToolbox;
