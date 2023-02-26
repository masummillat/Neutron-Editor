import {ContentBlock, ContentState, SelectionState} from 'draft-js';
import { StyleTypes } from './NeutronEditor.types';
import Media from './Media/Media';
import { BiBold, BiCodeCurly, BiItalic, BiUnderline } from 'react-icons/bi';

export const BLOCK_TYPES: StyleTypes[] = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

export const INLINE_STYLES: StyleTypes[] = [
  {label: 'Bold', style: 'BOLD', icon: BiBold},
  {label: 'Italic', style: 'ITALIC', icon: BiItalic},
  {label: 'Underline', style: 'UNDERLINE', icon: BiUnderline},
  {label: 'Monospace', style: 'CODE', icon: BiCodeCurly},
];

// Custom overrides for "code" style.
export const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: '2px 12px',
    borderRadius: '9999px',
  },
};

export const  findLinkEntities = (contentBlock: ContentBlock, callback:(start: number, end: number) => void, contentState: ContentState) =>  {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }

  export  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

 /**
       * Super simple decorators for handles and hashtags, for demonstration
       * purposes only. Don't reuse these regexes.
       */
 const HANDLE_REGEX = /@[\w]+/g;
 const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g;

export const handleStrategy = (contentBlock: ContentBlock, callback:(start: number, end: number) => void, contentState: ContentState) => {
   findWithRegex(HANDLE_REGEX, contentBlock, callback);
 }

export const  hashtagStrategy = (contentBlock: ContentBlock, callback:(start: number, end: number) => void, contentState: ContentState)=> {
   findWithRegex(HASHTAG_REGEX, contentBlock, callback);
 }

export function findWithRegex(regex: RegExp, contentBlock: ContentBlock, callback: (start: number, end: number) => void) {
   const text = contentBlock.getText();
   let matchArr, start;
   while ((matchArr = regex.exec(text)) !== null) {
     start = matchArr.index;
     callback(start, start + matchArr[0].length);
   }
 }


 export function getTextSelection(contentState: ContentState, selection: SelectionState, blockDelimiter?: string) {
  blockDelimiter = blockDelimiter || '\n';
  var startKey   = selection.getStartKey();
  var endKey     = selection.getEndKey();
  var blocks     = contentState.getBlockMap();

  var lastWasEnd = false;
  var selectedBlock = blocks
      .skipUntil(function(block) {
          return block?.getKey() === startKey;
      })
      .takeUntil(function(block) {
          var result = lastWasEnd;

          if (block?.getKey() === endKey) {
              lastWasEnd = true;
          }

          return result;
      });

  return selectedBlock
      .map(function(block) {
          var key = block?.getKey();
          var text = block?.getText();

          var start = 0;
          var end = text?.length;

          if (key === startKey) {
              start = selection.getStartOffset();
          }
          if (key === endKey) {
              end = selection.getEndOffset();
          }

          text = text?.slice(start, end);
          return text;
      })
      .join(blockDelimiter);
}

export function mediaBlockRenderer(block: ContentBlock) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}