import { INLINE_STYLES } from './helperFunctions';
import StyledButton from './StyledButton';
import { InlineStyleControlsProps } from './NeutronEditor.types';
import { BiLink, BiUnlink } from 'react-icons/bi';
import clsx from 'clsx';

const InlineStyleControls: React.FC<InlineStyleControlsProps> = ({
  editorState,
  onToggle,
  promptForLink,
  removeLink
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className={clsx('tools-wrapper')}>
      {INLINE_STYLES.map((type) => (
        <StyledButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
      <BiLink onClick={promptForLink} className={clsx('icon')} />

      <BiUnlink className={clsx('icon')} onMouseDown={removeLink} />
    </div>
  );
};

export default InlineStyleControls;
