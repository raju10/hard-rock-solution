function displayInput(){
  const searchInput = document.getElementById("search-input").value;
  
  const url =`https://api.lyrics.ovh/suggest/${searchInput}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
      getDisplaySong(data.data)
  })
  .catch(error => grtError("Something wrong !! please try again letter !!"))
}
function grtError(error){
    const erroeMassege = document.getElementById("erroeMassege")
    
    erroeMassege.innerText = error
   
}
function getDisplaySong(song){

    const songDiv = document.getElementById("song-div");
    songDiv.innerHTML = ""
  for(let i = 0; i< song.length; i++){
      const songs = song[i]
      const songSingleDiv = document.createElement("div");
      songSingleDiv.className = "single-result row align-items-center my-3 p-3";
      songSingleDiv.innerHTML = `
      <div class="col-md-9">
        <h3 class="lyrics-name">${songs.title}</h3>
        <p class="author lead">${songs.link}</p>
        <audio controls>
            <source src="${songs.preview}" type="audio/ogg">
        </audio>
     </div>
     <div class="col-md-3 text-md-right text-center">
        <button  onclick = "getLerycs('${songs.artist.name}','${songs.title}')"  class='btn btn-success'>Get Lyrics</button>
     </div>
      
      `
      console.log(songs)
      songDiv.appendChild(songSingleDiv)
  }
}

function getLerycs(artist,title){
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    displayLyrics(data.lyrics)
  })
 
  
}

function displayLyrics(lyrics){
   const displayLyricsDiv = document.getElementById("display-lyrics-div");
   displayLyricsDiv.style.display = "block"
   
    const lyricsDisplay = document.getElementById("display-lyrics");
    lyricsDisplay.innerText = ""
    lyricsDisplay.innerText = lyrics
  
   
}