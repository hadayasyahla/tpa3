let search = document.querySelector("#input");
let listData = document.getElementById("list-data");
let listSearch = document.getElementById("list-cari");
let namaJudul = document.getElementById("namaJudul");


let getMoviePopular = async () => {
  let response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=052dc755cd87928bc3c80c59b55a6250&sort_by=popularity.desc&page=1"
  );
  let viewMovie = await response.json();
  let resultData = viewMovie.results;
  resultData.slice(0, 10).forEach((item) => {
    listData.innerHTML += `<div class="card" style="width: 18rem;">
            <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" class="card-img-top" alt="poster.film ${item.tittle}">
            <div class="card-body">
                <div class="title">
                    <h5 class="card-title">${item.title}</h5>
                    <h5 class="card-text">${item.vote_average}</h5>
                </div>
                <p class="card-text">${item.release_date}</p>
            </div>
        </div>`;
  });
};
getMoviePopular();

async function searchMovieData(query) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=052dc755cd87928bc3c80c59b55a6250&query=${query}&page=1`
  );
  let dataCariMovie = await response.json();
  console.log(dataCariMovie);
  listData.remove();
  namaJudul.innerText = `hasil pencarian anda`;

  let resultData = dataCariMovie.results;
  console.log(resultData);
  const listContent = document.getElementById("list-cari");
  while (listContent.hasChildNodes()) {
    listContent.removeChild(listContent.firstChild);
  }
  
  resultData.slice(0, 10).forEach((item) => {
    listSearch.innerHTML += `<div class="card" style="width: 18rem;">
            <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" class="card-img-top" alt="poster.film ${item.tittle}">
            <div class="card-body">
                <div class="title">
                    <h5 class="card-title">${item.title}</h5>
                    <h5 class="card-text">${item.vote_average}</h5>
                </div>
                <p class="card-text">${item.release_date}</p>
            </div>
        </div>`;
  });
}
document.querySelector(".d-flex").addEventListener("submit", function (event) {
  event.preventDefault();
  searchMovieData(search.value);
});
