function StarterFunction() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://melivecode.com/api/users");
    xhr.send();
  
    xhr.onload = () => {
      if (xhr.status === 200) {
        const users = JSON.parse(xhr.response);
        const table = document.querySelector("table");
  
        const formData = users.map((user) => ({
          profile: user.avatar,
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          username: user.username,
        }));
  
        for (const row of formData) {
          const tr = document.createElement("tr");
  
          for (const column in row) {
            const td = document.createElement("td");
  
            if (column === "profile") {
              const img = document.createElement("img");
  
              img.src = row[column];
              img.className = " rounded w-25 h-25";
              td.appendChild(img);
            } else if (column === "id") {
              td.setAttribute("id", `id_${row[column]}`);
              td.textContent = row[column];
            } else if (column !== "") {
              td.textContent = row[column];
            }
            tr.appendChild(td);
          }
          const td = document.createElement("td");
  
          tr.appendChild(td);
  
          const lastId = tr.lastElementChild;
  
          const button = document.createElement("button");
          button.className = "btn btn-warning";
          button.textContent = "Edit";
  
          button.addEventListener("click", () => {
            Swal.fire({
              title: "Edit Users",
              html:
                `<input id="id" type="hidden" value="${row["id"]}">` +
                `<input id="swal-input1" class="swal2-input" value="${row["fname"]}">` +
                `<input id="swal-input2" class="swal2-input" value="${row["lname"]}">` +
                `<input id="swal-input3" class="swal2-input" value="${row["username"]}">`,
              showCancelButton: true,
              confirmButtonText: "Edit",
              preConfirm: () => {
                const id = document.getElementById("id").value;
                const fname = document.getElementById("swal-input1").value;
                const lname = document.getElementById("swal-input2").value;
                const username = document.getElementById("swal-input3").value;
  
                return { id: id, fname: fname, lname: lname, username: username };
              },
            }).then((result) => {
              if (result.isConfirmed) {
                const url = "https://www.melivecode.com/api/users/update";
  
                const newData = {
                  id: result.value.id,
                  fname: result.value.fname,
                  lname: result.value.lname,
                  username: result.value.username,
                };
  
                fetch(url, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newData),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.status === "ok") {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      afterSuccess(newData.id);
                    } else if (data.status === "error") {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: data.message,
                      });
                      afterSuccess(newData.id);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
  
          const buttonDelete = document.createElement("button");
          buttonDelete.className = "btn btn-danger";
          buttonDelete.textContent = "Delete";
  
          buttonDelete.addEventListener("click", () => {
            const url = "https://www.melivecode.com/api/users/delete";
  
            const newData = {
              id: row["id"],
            };
  
            fetch(url, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newData),
            })
              .then((res) => res.json())
              .then((data) => {
                if ((data.status = "ok")) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
                afterSuccess(newData.id);
              })
              .catch((err) => {
                console.log(err);
              });
          });
  
          lastId.appendChild(button);
          lastId.appendChild(buttonDelete);
  
          table.appendChild(tr);
        }
      } else {
        console.log(xhr.status);
      }
    };
  }
  
  function popUpCreateuser() {
    Swal.fire({
      title: "Create Users",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Firstname" value="">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Lastname" value="">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Username" value="">` +
        `<input id="swal-input5" class="swal2-input" placeholder="Password" value="">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Url Image" value="">` +
        `<input id="swal-input6" class="swal2-input" placeholder="Email" value="">`,
      showCancelButton: true,
      confirmButtonText: "Create",
      preConfirm: () => {
        const fname = document.getElementById("swal-input1").value;
        const lname = document.getElementById("swal-input2").value;
        const username = document.getElementById("swal-input3").value;
        const password = document.getElementById("swal-input5").value;
        const avatar = document.getElementById("swal-input4").value;
        const email = document.getElementById("swal-input6").value;
  
        return {
          fname: fname,
          lname: lname,
          username: username,
          avatar: avatar,
          password: password,
          email: email,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const url = "https://www.melivecode.com/api/users/create";
        const newData = {
          fname: result.value.fname,
          lname: result.value.lname,
          username: result.value.username,
          password: result.value.password,
          avatar: result.value.avatar,
          email: result.value.email,
        };
  
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "ok") {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              afterSuccess(newData.id);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
  
  function afterSuccess() {
    const table = document.querySelector("table");
    table.innerHTML = "";
  
    StarterFunction();
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    StarterFunction();
  });
  