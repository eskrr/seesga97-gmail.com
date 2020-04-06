const key = 'AIzaSyDg3ZOH-HBUxWRITT5-OmyA0wAHzPonrzk';
const url = 'https://www.googleapis.com/youtube/v3/search';

settings = {
  method: 'GET'
};

function appendVideo(video) {
  videoId = video.id.videoId;
  videoTitle = video.snippet.title;
  document.getElementById('results').innerHTML += `
      <div class="text-center border border-secondary rounded p-4 m-2" style="width:200px;">
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
          <img src="https://img.youtube.com/vi/${videoId}/0.jpg" width="100px">
          <p class="mt-2">${videoTitle}</p>
        </a>
      </div>`;
}

function resetResults() {
  document.getElementById('results').innerHTML = '';
}

function searchVideo(event) {
  next_page_token = 
  full_url = new URL(url);
  params = {
    type: 'video',
    maxResults: 10,
    key: key,
    part: 'snippet',
    q: document.getElementById('query').value
  };
  // Append params to url
  Object.keys(params).forEach(key => full_url.searchParams.append(key, params[key]));
  fetch(full_url, settings)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error( "Something went wrong!" );
    })
    .then(responseJSON => {
      resetResults();
      responseJSON.items.forEach(item => appendVideo(item));
      see_more_button = document.getElementById('see_more');
      see_more_button.classList.remove('d-none');
      console.log(responseJSON.nextPageToken);
      see_more_button.dataset.nextPageToken = responseJSON.nextPageToken;
    })
    .catch(errMessage => {
      console.log(errMessage);
    });
}

function getMoreResults(event) {
  full_url = new URL(url);
  see_more_button = document.getElementById('see_more');
  params = {
    type: 'video',
    maxResults: 10,
    key: key,
    part: 'snippet',
    pageToken: see_more_button.dataset.nextPageToken,
    q: document.getElementById('query').value
  };
  // Append params to url
  Object.keys(params).forEach(key => full_url.searchParams.append(key, params[key]));
  fetch(full_url, settings)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error( "Something went wrong!" );
    })
    .then(responseJSON => {
      see_more_button.dataset.nextPageToken = responseJSON.nextPageToken;
      responseJSON.items.forEach(item => appendVideo(item));
    })
    .catch(errMessage => {
      console.log(errMessage);
    });
}

window.addEventListener('load', function(event) {
  document.getElementById('search').addEventListener('click', searchVideo);
  document.getElementById('see_more').addEventListener('click', getMoreResults);
});