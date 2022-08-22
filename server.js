const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) =>{
        if(err) {
            console.log(err)
        } else {
            const allNotes = JSON.parse(data)
            res.json(allNotes)
        }
    })
})

app.post('/api/notes', (req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})