import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useSnackbar } from "notistack";
import '../style.css'
import BackButton from '../components/BackButton';

const DeleteBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert('An error happened. Please check the console.');
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8080/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully', {variant: 'success'})
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('An error has occurred', {variant: 'error'})
      });
  };

  // console.log(book[0].title)
  return (
    <div className="deletepage">
      <BackButton/>
      <h1 className="">Delete Book</h1>
      {loading ? (
        <div className="">
          <Spinner />
        </div>
      ) : null}
      {book && (
        <div className="deletebox">
          <p>
            Are you sure you want to delete the book <strong>{book[0].title}</strong> by {book[0].author}?
          </p>
          <div className="flex">
            <button className="" onClick={handleDeleteBook}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteBook