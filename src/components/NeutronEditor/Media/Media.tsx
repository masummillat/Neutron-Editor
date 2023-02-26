import { MediaProps } from '../NeutronEditor.types';
import Audio from './Audio';
import Image from './Image';
import Video from './Video';

const Media: React.FC<MediaProps> = ({ contentState, block, ...rest }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  switch (type) {
    case 'audio':
      return <Audio src={src} />;
    case 'image':
      return <Image src={src} />;
    case 'video':
      return <Video src={src} />;
    default:
      return null;
  }
};
export default Media;
