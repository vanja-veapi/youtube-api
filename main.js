const API_KEY = "AIzaSyAXje7XXFgvMqPIE1XkBu0AxMTJ6u2jcu8";
const CHANNEL_ID = "UC-yW5_n9lbBWh9YpezoE5og"
// const CHANNEL_ID = "UCMiRVWikc6vZ3Gqtdg7VfNg"

const youtuberId = document.querySelector("#youtuber");

window.addEventListener("load", function () {
    fetchYoutuber();
    setInterval(fetchYoutuber, 30000);
});

function fetchYoutuber() {
    this.fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`)
        .then(blob => blob.json())
        .then(data => {
            const channelName = displayYoutuber(data.items[0])
            this.document.title += " " + channelName;
        })
}
function displayYoutuber(youtuber) {
    if (youtuber.statistics.subscriberCount >= 9000) {
        const audio = new Audio("https://www.youtube.com/watch?v=rICOGrus2E8");
        audio.play();
    }

    youtuberId.innerHTML = `<div class="logo"><img src="${youtuber.snippet.thumbnails.medium.url}" alt="${youtuber.snippet.title}"/></div>
    <h1>${youtuber.snippet.title}</h1>

    <div class="wrapper">
        <div class="subscribers">
            <h2>Subscribers</h2>
            <h1>${youtuber.statistics.subscriberCount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h1>
        </div>
        <div class="views">
            <h2>Views</h2>
            <h1>${Number(youtuber.statistics.viewCount).toLocaleString()}</h1>
        </div>
        <div class="videos">
            <h2>Videos</h2>
            <h1>${youtuber.statistics.videoCount}</h1>
        </div>
    </div>`

    return youtuber.snippet.title
}
