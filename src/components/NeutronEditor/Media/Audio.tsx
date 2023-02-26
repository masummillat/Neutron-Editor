const Audio: React.FC<{ src: string }> = ({ src }) => {
  return (
    <audio
      controls
      src={src}
      style={{
        width: '100%',
        whiteSpace: 'initial'
      }}
    />
  );
};

export default Audio;
