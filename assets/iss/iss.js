export class Iss {
  constructor() {
    let firstTime = true;
    async function getISS() {
      let response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      let json = await response.json();
      const { latitude, longitude } = json;
      const lonEl = document.getElementById('lon');
      const latEl = document.getElementById('lat');
      marker.setLatLng([latitude, longitude]);
      if (firstTime) {
        map.setView([latitude, longitude], 3);
        firstTime = !firstTime;
      }
      if (lonEl) {
        lonEl.textContent = longitude.toFixed(2);
      }
      if (latEl) {
        latEl.textContent = latitude.toFixed(2);
      }
    }
    getISS();
    setInterval(getISS, 1100);
    const map = L.map('map', {
      center: [51.505, -0.09],
      zoom: .9
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    var myIcon = L.icon({
      iconUrl: '/portfolio/assets/iss/iss.png',
      iconSize: [50, 32],
      iconAnchor: [25, 16],
    });
    let marker = L.marker([0, 0], { icon: myIcon }).addTo(map);
    console.log("HEY ISS")
  }
}
