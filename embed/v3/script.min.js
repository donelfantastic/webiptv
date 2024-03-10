document.addEventListener("DOMContentLoaded", () => {
const player = new OpenPlayerJS("video", null, false, {
  controls: {
    left: ["play", "time", "volume"],
    middle: ["progress"],
    right: ["levels", "settings", "fullscreen"],
     }
    });
   player.src = { 
     type: "application/x-mpegURL", 
     src: "https://donelfantastic.github.io/webiptv/web/" + sURL
   };
  player.init();
  });
