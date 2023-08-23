document.addEventListener("DOMContentLoaded", function() { 

    const form = document.getElementById("form_register");
    const formLog = document.getElementById("form_login");
    
    if (form) {
        form.addEventListener("submit", RegisterSubmit);
    }

    if (formLog) {
        formLog.addEventListener("submit", LoginSubmit);
    }
    
    function RegisterSubmit(event){
        const url = "https://www.melivecode.com/api/users/create";
        const inputFName = document.getElementById("fname").value;
        const inputLName = document.getElementById("lname").value;
        const inputUsername = document.getElementById("username").value;
        const inputPassword = document.getElementById("password").value;
        const inputEmail = document.getElementById("email").value;
        const inputAvatar = document.getElementById("avatar").value;
    
        const newData = {
            fname:inputFName,
            lname:inputLName,
            username:inputUsername,
            password:inputPassword,
            email:inputEmail,
            avatar:inputAvatar
        };
    
        fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body:JSON.stringify(newData)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Register Success`,
                    text: `Username : ${data.user.username}`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
    
                  form.reset();
                  redirect("login.html");
            }
        })
    
        event.preventDefault();
    }
    
    function LoginSubmit(event){
        const url = "https://www.melivecode.com/api/login";
        const inputUsername = document.getElementById("username").value;
        const inputPassword = document.getElementById("password").value;
    
    
        const newData = {
            username :inputUsername,
            password: inputPassword,
            expiresIn: 60000,
        }
    
        fetch(url,{
            method:"POST",
            headers:{"Content-Type": "application/json; charset=UTF-8"},
            body: JSON.stringify(newData)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Login Success`,
                    text: `Username : ${data.user.username} \n Token : ${data.accessToken}`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
    
                  formLog.reset();
                  localStorage.setItem("usertoken",data.accessToken);
                  localStorage.setItem("profile",data.user.avatar);
                  redirect("homepage.html");
            }
        })
    
        event.preventDefault();
    }


    function redirect(url){
        setTimeout(function(){
            window.location.href = url;
        },3500)
    }
    
});
