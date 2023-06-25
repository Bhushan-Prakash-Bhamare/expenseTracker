const exForm=document.getElementById('expform');
const displayList=document.querySelector('.list-group');
exForm.addEventListener('submit',formSubmit);
 
async function formSubmit(e)
{   try{
    e.preventDefault();
    const amount=document.getElementById('expamt').value;
    const description=document.getElementById('desc').value;
    const category=document.getElementById('sel-list').value;
    const token=localStorage.getItem('token');

    let myobj={
      amount,description,category
    }
        const response=await axios.post("http://localhost:3100/expense/add-expense",myobj,{headers:{"Authorization":token}})
        showExp(response.data.newExpenseData);
      
    }
    catch(err){
        document.body.innerHTML=document.body.innerHTML+"<h4>Something went wrong</h4>"    
        console.log(err)
    };   
}

window.addEventListener("DOMContentLoaded",async()=>{
   try{
    const token=localStorage.getItem('token');
    const response=await axios.get("http://localhost:3100/expense",{ headers:{"Authorization":token}})
    for(var i=0;i<response.data.expenseData.length;i++)
        showExp(response.data.expenseData[i]);
    }
    catch(error){
        console.log(error)
    };
})

async function showExp(myobj)
{
    try{
        const addNewelem=document.createElement('li');
    addNewelem.className="list-group-item bg-light";
    const text=document.createTextNode(myobj.amount+"-"+myobj.description+"-"+myobj.category);
    addNewelem.appendChild(text);

    const deletebtn=document.createElement('button');
    deletebtn.className='btn btn-danger btn-sm float-end delete'
    deletebtn.appendChild(document.createTextNode('Delete'));
    addNewelem.appendChild(deletebtn);

    displayList.appendChild(addNewelem);

    deletebtn.addEventListener('click',async function(){
        try{
            const token=localStorage.getItem('token');
            const dId=myobj.id;
            await axios.delete(`http://localhost:3100/expense/delete-expense/${dId}`,{headers:{"Authorization":token}})
                displayList.removeChild(addNewelem);
        }
        catch(err){
            console.log(err)
        };     
    })
    }
    catch(error){
        console.log(error)
    };
}
