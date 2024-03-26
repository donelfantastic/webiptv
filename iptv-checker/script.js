
function Clear_iptvLink() {
  document.getElementById("iptvLink").value= "";
}


function convertLinks() {
  const iptvLink = document.getElementById("iptvLink").value.trim();

  if (!iptvLink) {
    alert("Please enter a iptv URL.");
    return;
  }
  
  const parts = iptvLink.split("/");
  const host = parts[2];
  const username = parts[3];
  const password = parts[4];
  const path = parts.slice(6).join("/");

  const Link1 = `http://${host}${path}/player_api.php?username=${username}&password=${password}`;

  const Link2 = `http://${host}${path}/player_api.php?username=${username}&password=${password}&action=get_live_categories`;
  
  const Link3 = `http://${host}${path}/player_api.php?username=${username}&password=${password}&action=get_live_streams`;
  
  const Link4 = `http://${host}${path}/player_api.php?username=${username}&password=${password}&action=get_live_streams&category_id=`;
  
  const Link5 = `http://${host}${path}/get.php?username=${username}&password=${password}&type=m3u_plus`;
  

  document.getElementById(
    "Link1"
  ).innerHTML = `<strong>Get Account Info:</strong><br><a href="${Link1}" target="_blank" rel=”noopener noreferrer”>${Link1}</a></br>`;
  
  document.getElementById(
    "Link2"
  ).innerHTML = `<strong>Get Live Stream Categories:</strong><br><a href="${Link2}" target="_blank" rel=”noopener noreferrer”>${Link2}</a></br>`;
  
  document.getElementById(
    "Link3"
  ).innerHTML = `<strong>Get All Live Streams Channel:</strong><br><a href="${Link3}" target="_blank" rel=”noopener noreferrer”>${Link3}</a></br>`;
  
  document.getElementById(
    "Link4"
  ).innerHTML = `<strong>Get Live Streams Channel by Categories:</strong><br><a href="${Link4}" target="_blank" rel=”noopener noreferrer”>${Link4}</a></br>`;
  
  document.getElementById(
    "Link5"
  ).innerHTML = `<strong>Get Download All Live Streams Channels M3U:</strong><br><a href="${Link5}" target="_blank" rel=”noopener noreferrer”>${Link5}</a></br>`;
}
