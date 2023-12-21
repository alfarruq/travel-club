import { Route, Routes } from "react-router-dom";
import "./style.css";
import { home_path } from "../../utils/paths";

export const Home = () => {
  return (
    <div className="home">
      <Routes>
        {home_path.map(({ id, Element, path }) => {
          return <Route key={id} path={path} element={Element} />;
        })}
      </Routes>
    </div>
  );
};

export default Home;
