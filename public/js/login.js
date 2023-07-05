const form=document.getElementById('Data-form');
const pwShowHide = document.querySelectorAll(".eye-icon");
form.addEventListener('submit',formSubmit);

pwShowHide.forEach(eyeIcon => {
eyeIcon.addEventListener("click", () => {
  let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
  
  pwFields.forEach(password => {
      if(password.type === "password"){
          password.type = "text";
          eyeIcon.classList.replace("bx-hide", "bx-show");
          return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
  })
  
})
})

async function formSubmit(e){
  try{
      e.preventDefault();  
      const details={
          email:e.target.email.value,
          password:e.target.password.value
      }
      
      const response=await axios.post(`http://13.51.204.19:3100/user/login`,details);  
          console.log(response.data.message); 
          localStorage.setItem('token',response.data.token);
          window.location.href = "http://127.0.0.1:5500/public/html/addexpense.html";   
      
  }
  catch(err){ 
      console.log(err.message);
      document.body.innerHTML +=`<div style="color:red;">${err.message}</div>`;
  }
}