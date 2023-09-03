const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());
app.use(express.static('public'));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
  if (err) throw  err;
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/canciones', (req, res) => {
  let data = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  data.push(req.body);
  fs.writeFileSync('repertorio.json', JSON.stringify(data), 'utf-8');
  res.json(req.body);
});

app.get('/canciones', (req, res) => {
  let data = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  res.json(data);
});

app.put('/canciones/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  let id = req.params.id;
  let cancion = data.find(cancion => cancion.id == id);
  cancion.titulo = req.body.titulo;
  cancion.artista = req.body.artista;
  cancion.tono = req.body.tono;
  fs.writeFileSync('repertorio.json', JSON.stringify(data), 'utf-8');
  res.json(cancion);
});

app.delete('/canciones/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
  let id = req.params.id;
  let cancion = data.find(cancion => cancion.id == id);
  let index = data.indexOf(cancion);
  data.splice(index, 1);
  fs.writeFileSync('repertorio.json', JSON.stringify(data), 'utf-8');
  res.json(cancion);
});
