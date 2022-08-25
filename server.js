const express = require('express');
const uuidv1 = require('uuid');
const path = require('path');
const fs = require('fs');
const { json } = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

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
    fs.readFile('./db/db.json', 'utf8', (err, data) =>{
        if(err) {
            console.log(err)
        } else {
            const allNotes = JSON.parse(data)
            const newNote = req.body
            newNote.id = uuidv1()
            allNotes.push(newNote)
            
            fs.writeFile('./db/db.json', JSON.stringify(allNotes), (err) =>
            err
                ? console.log(err)
                : console.log("Your note has been saved!")
            )
        res.json("New note has been added to db.json")
        }
    })
})

app.delete('/api/notes/:id', (req, res) => {
    let noteToDelete = req.params.id
    fs.readFile('./db/db.json', 'utf8', (err, data) =>{
        if(err) {
            console.log(err)
        } else {
            const dbJson = JSON.parse(data)
            for (let i = 0; i < dbJson.length; i++) {
                if (dbJson[i].id === noteToDelete) {
                    dbJson.splice(i, 1);
                    fs.writeFile('./db/db.json', JSON.stringify(dbJson), (err) =>
            err
                ? console.log(err)
                : console.log("Your note was successfully deleted!")
                )
                }
            }
            res.send("Note successfully deleted")
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})


//uuid