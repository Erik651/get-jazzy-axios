const express = require('express');
const app = express();
const artistListArray = require('./artist.js');
const songListArray = require('./songs.js');
const albumsArray = require('./albums.js');

app.use(express.json());

const PORT = 5001;

app.use(express.static('server/public'));

app.get('/artist', (req, res) => {
  res.send(artistListArray);
  console.log('in GET /artist');
});

// TODO - Add GET for songs
app.get('/song', (req, res) => {
  res.send(songListArray);
  console.log('in GET /songs');
});

app.get('/album', (req, res) => {
  res.send(albumsArray);
  console.log('in GET /albums');
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

// Post request - adds data

app.post('/artist', (req, res) => {
  console.log('Post request made for /artist');
  // we want to see what our request looks like
  // req.body is always what we sent
  console.log(req.body);

  // add new quote to quote array
  artistListArray.push(req.body);
  // send a 201 response status
  // we use sendStatus when we send back a response code
  res.sendStatus(201);
});

app.post('/songs', (req, res) => {
  console.log('Post request made for /songs');
  console.log(req.body);

  songListArray.push(req.body);
  res.sendStatus(201);
});

app.post('/albums', (req, res) => {
  console.log('Post request made for /albums');
  console.log(req.body);

  albumsArray.push(req.body);
  res.sendStatus(201);
});
