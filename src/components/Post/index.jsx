import { useEffect, useState } from "react";
import "./style.css";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import BasicTable from "./table";
import SearchIcon from "@mui/icons-material/Search";

export const Post = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState();

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
    try {
      const response = await fetch(
        `http://localhost:8080/post?boardId=${formData?.boardId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

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

  //////get select data
  const [selectData, setSelectData] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-use-before-define
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/board/all");

      if (response.ok) {
        const data = await response.json();
        setSelectData(data || []);
      } else console.error("Error fetching data");
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const [search, setSearch] = useState();

  return (
    <div>
      <div className="board-menu-header">
        <button className="button" onClick={() => setShow(true)}>
          Add Post
        </button>
        {/* ADD DATA MODAL */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header className="modal-css" closeButton>
            <Modal.Title>Add member ship</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-css">
            <form className=" modal-body " onSubmit={handleSubmit}>
              <input
                onChange={handleInputChange}
                value={formData?.writerEmail || ""}
                name="writerEmail"
                className="form_input"
                type="text"
                placeholder="Email"
              />
              <select
                onChange={handleInputChange}
                name="boardId"
                className="form_input"
                type="text"
                placeholder="Board ID"
              >
                <option> Board ID </option>
                {selectData.map(({ clubId = "oo", name = "00" }) => {
                  return (
                    <option value={clubId} key={clubId}>
                      {name}
                    </option>
                  );
                })}
              </select>
              <input
                onChange={handleInputChange}
                value={formData?.title || ""}
                name="title"
                className="form_input"
                type="text"
                placeholder="Title"
              />
              <input
                onChange={handleInputChange}
                value={formData?.contents || ""}
                name="contents"
                className="form_input"
                type="text"
                placeholder="Contents"
              />
              <button className="button" variant="primary">
                Add Post
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
          <input
            className="search_input"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <button className="search_button">
            <SearchIcon />
          </button>
        </div>
      </div>

      <BasicTable boardId={search} update={show} />
    </div>
  );
};

export default Post;
