import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  CompositeDecorator,
  getDefaultKeyBinding,
  getVisibleSelectionRect,
  convertToRaw,
  RawDraftContentState,
  convertFromRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { NeutronEditorProps } from './NeutronEditor.types';
import Link from './Link';
import {
  findLinkEntities,
  getTextSelection,
  handleStrategy,
  hashtagStrategy,
  mediaBlockRenderer,
  styleMap
} from './helperFunctions';
import BlockStyleControls from './BlockStyleControls';
import HandleSpan from './HandleSpan';
import HashtagSpan from './HashTagSpan';
import SidebarToolbox from './SidebarToolbox';
import InlineToolbar from './InlineToobar';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './index.css';
import clsx from 'clsx';
const NeutronEditor: React.FC<NeutronEditorProps> = ({
  placeholder = 'Write your story here ...',
  editorContainerClassName
}) => {
  const editorRef = useRef<any>();
  const [showInlineToolbar, setShowInlineToobar] = useState<boolean>(false);
  const [currentToolbarPosition, setCurrentToolbarPosition] = useState<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  } | null>(null);
  const [sideTBP, setSideTBP] = useState<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>({
    top: 100,
    left: -50,
    right: 0,
    bottom: 0
  });
  const [showSidbarToolbox, setShowSideBarToolbox] = useState<boolean>(false);

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link
    },
    {
      strategy: handleStrategy,
      component: HandleSpan
    },
    {
      strategy: hashtagStrategy,
      component: HashtagSpan
    }
  ]);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(decorator)
  );

  // click outside of Editor will close the sidetool bar if opened
  const [editorWrapperRef] = useOnClickOutside(() => {
    if (showSidbarToolbox) handleHideSidbarToolbox();
  });

  // close inline toolbar
  const handleCloseInlineToolbar = () => setShowInlineToobar(false);

  const handleHideSidbarToolbox = () => {
    setShowSideBarToolbox(false);
  };

  const onChange = (newState: EditorState) => {
    // Convert to raw js object
    const raw = convertToRaw(editorState.getCurrentContent());
    // Save raw js object to local storage
    saveEditorContent(raw);
    setEditorState(newState);
  };

  const saveEditorContent = (data: RawDraftContentState) => {
    localStorage.setItem('editorData', JSON.stringify(data));
  };

  const getSavedEditorData = () => {
    const savedData = localStorage.getItem('editorData');

    return savedData ? JSON.parse(savedData) : null;
  };
  // Load editor data (raw js object) from local storage
  useEffect(() => {
    const rawEditorData = getSavedEditorData();
    if (rawEditorData !== null) {
      const contentState = convertFromRaw(rawEditorData);

      // setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  const renderContentAsRawJs = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    return JSON.stringify(raw, null, 2);
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const blockStyleHeight =
      document.querySelector<HTMLElement>('.block-style')?.offsetHeight;
    console.log(blockStyleHeight);
    setSideTBP((p) => ({
      ...p,
      top: e?.target?.clientHeight - (blockStyleHeight || 0) - 2
    }));

    setShowSideBarToolbox(true);
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // handleHideSidbarToolbox();
  };

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const mapKeyToEditorCommand = (e: KeyboardEvent) => {
    if (showInlineToolbar) setShowInlineToobar(false);
    if (showSidbarToolbox) {
      handleHideSidbarToolbox();
    }
    if (e?.keyCode === 13) {
      setShowSideBarToolbox(true);
      const target = e?.target as HTMLInputElement;
      setSideTBP((p) => ({
        ...p,
        top: target?.clientHeight
      }));
    }
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
        return 'handled';
      }
      return 'not-handled';
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  // Positioning the inline toolbar
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const text = getTextSelection(contentState, selection);

  useEffect(() => {
    if (text) {
      let position = getVisibleSelectionRect(window);
      setCurrentToolbarPosition({
        left: position?.left - 50,
        right: position?.right,
        top: position?.top + 10,
        bottom: position?.bottom
      });
      setShowInlineToobar(true);
    }
  }, [text]);

  return (
    <div
      ref={editorWrapperRef}
      className={clsx('editor-container', editorContainerClassName)}>
      <div className="block-style">
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>
      <div className={clsx('editor-wrapper')}>
        <Editor
          onFocus={onFocus}
          onBlur={onBlur}
          blockRendererFn={mediaBlockRenderer}
          placeholder={placeholder}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          spellCheck={true}
          customStyleMap={styleMap}
          autoCapitalize="sentences"
          autoCorrect="on"
          ref={editorRef}
        />
        {showSidbarToolbox && (
          <SidebarToolbox
            editorState={editorState}
            handleHideSidbarToolbox={handleHideSidbarToolbox}
            onChange={onChange}
            sideTBP={sideTBP}
          />
        )}
        {currentToolbarPosition && showInlineToolbar && (
          <InlineToolbar
            handleCloseInlineToolbar={handleCloseInlineToolbar}
            position={currentToolbarPosition}
            editorState={editorState}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

export default NeutronEditor;
