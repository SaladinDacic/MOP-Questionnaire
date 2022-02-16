import "./Landing.scss";
import { Link } from "react-router-dom";
interface LandingProps {
  listMops: JSX.Element;
}
export const Landing = ({ listMops }: LandingProps) => {
  return (
    <div className="Landing">
      <Link to={"/add"}>Add new Mop</Link>
      {listMops}
    </div>
  );
};
