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
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value
        }
        
        const response=await axios.post(`http://13.51.204.19:3100/user/signup`,details);
        if(response.status===201){
            console.log("success:User added"); 
            window.location.href="../html/login.html" ; 
        }
        else{
            throw new error('Something went wrong');
        }
    }
    catch(err){
        console.log(err);
      //  document.body.innerHTML +=`<div style="color:red;">${err.name}</div>`;
    }
}