console.log('Hello from client.js');

function getArtists() {
  axios({
    method: 'GET',
    url: '/artist',
  })
    .then(function (response) {
      // Code that will run on successful response
      // from the server.
      console.log(response);
      // quotesFromServer will be an Array of quotes
      let artistFromServer = response.data;
      console.log(artistFromServer);

      //append artist to the DOM
      document.getElementById('submitForm').reset();
      //variable HTML element to target
      let contentDiv = document.querySelector('#artistTableBody');
      // clear out fields
      contentDiv.innerHTML = '';
      //loop over response array
      for (let artist of artistFromServer) {
        contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
      }
    })
    .catch(function (error) {
      // Code that will run on any errors from the server.
      console.log(error);
      alert('Something bad happened! Check the console for more details.');
    });

  // TODO Add Axios request for /songs and display on DOM
}

getArtists();

function getSongs() {
  axios({
    method: 'GET',
    url: '/song',
  })
    .then(function (response) {
      // Code that will run on successful response
      // from the server.
      console.log(response);

      // quotesFromServer will be an Array of quotes
      let songsFromServer = response.data;
      let contentDiv = document.querySelector('#songTableBody');
      document.getElementById('submitSongForm').reset();
      contentDiv.innerHTML = '';
      for (let songs of songsFromServer) {
        contentDiv.innerHTML += `
            <tr>
                <td>${songs.title}</td>
                <td>${songs.artist}</td>
                
            </tr>
        `;
      }
    })
    .catch(function (error) {
      // Code that will run on any errors from the server.
      console.log(error);
      alert('Something bad happened! Check the console for more details.');
    });
}

getSongs();

//function to handle when the form is submitted
function submitForm(event) {
  //prevent page from refreshing
  event.preventDefault();
  console.log('in submitForm');
  // get values from inputs
  let name = document.querySelector('#artistInput').value;
  let born = document.querySelector('#bornInput').value;
  let died = document.querySelector('#diedInput').value;
  console.log('inputs', name, born, died);
  // package up or data to send to the server
  let artistForServer = {
    name: name,
    born: born,
    died: died,
  };

  // post request to the server
  // post request need to parameters: url + data we're sending
  // common to reuse routes for similar requests
  axios
    .post('/artist', artistForServer)
    .then((response) => {
      console.log(response);
      // Once new quote has been added call getQuotes to get all of our quotes
      getArtists();
    })
    .catch((error) => {
      console.log(error);
    });
}

function submitSongForm(event) {
  event.preventDefault();
  console.log('in submitSongForm');

  let title = document.querySelector('#titleInput').value;
  let artist = document.querySelector('#artistSongInput').value;
  console.log('inputs', title, artist);

  let songsForServer = {
    title: title,
    artist: artist,
  };
  axios
    .post('/songs', songsForServer)
    .then((response) => {
      console.log(response);
      getSongs();
    })
    .catch((error) => {
      console.log(error);
    });
}
