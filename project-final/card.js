function StarterFunction() {
    const cardColor = ["text-bg-secondary", "text-bg-primary", "text-bg-success", "text-bg-warning", "text-bg-danger"];
    let colorIndex = 0;
  
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
    xhr.send();
  
    xhr.onload = () => {
      if (xhr.status === 200) {
        const posts = JSON.parse(xhr.response);
  
        posts.forEach(async (post) => {
          const personData = await showUser(post.userId);
          const colums = document.createElement("div")
          colums.className = "col mb-3";
  
          
          colorIndex = (colorIndex + 1) % cardColor.length;
          const colorClass =  cardColor[colorIndex];
           
          colums.innerHTML = `
          <div class="card ${colorClass}">
            <h5 class="card-header">POST ID : ${post.id}</h5>
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p>
              <a href="#" class="btn btn-primary" onClick="UpdatePopUp('${post.id}')">Update</a>
              <a href="#" class="btn btn-danger" onClick="DeletePopUp('${post.id}')">Delete</a>
            </div>
            <div class="card-footer">
             ${personData.username} | ${personData.name} | ${personData.email}
            </div>
          </div>
          `;
  
          document.querySelector("#row_card").appendChild(colums);
  
        })
      } else {
        console.log(xhr.status);
      }
    };
  }
  
  const cardColor = ["text-bg-secondary","text-bg-primary","text-bg-success","text-bg-success","text-bg-danger"]
  
  function showUser(usrID) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `https://jsonplaceholder.typicode.com/users/${usrID}`;
  
      xhr.open("GET", url);
      xhr.send();
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          const personalData = JSON.parse(xhr.response);
          resolve(personalData);
        } else {
          console.log(xhr.status);
          reject(xhr.status);
        }
      };
    });
  }
  
  function UpdatePopUp(id){
    Swal.fire({
      title: "Create Post",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Title" value="">` +
        `<input id="swal-input2" class="swal2-input" placeholder="body" value="">` ,
        
      showCancelButton: true,
      confirmButtonText: "Create",
      preConfirm: () => {
        const title = document.getElementById("swal-input1").value;
        const body = document.getElementById("swal-input2").value;
  
        return {
          id:id,
          title:title,
          body:body,
        };
      },
    }).then((result) => {
    if (result.isConfirmed) {
      const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      const newData = {
        title: result.value.title,
        body:result.value.body,
        userId:1
      };
  
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(newData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `แก้ไข POST ID : ${data.id}`,
              text: `Title : ${data.title} | Body : ${data.body}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  }
  
  function popUpCreateuser() {
        Swal.fire({
          title: "Create Post",
          html:
            `<input id="swal-input1" class="swal2-input" placeholder="Title" value="">` +
            `<input id="swal-input2" class="swal2-input" placeholder="body" value="">` ,
            
          showCancelButton: true,
          confirmButtonText: "Create",
          preConfirm: () => {
            const title = document.getElementById("swal-input1").value;
            const body = document.getElementById("swal-input2").value;
    
            return {
              title:title,
              body:body,
            };
          },
        }).then((result) => {
        if (result.isConfirmed) {
          const url = "https://jsonplaceholder.typicode.com/posts";
          const newData = {
            title: result.value.title,
            body:result.value.body,
            userId:1
          };
    
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(newData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "สร้างสำเร็จ",
                  text: `Title : ${data.title} | Body : ${data.body}`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  
  
  function DeletePopUp(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "ต้องการลบใช่ไหม",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
          method: 'DELETE',
        }).then((res) => res.json())
        .then((data) => {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            `ลบ POST ID : ${id} สำเร็จ !`,
            'success'
          )
        })
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'ยกเลิกสำเร็จ',
          'error'
        )
      }
    })
  }
  
  
  document.addEventListener("DOMContentLoaded", function () {
    StarterFunction();
  
  });
  