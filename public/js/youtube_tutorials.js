const tutorialesContainer = document.querySelector(".sudo-tutoriales");


/*
 * comentario
 * comentario...
 */
export async function loadYoutubeTutorials() {
  // Replace YOUR_API_KEY with your actual API key
  const API_KEY = "AIzaSyAhz0qKEbDMHbPL5dN0MhcunUTGvILvSeY";

  // Replace YOUR_PLAYLIST_ID with the ID of the playlist you want to retrieve videos from
  const PLAYLIST_ID = "PLbLhRWlQoywdYtB9zuCUtXch5s6i3eIf6";

  // Create an HTTP request to the YouTube Data API v3
  const request = new XMLHttpRequest();
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
  request.open("GET", url);

  // Send the request
  request.onload = function () {
    console.log('hey');

    if (request.status !== 200) {
      console.error("Error fetching videos");
      // TODO: Show error message
      return;
    }

    if (request.status === 200) {
      const data = JSON.parse(request.responseText);
      const videos = data.items.map(item => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      // Create a container element to hold the videos
      const container = document.createElement("div");
      container.classList.add("sudo-tutoriales__videos-wrapper");

      // Loop through the videos and create a video element for each one
      videos.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.classList.add("sudo-tutoriales__video");
        // Create an iframe to embed the video
        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", `https://www.youtube.com/embed/${video.id}`);
        iframe.setAttribute("allowfullscreen", "");
        videoElement.appendChild(iframe);
        // Create a title element
        const title = document.createElement("h3");
        title.textContent = video.title;
        videoElement.appendChild(title);
        // Create a description element
        // const description = document.createElement('p');
        // description.textContent = video.description;
        // videoElement.appendChild(description);
        // Append the video element to the container
        container.appendChild(videoElement);
      });
      // Append the container to the DOM
      // const tutorialesContainer = document.querySelector(".sudo-tutoriales")
      tutorialesContainer.appendChild(container);
    }
  };
  request.send();
}
