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
      const email=e.target.email.value;
      const pass=e.target.password.value;
      const confirmpass=e.target.confirmpassword.value;
      const details={
        email:email,
        password:confirmpass
      };

      if(pass===confirmpass){
        const response=await axios.post(`http://13.51.204.19:3100/password/change`,details); 
        console.log(response);
        window.location.href="http://127.0.0.1:5500/views/login.html";
      }
      else{
        throw new Error('password and confirm password does not match');
      }  
  }
  catch(err){  
      console.log(err.message);
      form.innerHTML +=`<div style="color:red;">${err.message}</div>`;
  }
}