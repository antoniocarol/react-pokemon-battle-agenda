import "./styles.css";
import BackgroundVideo from "../../assets/videoBackground.mp4";

export default function Background() {
  return (
    //VIDEO DE BACKGROUND
    <div className="container">
      <video src={BackgroundVideo} loop autoPlay muted></video>
    </div>
  );
}
