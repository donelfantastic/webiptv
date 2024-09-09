//NAVIGATION MENU JS
let menuIcon = $(".toggle-nav");
let nav = $(".nav");
let navItem = $(".nav__item");

$("video").prop('muted', true);

  $(".bg-video-wrap").click( function (){
    if( $("video").prop('muted') ) {
          $("video").prop('muted', false);
    } else {
      $("video").prop('muted', true);
    }
  });

menuIcon.click(function () {
  $(this).toggleClass("toggle-nav--open");

  if (nav.hasClass("nav--open")) {
    navItem.removeClass("nav__item--open");

    setTimeout(function () {
      nav.removeClass("nav--open");
    }, 550);
  } else {
    nav.addClass("nav--open");

    setTimeout(function () {
      navItem.addClass("nav__item--open");
    }, 550);
  }
});

//YMUSIC PLAYLIST JS
(function () {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0]; 
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 
  var player; 
  var playlist1 = $("#ytpl-player1").data("nk"), 
      playlist2 = $("#ytpl-player2").data("dh"), 
      playlist3 = $("#ytpl-player3").data("im"), 
      playlist4 = $("#ytpl-player4").data("dm");
  
  
var $ul = $("#ytpl-thumbs");
  var nowPlaying = "ytpl-playing";
  var nowPlayingClass = "." + nowPlaying;

  function getPlaylistData() {
    var apiKey ="AIzaSyDI4rWo_wVAxRZEIgF6_8sRZDj8OCOZZ38";
    var url ="https://www.googleapis.com/youtube/v3/playlistItems?part=snippet";
    var data1 = {
      playlistId: playlist1, 
      key: apiKey,
      maxResults: 50
    };
        var data2 = {
      playlistId: playlist2, 
      key: apiKey,
      maxResults: 50
    };
        var data3 = {
      playlistId: playlist3, 
      key: apiKey,
      maxResults: 50
    };
       var data4 = {
      playlistId: playlist4, 
      key: apiKey,
      maxResults: 50
    };

    $.get(url, data1, function (e) {
      buildHTML(e.items);
    });
    $.get(url, data2, function (e) {
      buildHTML(e.items);
    });
    $.get(url, data3, function (e) {
      buildHTML(e.items);
    });
    $.get(url, data4, function (e) {
      buildHTML(e.items);
    });
  }

  function buildHTML(data) {
    var list_data = "";

    data.forEach(function (e, i) {
      var item = e.snippet;

      if (item.thumbnails) {
        list_data +=
          '<li><button data-ytpl-index="' +
          i +
          '" data-ytpl-title="' +
          item.title +
          '" data-ytpl-desc="' +
          item.description +
          '"><p>' +
          item.title +
          '</p><img alt="' +
          item.title +
          '" src="' +
          item.thumbnails.medium.url +
          '"/></button></li>';
      }
    });

    $ul.html(list_data);
    
  }

  
  function onPlayerReady(event) {
    getPlaylistData();
  }
  window.onYouTubeIframeAPIReady = function () {
    var player1 = new YT.Player("ytpl-player1",{
      height: "360",
      width: "640",
      playerVars: {
        listType: "playlist", 
        list: playlist1
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
    
    var player2 = new YT.Player("ytpl-player2",{
      height: "360",
      width: "640",
      playerVars: {
        listType: "playlist", 
        list: playlist2
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
    
    var player3 = new YT.Player("ytpl-player3",{
      height: "360",
      width: "640",
      playerVars: {
        listType: "playlist", 
        list: playlist3
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
    
    var player4 = new YT.Player("ytpl-player4",{
      height: "360",
      width: "640",
      playerVars: {
        listType: "playlist", 
        list: playlist4
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });

    function updateTitles($this) {
      $("#ytpl-title").text($this.data("ytpl-title"));
      $("#ytpl-desc").text($this.data("ytpl-desc"));
    }

    function onPlayerStateChange(e) {
      var $buttons = $ul.find("button");
      var currentIndex = player.getPlaylistIndex();

    
      if (e.data === YT.PlayerState.PLAYING) {
        $buttons.removeClass(nowPlaying);
        $buttons.eq(currentIndex).addClass(nowPlaying);
      }

     
      if (
        e.data === YT.PlayerState.ENDED &&
        currentIndex === $buttons.length - 1
      ) {
        $buttons.removeClass(nowPlaying);
      }

      updateTitles($buttons.eq(currentIndex));
    }

    $(document).on(
      "click",
      '[data-ytpl-index]:not(".ytpl-playing")',
      function (e) {
        e.preventDefault();

        var $this = $(this);

        var index = $this.data("ytpl-index");

        updateTitles($this);

        if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
          player.cuePlaylist({
            listType: "playlist",
            list: playlistID,
            index: index,
            suggestedQuality: "hd720" 
          });
        } else {
          player.playVideoAt(index); 
        }
      }
    );
  };
})();


//SOCIAL PANEL JS
const floating_btn = document.querySelector(".floating-btn");
const close_btn = document.querySelector(".close-btn");
const social_panel_container = document.querySelector(
  ".social-panel-container"
);

floating_btn.addEventListener("click", () => {
  social_panel_container.classList.toggle("visible");
});

close_btn.addEventListener("click", () => {
  social_panel_container.classList.remove("visible");
});

//TVJSON JS
window.addEventListener("load", function () {
  var cukuRukuk = "//donelfantastic.github.io/webiptv/api/static/web/v1/manifest.json";
  var o = $("#display-number");
  var p = $("#display-resources");
  p.html(
    "<center><p>Loading TV Channels Please wait...</p><br/><div id='loading'></div></center>"
  );

  $.ajax({
    type: "GET",
    url: cukuRukuk, 
    success: function (a) {
      var b = 0;
      var output = "";
      output +=
        "<br><table id='myTable' class='display' style='background:#001f61;font-size:12px;'><thead><tr><th class='th-sm'>LOGO</th><th class='th-sm'>CHANNEL</th><th class='th-sm' style='display:none;'>Category</th><th class='th-sm'>LIVE</th></thead><tbody>";
      var i, j, k, l;
      for (i in a) {
        for (j in a[i].categories) {
          var d = a[i].categories;
          var e = a[i].categories[j].name;
        }
        for (k in a[i].country) {
          var f = a[i].country;
          var g = a[i].country[k].code;
        }
        for (l in a[i].languages) {
          var h = a[i].languages;
          var m = a[i].languages[l].code;
        }
        if (
          d !== "XXX" &&
          d !== "Religious" &&
          f !== "Israel" &&
          f !== "China" &&
          f !== "India" &&
          f !== "Iran"
        ) {
          b++;
          var embedV ="https://donelfantastic.github.io/webiptv/embed/v3/?live&url=";
          var deviceId = "deviceId=YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj";   
          output += "<tr><td><center><img width='64' src='" + a[i].logo + "'/></center></td><td>" + a[i].name + "</td><td style='display:none;'>" + d + "</td><td><center><button class='btn'><a class='open-video' style='text-decoration:none;' href='https://donelfantastic.github.io/webiptv/embed/v3/?live&url='" + a[i].url + "?" + deviceId + ">WATCH NOW</a></button></center></td></tr>";
        }
      }
      output += "</tbody></table>";

      $(document).ready(function () {
        $(".video-popup").hide();
        $(document).on("click", ".open-video", function (e) {
          e.preventDefault();
          $(".video-popup").fadeIn();
          $("#iframeHolder").attr("src", $(this).attr("href"));
        });

        $(".close-video").click(function (e) {
          e.preventDefault();
          $("#iframeHolder").attr("src", "");
          $(".video-popup").fadeOut();
        });
      });
      
 /*    
      var n =
        "<br><span style='color:#000;'>Total Found: <strong style='color:#ff0000;'>" +
        b +
        "</strong> channels.</span><br/><span style='color:#000;'>You can search by channel name, category, country or language! </span>";
      o.html(n);
 */
      p.html(output);
      $("table").addClass("table");
      $("#myTable").DataTable();
    }
  });
});
