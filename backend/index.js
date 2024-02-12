import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'la@mi@di@190',
    database: 'ridwan'
})

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => (
    res.send("Hello, My People")
))

app.get('/property', (req,res) => {
    const q = 'Select * from property';
    db.query(q, (err,data) => {
        if (err) return res.send(err)
        return res.json(data)
    } )
})

app.get('/property/:id', (req,res) => {
    const bookID = req.params.id;
    const q = `Select * from property where id = ?`;
    db.query(q,[bookID], (err,data) => {
        if (err) return res.send(err)
        return res.json(data)
    } )
})

app.post('/property', (req, res) => {
    const q = 'Insert into property (`label`, `category`, `Market`, `Neighbourhood`, `Agent`, `Picture`, `Price`, `Year`) values (?)';
    const values = [
        req.body.label,
        req.body.category,
        req.body.market,
        req.body.neighbourhood,
        req.body.agent,
        req.body.picture,
        req.body.price,
        req.body.year
    ]
    db.query(q, [values], (err,data) => {
        if (err) return res.json(err);
        return res.json("Property has been created sucessfully")
    })
})

app.delete('/property/:id', (req,res) => {
    const propertyID = req.params.id;
    const q = `Delete from property where id = ?`

    db.query(q, [propertyID], (err,date) => {
        if (err) return res.json(err);
        return res.json('Property has been deleted successfully')
    })

})

app.put('/property/:id', (req, res) => {
    const propertyID = req.params.id;
    const q = "UPDATE property SET `label` = ?, `category` = ?, `Market` = ?, `Neighbourhood` = ?, `Agent` = ?,  `Picture` = ?, `Price` = ?, `Year` = ? WHERE id = ?";

    const values = [
        req.body.label,
        req.body.category,
        req.body.market,
        req.body.neighbourhood,
        req.body.agent,
        req.body.picture,
        req.body.price,
        req.body.year
    ]
    db.query(q, [...values, propertyID], (err, data) => {
        if (err) return res.json(err);
        return res.json("Property has been updated successfully");
    });
});

app.listen(8080, () => (
    console.log('App working on localhost:8080')
))