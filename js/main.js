let closeBtn = document.querySelector(".form .close");
let addContact = document.querySelector(".addNew");
let formDiv = document.querySelector(".addContact");
let formSection = document.querySelector(".form");

//open form of Add contact
addContact.addEventListener("click",()=>{
    formDiv.style.display="block";  
    formSection.classList.add("overlay") 
})

//close form of Add contact
closeBtn.onclick= ()=>{
    reset();
    formDiv.style.display="none";  
    formSection.classList.remove("overlay") 
}
// input variables
let user = document.getElementById("user")
let phone = document.getElementById("phone")
let mail = document.getElementById("mail")
let address = document.getElementById("address")
let saveBtn = document.querySelector(".save")
//create array and get stored data
let returned = localStorage.getItem('user');
let inputData =JSON.parse(returned ||"[]");
let lastId = inputData.length;
let getData =()=>{
     inputData.push({
        contactId: lastId+=1,
        contactname:user.value,
        contactPhone:phone.value,
        contactMail:mail.value,
        contactAddress:address.value,
    })
}
//show input values
let tbody = document.getElementById("tbody")
let render =()=>{
    let tr= '';
    inputData.forEach(data=>{
       tr += `
       <tr data-id="${data.contactId}">
        <td >${data.contactId}</td>
        <td>${data.contactname}</td>
        <td>${data.contactPhone}</td>
        <td>${data.contactMail}</td>
        <td>${data.contactAddress}</td>
        <td class="edit">Edit</td>
        <td class="del">Delete</td>
        </tr>
        ` 
    })
    tbody.innerHTML = tr;
}
//empty input 
let reset =()=>{
   user.value=''
   phone.value=''
   mail.value=''
   address.value=''
}
render();
//function save button
let savefun = ()=>{
    getData(); 
    localStorage.setItem('user',JSON.stringify(inputData));   
    formDiv.style.display="none";  
    formSection.classList.remove("overlay") ;
    reset();
    render()
}
saveBtn.addEventListener("click",savefun)
//edit and delete 
tbody.addEventListener("click", e =>{
    if(e.target.classList.contains("edit")){
        let tr = e.target.parentElement;
        let id = tr.dataset.id;
        let index = id-1;
        user.value=inputData[index].contactname;
        phone.value=inputData[index].contactPhone;
        mail.value=inputData[index].contactMail;
        address.value=inputData[index].contactAddress;
        formDiv.style.display="block";  
        formSection.classList.add("overlay") ;
        let editBtn =()=>{
            let updateContact={
               contactId: parseInt(id),
               contactname:user.value,
               contactPhone:phone.value,
               contactMail:mail.value,
               contactAddress:address.value,
            }
            inputData[index]=updateContact ;
            localStorage.setItem('user',JSON.stringify(inputData));
            formDiv.style.display="none";  
            formSection.classList.remove("overlay");
            reset();
            render()
            saveBtn.removeEventListener("click",editBtn);
            saveBtn.addEventListener("click",savefun)
        }
        saveBtn.removeEventListener("click",savefun);
        saveBtn.addEventListener("click",editBtn);
    }
    else if(e.target.classList.contains("del")){
        let tr = e.target.parentElement;
        let id = tr.dataset.id;
        let index = id-1;
        let c= confirm("Are You Sure to Delete?")


        if(c==true)
        {
            inputData.splice( index,1);
            lastId-=1;
           localStorage.setItem('user',JSON.stringify(inputData));
           render();
        }
        
             
    }
        
})
let searchBtn = document.getElementById("search");
let form = searchBtn.parentElement;
let trs = document.querySelectorAll("tbody tr")
form.addEventListener("submit",e=>{
    e.preventDefault();
});
searchBtn.addEventListener("keyup",()=>{
    let srchValue = searchBtn.value.toUpperCase();
    trs.forEach(tr=>{
        trName= tr.children[1].textContent.toUpperCase();
        if(trName.includes(srchValue))
        {
            tr.style.display="";
        }
        else{
            tr.style.display="none";
            
        }
    })
})
