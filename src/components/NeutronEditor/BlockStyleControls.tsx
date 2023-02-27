import clsx from 'clsx';
import { BLOCK_TYPES } from './helperFunctions';
import { BlockStyleControlsProps } from './NeutronEditor.types';
import StyledButton from './StyledButton';

const BlockStyleControls: React.FC<BlockStyleControlsProps> = ({
  editorState,
  onToggle
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={clsx('block-style-button-container')}>
      {BLOCK_TYPES.map((type) => (
        <StyledButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;
