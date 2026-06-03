import ReactPlayer from "react-player";


interface CustomPlayerProps {
  activeVideoKey: string | null;
}
const CustomPlayer: React.FC<CustomPlayerProps> = ({ activeVideoKey }) => {
  if (!activeVideoKey) return null;

  return (
    <ReactPlayer
      slot="media"
      src={`https://youtube.com/watch?v=${activeVideoKey}`}
      controls
      playing
      height="100%"
      width="100%"
    />
  );
};

export default CustomPlayer;
