import { ContentBlock, ContentState, EditorState } from 'draft-js';
import { KeyboardEventHandler, ReactNode } from 'react';

export interface NeutronEditorProps {
    placeholder?: string;
}

export interface LinkProps {
    contentState: ContentState;
    entityKey: string;
    children: ReactNode;
}

export  interface InlineStyleControlsProps {
    editorState: EditorState;
    onToggle: (style: string) => void;
    promptForLink: ()=>void;
    removeLink: ()=>void;
}
export type StyleTypes ={
    label: string;
    style: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface BlockStyleControlsProps {
    editorState: EditorState;
    onToggle: (style: string) => void;
}

export interface HashTagSpanProps {
    [key: string]: any;
    offsetKey: any;
    children: ReactNode;
}
export interface HandleSpanProps {
    [key: string]: any;
    offsetKey: any;
    children: ReactNode;
}

export interface MediaProps{
    contentState: ContentState;
    block: ContentBlock;
  }

export interface MediaInputPropmtProps {
    onURLChange:(e: React.ChangeEvent<HTMLInputElement>) =>void;
    mediaUrl: string;
    onURLInputKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
    handleClose: () => void;
    placeholder?: string;
}