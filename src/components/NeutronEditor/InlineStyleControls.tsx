import { INLINE_STYLES } from './helperFunctions';
import StyledButton from './StyledButton';
import { InlineStyleControlsProps } from './NeutronEditor.types';
import { BiLink, BiUnlink } from 'react-icons/bi';

const InlineStyleControls: React.FC<InlineStyleControlsProps> = ({
  editorState,
  onToggle,
  promptForLink,
  removeLink
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  console.log(editorState.getSelection());
  return (
    <div className="flex gap-2 items-center justify-center p-1 h-full">
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
      <BiLink
        onClick={promptForLink}
        className="align-baseline inline-block cursor-pointer"
        fill="#ffffff"
        color="red"
      />

      <BiUnlink className="cursor-pointer" onMouseDown={removeLink} />
    </div>
  );
};

export default InlineStyleControls;
