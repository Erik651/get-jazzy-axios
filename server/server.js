const express = require('express');
const app = express();

app.use(express.json());

const PORT = 5001;

const artistListArray = [
  {
    name: 'Miles Davis',
    born: 1926,
    died: 1990,
  },
  {
    name: 'Duke Ellington',
    born: 1899,
    died: 1974,
  },
  {
    name: 'John Coltrane',
    born: 1926,
    died: 1987,
  },
  {
    name: 'Louis Daniel Armstrong',
    born: 1901,
    died: 1971,
  },
];

const songListArray = [
  {
    title: 'Take Five',
    artist: 'The Dave Brubeck Quartet',
  },
  {
    title: 'So What',
    artist: 'Miles Davis',
  },
  {
    title: 'Sing Sing Sing',
    artist: 'Benny Goodman',
  },
  {
    title: 'Take the "A" Train',
    artist: 'The Dave Brubeck Quartet',
  },
];

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
