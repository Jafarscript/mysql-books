import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import DeleteBook from './pages/DeleteBook'
import UpdateBook from './pages/UpdateBook'
import ShowBook from './pages/ShowBook'
import './style.css'

const App = () => {
  return (
    <div className='app'>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create/' element={<AddBook /> } />
      <Route path='/books/details/:id' element={<ShowBook /> } />
      <Route path='/books/delete/:id' element={<DeleteBook /> } />
      <Route path='/books/edit/:id' element={<UpdateBook /> } />
      </Routes>
    </div>
  )
}

export default App