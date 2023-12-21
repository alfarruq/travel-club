import Home from "../components/Home";
import Sidebar from "../components/Sidebar";
import './style.css'


const Root = () => {
  return (
    <div className="container  main ">
      <Sidebar />
      <Home />
    </div>
  );
};

export default Root;
