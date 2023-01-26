import "./styles.css";
import BackgroundVideo from "../../assets/videoBackground.mp4";

export default function Background() {
  return (
    <div className="container">
      <video src={BackgroundVideo} loop autoPlay muted></video>
    </div>
  );
}
