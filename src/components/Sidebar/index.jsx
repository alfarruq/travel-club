import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { home_path } from "../../utils/paths";

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h3 className="logo" onClick={() => navigate("/")}>
        Travel Club
      </h3>
      <div className="menu">
        {home_path.map(({ id, path, name }) => {
          return (
            <div key={id}  className="menu-button" onClick={()=>navigate(path)} >
              <NavLink
                to={path}
                className={({ isActive }) =>
                   isActive ? "active menu-button" : "link menu-button"
                }
              >
                {name}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
