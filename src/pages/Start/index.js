import Background from "../../components/Background";
import { Link } from "react-router-dom";
export default function Start() {
  return (
    <div>
      <Background></Background>
      <Link to="/p1selection">
        <button className="startButton">START</button>
      </Link>
    </div>
  );
}
