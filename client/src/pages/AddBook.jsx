/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    cover: "",
    author: "",
    price: null,
  });
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // eslint-disable-next-line no-unused-vars
  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:8080/books", book);
      setLoading(false);
      enqueueSnackbar("Book Created Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      enqueueSnackbar("An error has occurred", { variant: "error" });
    }
  };

  return (
    <section>
      <BackButton />
      <h1>Add New Book</h1>
      {loading && <Spinner />}
      <div className="form">
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Book Cover URL</label>
          <input
            type="text"
            placeholder="cover"
            onChange={handleChange}
            name="cover"
          />
        </div>
        <div>
          <label htmlFor="">Author's name</label>
          <input
            type="text"
            placeholder="author"
            onChange={handleChange}
            name="author"
          />
        </div>
        <div>
          <label htmlFor="">Book Price</label>
          <input
            type="number"
            placeholder="price"
            onChange={handleChange}
            name="price"
          />
        </div>
        <div>
          <label htmlFor="">Book Description</label>
          <textarea
            type="text"
            placeholder="desc"
            onChange={handleChange}
            name="desc"
          />
        </div>
        <button onClick={handleClick}>Create</button>
      </div>
    </section>
  );
};

export default AddBook;
