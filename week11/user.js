function UserStarted() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/users");
  xhr.send("");

  xhr.onload = () => {
    if (xhr.status === 200) {
      const userJSON = JSON.parse(xhr.response);
      const table = document.querySelector("table");
      const formatData = userJSON.map((usr) => ({
        id: usr.id,
        email: usr.email,
        name: usr.name.firstname + "  " + usr.name.lastname,
        username: usr.username,
        password: usr.password,
        location: usr.address,
      }));

      for (const row of formatData) {
        const tr = document.createElement("tr");

        for (const column in row) {
          const td = document.createElement("td");

          if (column !== "location") {
            td.textContent = row[column];
          }

          tr.appendChild(td);
        }

        table.appendChild(tr);
      }

      // ตำแหน่งที่กำหนดให้แสดงแผนที่ (ในตัวอย่างนี้ให้เป็นพิกัดสยามพารากอน กรุงเทพฯ)
      const mapCoordinates = [13.7468, 100.5353];

      // สร้างแผนที่และกำหนดตำแหน่งและซูมเริ่มต้น
      const map = L.map("map").setView(mapCoordinates, 10);

      // เพิ่ม Layer ของแผนที่ (ในที่นี้ใช้ Mapbox)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      // วนลูปในข้อมูลผู้ใช้และแสดงหมุดลงในแผนที่
      formatData.forEach((user) => {
        // ตรวจสอบให้แน่ใจว่ามีข้อมูลพิกัดให้ใช้งาน
        if (user.location.geolocation.lat && user.location.geolocation.long) {
          const latLng = [
            parseFloat(user.location.geolocation.lat),
            parseFloat(user.location.geolocation.long),
          ];

          // สร้างหมุด (marker) และเพิ่มลงในแผนที่
          L.marker(latLng).addTo(map).bindPopup(`
                    <b>${user.name}</b><br>
                    Email: ${user.email}<br>
                    Username: ${user.username}<br>
                    Password: ${user.password}
                `);
        }
      });
    } else {
      console.log(xhr.status);
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  UserStarted();
});
