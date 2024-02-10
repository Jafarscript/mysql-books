import { useEffect, useState } from "react"
import axios from 'axios'
import Spinner from "../components/Spinner"
import { Link } from "react-router-dom"
import '../style.css'

const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get('http://localhost:8080/books')
                setBooks(res.data)
                setLoading(false);
            }catch(err){
                console.log(err)
                setLoading(false);
            }
        }
        fetchAllBooks()
    }, [])

    // const handleDelete = async (id) => {
    //     try{
    //         await axios.delete('http://localhost:8080/books/'+id)
    //         window.location.reload()
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    
  return (
    <div className="home">
        <h1>Lama Book Shop</h1>
        {loading ? (
        <div className="">
          <Spinner />
        </div>
      ) : null}
        <div className="books">
            {books.map(book => (
                <div className="book" key={book.id}>
                    {book.cover && <img src={book.cover} alt='' className="image"/>}
                    <h2>{book.title}</h2>
                    <h4>{book.author}</h4>
                    <h5>${book.price}</h5>
                    <Link to={`/books/delete/${book.id}`} className="delete">Delete</Link>
                    <Link to={`/books/edit/${book.id}`}className="update">Update</Link>
                </div>
            ))}
        </div>
        <button className="new"><Link to='/books/create' className="newLink">Add New</Link></button>
    </div>
  )
}

export default Home