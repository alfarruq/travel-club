import { useEffect, useState } from "react";
import "./style.css";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import BasicTable from "./table";
// import SearchIcon from "@mui/icons-material/Search";

export const MemberShipMenu = () => {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  const [formData, setFormData] = useState();
  ///// get for select club id ////////////
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

  // Inputlarga kiritish o'zgarishlarini qabul qilish uchun funksiya
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //  POST DATA datalarni serverga yuborish  uchun funksiya
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Forma ma'lumotlarini qanday qilib ishlatish (masalan, ulani serverga yuborish)
    try {
      const response = await fetch("http://localhost:8080/club", {
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
  console.log(selectData[index]?.membershipList);
  return (
    <div>
      <div className="board-menu-header">
        <button className="button" onClick={() => setShow(true)}>
          Add membership
        </button>
        {/* ADD DATA MODAL */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header className="modal-css" closeButton>
            <Modal.Title>Add member ship</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-css">
            <form className=" modal-body " onSubmit={handleSubmit}>
              <select
                onChange={handleInputChange}
                name="clubId"
                className="form_input"
                type="text"
                placeholder="Select"
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
                value={formData?.memberEmail || ""}
                name="memberEmail"
                className="form_input"
                type="text"
                placeholder="Email"
              />
              <input
                onChange={handleInputChange}
                value={formData?.memberName || ""}
                name="memberName"
                className="form_input"
                type="text"
                placeholder="Name"
              />
              <select
                onChange={handleInputChange}
                value={formData?.role || ""}
                name="role"
                className="form_input"
                type="text"
                placeholder="Role"
              >
                <option value=""> Role </option>
                <option value="PRESIDENT"> PRESIDENT </option>
                <option value="MEMBER"> MEMBER </option>
              </select>
              <button className="button" variant="primary">
                Add Member Ship
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
        <select
          style={{ minWidth: "250px" }}
          className="modal-css"
          onChange={(e) => setIndex(e.target.value)}
        >
          <option value="">Search member with Club</option>

          {selectData.map(({ usid = 1, name = "name" }, index) => {
            return (
              <option value={index} key={usid}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <BasicTable
        dataMembers={selectData[index]?.membershipList.length !== 0 ? selectData[index]?.membershipList : null}
      />
    </div>
  );
};

export default MemberShipMenu;
