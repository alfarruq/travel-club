import React, { useState } from "react";
import "../BoardMenu/style.css";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import SearchIcon from "@mui/icons-material/Search";
import ClubTable from "./table";


export const ClubMenu = () => {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState();
  // Inputlarga kiritish o'zgarishlarini qabul qilish uchun funksiya
  const handleInputChange = (e) => {
    // Holatni yangi kiritilgan qiymat bilan yangilash
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  POST DATA datalarni serverga yuborish  uchun funksiya
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/club/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
      } else {
        const errorData = await response.json();
        alert(`${errorData?.message}`);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setShow(false);
    setFormData();
  };
  //// SEARCH DATA
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const handleSubmitSearch = (e) => {
    e.preventDefault()
    setSearchUrl(searchTerm)

  };

  return (
    <div>
      <div className="board-menu-header">
        <button className="button" onClick={() => setShow(true)}>
          Add club
        </button>
        {/* ADD DATA MODAL */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header className="modal-css" closeButton>
            <Modal.Title>Add club</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-css">
            <form className=" modal-body " onSubmit={handleSubmit}>
              <input
                onChange={handleInputChange}
                name="intro"
                className="form_input"
                type="text"
                placeholder="intro"
              />
              <input
                onChange={handleInputChange}
                name="name"
                className="form_input"
                type="text"
                placeholder="name"
              />
              <button className="button" variant="primary">
                Add Club
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
          <form action="" onSubmit={handleSubmitSearch}>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search_input"
              type="text"
              placeholder="Search"
            />
            <button type="submit" className="search_button">
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
      <ClubTable update={show} search={searchUrl} />
    </div>
  );
};

export default ClubMenu;
