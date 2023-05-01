const express = require('express');
const app = express();
const notes = [];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
// create a new note
app.post('./public/assets/notes.html', (req, res) => {
  const note = {
    id: notes.length + 1,
    title: req.body.title,
    text: req.body.text
  };
  notes.push(note);
  res.json(note);
});

// retrieve all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// retrieve a specific note
app.get('./public/assets/notes.html:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(note);
});

// update an existing note
app.put('./public/assets/notes.html:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  note.title = req.body.title;
  note.text = req.body.text;
  res.json(note);
});

// delete an existing note
app.delete('./public/assets/notes.html:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  notes.splice(index, 1);
  res.sendStatus(204);
});

app.listen(3001, () => console.log('Note Taker app listening on port 3001!'));
