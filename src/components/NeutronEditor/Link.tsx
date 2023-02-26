import { LinkProps } from './NeutronEditor.types';

const Link: React.FC<LinkProps> = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a
      title={url}
      style={{
        color: '#3b5998',
        textDecoration: 'underline'
      }}
      href={url}>
      {children}
    </a>
  );
};

export default Link;
