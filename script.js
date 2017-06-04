//document.addEventListener('DOMContentLoaded', function () {
//});

document.getElementById("go-button").addEventListener('click', saveSearchText);
document.addEventListener('keypress', function (event) {
  if (event.keyCode == 13) {
    document.getElementById("go-button").click();
  }
});

var searchText, dataArray, resultList;

function saveSearchText() {
  searchText = document.getElementById("searchtext").value;
  fetchSearchResults();
}

function fetchSearchResults() {
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
        dataArray = data;
        console.log(data);
        displaySearchResults();
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

}

function displaySearchResults() {
  resultList = "";
  if (dataArray[1].length == 0) {
    resultList = "<p>Sorry, no results found</p>";
    makeList();
  } else if (dataArray[1].length == 1) {
    resultList = "<p>1 result is found:</p >";
    makeList();
  } else if (dataArray[1].length != 0 && dataArray[1].length != 1 && dataArray[1].length < 10) {
    resultList = "<p> " + dataArray[1].length + " results are found:</p>";
    makeList();
  } else {
    resultList = "<p>Top 10 results are:</p >";
    makeList();
  }
}

function makeList() {
  for (var i = 0; i < dataArray[1].length; i++) {
    resultList += "<a " + "href=" + dataArray[3][i] + "><dt>" + dataArray[1][i] + "</dt></a>" + "<dd>" + dataArray[2][i] + "</dd>";
  }
  document.getElementById("searchresults").innerHTML = resultList;
}
