import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'la@mi@di@190',
    database: 'test'
})

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => (
    res.send("Hello, My People")
))

app.get('/books', (req,res) => {
    const q = 'Select * from books';
    db.query(q, (err,data) => {
        if (err) return res.send(err)
        return res.json(data)
    } )
})

app.get('/books/:id', (req,res) => {
    const bookID = req.params.id;
    const q = `Select * from books where id = ?`;
    db.query(q,[bookID], (err,data) => {
        if (err) return res.send(err)
        return res.json(data)
    } )
})

app.post('/books', (req, res) => {
    const q = 'Insert into books (`title`, `desc`, `cover`, `author`, `price`) values (?)';
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.author,
        req.body.price
    ]
    db.query(q, [values], (err,data) => {
        if (err) return res.json(err);
        return res.json("Book has been created sucessfully")
    })
})

app.delete('/books/:id', (req,res) => {
    const bookID = req.params.id;
    const q = `Delete from books where id = ?`

    db.query(q, [bookID], (err,date) => {
        if (err) return res.json(err);
        return res.json('Book has been deleted successfully')
    })

})

app.put('/books/:id', (req, res) => {
    const bookID = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `author` = ?, `price` = ? WHERE id = ?";

     const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.author,
        req.body.price
    ]
    db.query(q, [...values, bookID], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully");
    });
});

app.listen(8080, () => (
    console.log('App working on localhost:8080')
))