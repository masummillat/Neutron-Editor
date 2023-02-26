const Video: React.FC<{ src: string }> = ({ src }) => {
  return (
    <video
      controls
      autoPlay
      src={src}
      style={{
        width: '100%',
        whiteSpace: 'initial'
      }}
    />
  );
};

export default Video;
