import { useEffect, useState } from "react";
import "./style.css";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import BasicTable from "./table";
import SearchIcon from "@mui/icons-material/Search";

export const MemberMenu = () => {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState();

  // Inputlarga kiritish o'zgarishlarini qabul qilish uchun funksiya
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  POST DATA
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
      } else console.error("Error sending data");
    } catch (error) {
      console.error("Network error:", error);
    }
    setShow(false);
    setFormData();
  };

  //////get select data
  const [selectData, setSelectData] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-use-before-define
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/club/findAll");

      if (response.ok) {
        const data = await response.json();
        setSelectData(data || []);
      } else console.error("Error fetching data");
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div>
      <div className="board-menu-header">
        <button className="button" onClick={() => setShow(true)}>
          Add board
        </button>
        {/* ADD DATA MODAL */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header className="modal-css" closeButton>
            <Modal.Title>Add board</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-css">
            <form className=" modal-body " onSubmit={handleSubmit}>
              <select
                onChange={handleInputChange}
                name="clubId"
                className="form_input"
                type="text"
                placeholder="Club ID"
              >
                <option> Club ID </option>
                {selectData.map(({ usid = "oo", name = "00" }) => {
                  return (
                    <option value={usid} key={usid}>
                      {name}
                    </option>
                  );
                })}
              </select>
              <input
                onChange={handleInputChange}
                value={formData?.name || ""}
                name="name"
                className="form_input"
                type="text"
                placeholder="Board name"
              />
              <input
                onChange={handleInputChange}
                value={formData?.adminEmail || ""}
                name="adminEmail"
                className="form_input"
                type="text"
                placeholder="Admin email"
              />
              <button className="button" variant="primary">
                Add Board
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer className="modal-css">
            <button
              className="button"
              variant="secondary"
              onClick={() => setShow(false)}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>

        <div className="wrapper_input">
          <input className="search_input" type="text" placeholder="Search" />
          <button className="search_button">
            <SearchIcon />
          </button>
        </div>
      </div>

      <BasicTable update={show} />
    </div>
  );
};

export default MemberMenu;
