const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/', (req, res) => {
  res.send('hello world post');
});

app.put('/', (req, res) => {
  res.send('hello world put');
});

app.delete('/', (req, res) => {
  res.send('hello world DEL');
});

app.get('/id/:id', (req, res) => {
  res.send(`Page for id ${req.params.id}`);
});

app.get('/getNote', (req, res) => {
  fs.readFile('./testFile.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    res.send(jsonData);
  });
});

app.post('/updateNote/:note', (req, res) => {
  fs.readFile('./testFile.json', 'utf-8', (err, data) => {
    if (err) throw err;
    let jsonData = JSON.parse(data);
    jsonData.newNote = req.params.note;
    fs.writeFile('./testFile.json', JSON.stringify(jsonData), err => {
      if (err) throw err;
      res.send('file updated');
    });
  });
});

app.use((req, res) => res.status(404).send('page not found'));

app.listen(port, () => console.log(`The server is running on port ${port}`));
