document.addEventListener('DOMContentLoaded', function () {
});

document.getElementById("go-button").addEventListener('click', saveSearch);

var searchText;

function saveSearch() {
  searchText = document.getElementById("searchtext").value;
  getSearch();
}

function getSearch() {
  var fetchURL = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=" + searchText + "&limit=10";
  fetch(fetchURL, {
    cache: "reload"
  })
    .then(function (response) {
      console.log(response);
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(function (data) {
        console.log(data);
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

}
