/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const UpdateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');


  // const [book, setBook] = useState({
  //   title: "",
  //   desc: "",
  //   cover: "",
  //   author: "",
  //   price: null,
  // });
  const [loading, setLoading] = useState(false);

  const {id} = useParams()

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/books/${id}`)
    .then((response) => {
      setAuthor(response.data[0].author);
      setTitle(response.data[0].title);
      setCover(response.data[0].cover);
      setPrice(response.data[0].price);
      setDesc(response.data[0].desc)
      setLoading(false)
    })
    .catch((error) => {
      alert('An error happened. Please Check Console')
      console.log(error)
      setLoading(false);
    })
  }, [id])

  // const handleEdit = (e) => {
  //   setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // eslint-disable-next-line no-unused-vars
  // const handleClick = async (e) => {
  //   try {
  //     await axios.put(`http://localhost:8080/books/${id}`, book);
  //     setLoading(true);
  //     enqueueSnackbar("Book Updated Successfully", { variant: "success" });
  //     navigate("/");
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     enqueueSnackbar("An error has occurred", { variant: "error" });
  //   }
  // };

  const handleEditBook = () =>{
    const body = {
      title,
      desc,
      cover,
      author,
      price
    }
    setLoading(true);
    axios
    .put(`http://localhost:8080/books/${id}`, body)
    .then(() => {
      setLoading(true)
      enqueueSnackbar('Book Updated Successfully', {variant: 'success'})
      navigate('/')
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)
      enqueueSnackbar('An error has occurred', {variant: 'error'})
    })
  }

  return (
    <section>
      <BackButton />
      <h1>Edit Book</h1>    
      <div className="form">
      { loading ? <Spinner /> : ''}
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="">Book Cover URL</label>
          <input
            type="text"
            placeholder="cover"
            onChange={(e) => setCover(e.target.value)}
            name="cover"
            value={cover}
          />
        </div>
        <div>
          <label htmlFor="">Author's name</label>
          <input
            type="text"
            placeholder="author"
            onChange={(e) => setAuthor(e.target.value)}
            name="author"
            value={author}
          />
        </div>
        <div>
          <label htmlFor="">Book Price</label>
          <input
            type="number"
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            value={price}
          />
        </div>
        <div>
          <label htmlFor="">Book Description</label>
          <textarea
            type="text"
            placeholder="desc"
            onChange={(e) => setDesc(e.target.value)}
            name="desc"
            value={desc}
          />
        </div>
        <button onClick={handleEditBook}>Update</button>
      </div>
    </section>
  );
};

export default UpdateBook;
