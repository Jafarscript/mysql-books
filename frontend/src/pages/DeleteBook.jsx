import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/property/${id}`)
      .then((response) => {
        setProperty(response.data[0]);
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
      .delete(`http://localhost:8080/property/${id}`)
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
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? (
        <div className="flex justify-center items-center mt-2">
          <Spinner />
        </div>
      ) : null}
      {property && (
        <div className="border-2 border-sky-400 rounded-xl p-4">
          <p>
            Are you sure you want to delete the property <strong>{property.Label}</strong> by {property.Agent}?
          </p>
          <div className="flex mt-4">
            <button className="p-2 bg-red-600 text-white" onClick={handleDeleteBook}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteBook