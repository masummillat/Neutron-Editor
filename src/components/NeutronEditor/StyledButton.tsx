import clsx from 'clsx';
import React from 'react';

interface StyledButtonProps {
  active: boolean;
  label: string;
  onToggle: (style: string) => void;
  style: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}
const StyledButton: React.FC<StyledButtonProps> = ({
  active,
  label,
  onToggle,
  style,
  icon: Icon
}) => {
  const handleToggle = () => {
    onToggle(style);
  };
  return (
    <span
      onMouseDown={handleToggle}
      className={clsx(
        'inline-block cursor-pointer h-full',
        active && 'text-purple-700'
      )}
      style={{ color: active ? 'purple' : 'black' }}>
      {Icon ? (
        <Icon
          className={clsx(active && 'text-purple-700', ' inline-block')}
          fill={active ? 'purple' : 'white'}
        />
      ) : (
        label
      )}
    </span>
  );
};

export default StyledButton;
