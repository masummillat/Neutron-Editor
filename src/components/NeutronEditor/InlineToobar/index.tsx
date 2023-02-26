import { EditorState, RichUtils } from 'draft-js';
import React, { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import InlineStyleControls from '../InlineStyleControls';

interface InlineToolbarProps {
  editorState: EditorState;
  position: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  handleCloseInlineToolbar: () => void;
  onChange: (editorState: EditorState) => void;
}
const InlineToolbar: React.FC<InlineToolbarProps> = ({
  editorState,
  handleCloseInlineToolbar,
  position,
  onChange
}) => {
  const [clickOutSideRef] = useOnClickOutside(() => handleCloseInlineToolbar());
  const [showURLInput, setShowURLInput] = useState<boolean>(false);
  const [urlValue, setUrlValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const _promptForLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      setShowURLInput((s) => true);
      setUrlValue((u) => url);
      setTimeout(() => inputRef?.current?.focus(), 0);
    }
  };

  const onURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  };

  const confirmLink = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    onChange(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
    setTimeout(() => {
      setShowURLInput((s) => false);
      setUrlValue((u) => '');
    }, 0);
  };

  const onLinkInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.keyCode === 13) {
      confirmLink();
    }
  };
  const removeLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
    }
    handleCloseInlineToolbar();
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <div
      ref={clickOutSideRef}
      className="absolute"
      style={{
        top: position?.top - 100,
        left: position?.left,
        zIndex: 1
      }}>
      <div className={'bg-stone-900 text-white p-2 rounded-full '}>
        {showURLInput ? (
          <div className="flex gap-2 items-center">
            <input
              className="bg-stone-900 border-0 outline-none"
              onChange={onURLChange}
              type="text"
              value={urlValue}
              onKeyDown={onLinkInputKeyDown}
              ref={inputRef}
              placeholder="Paste or type link here ..."
            />
            <AiOutlineClose
              className="cursor-pointer"
              onClick={handleCloseInlineToolbar}
            />
          </div>
        ) : (
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
            promptForLink={_promptForLink}
            removeLink={removeLink}
          />
        )}
      </div>
    </div>
  );
};

export default InlineToolbar;
