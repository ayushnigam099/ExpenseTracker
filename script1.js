// SO HERE I AM STORING ALL THE DETAILS OF THE USER IN LOCAL STORAGE
let amount = document.querySelector('#amt');
let description = document.querySelector('#des');
let myForm = document.querySelector('#my-form');
let category = document.querySelector('#cat');


// Listen for Domcontentloaded

document.addEventListener('DOMContentLoaded', ()=>{
  axios.get("http://localhost:4000/expense/get-expense")
  .then(({data})=> {
                                        // console.log(data);
                                        // console.log(res.data.data.length);
    for(let i=0;i<data.data.length;i++)
    {
                                        //  console.log("objectLength");                        
              let div = document.createElement('div');
              // Creating a Delete Button
              div.className= "new-div";
              let deleteButton = document.createElement("button");
              deleteButton.setAttribute('id', data.data[i].id);
              deleteButton.textContent="Delete";
              deleteButton.addEventListener('click', onDelete);
  
              div.appendChild(document.createTextNode(data.data[i].amount));
              div.appendChild(document.createTextNode("🔶" + data.data[i].category +"🔶"));
              div.appendChild(document.createTextNode(data.data[i].description+ " "));
              
              div.style.fontWeight= "bold";
              div.style.textAlign= "center";
              div.style.color= "brown";
  
              deleteButton.style.backgroundColor="red";
              deleteButton.style.color="white";
              deleteButton.style.borderColor="red"
              div.appendChild(deleteButton);
  
              // Add an Edit button to the div
              let editButton=document.createElement("button");
              editButton.textContent = "Edit";
              div.appendChild(editButton);
              div.lastChild.addEventListener('click', onEdit);
              
              editButton.style.backgroundColor="green";
              editButton.style.color="white";
              editButton.style.borderColor="green"
  
              myForm.after(div);
  }
  }).catch(err=> console.error(err))
  })
  

// Listen for add expense
myForm.addEventListener('submit', onSubmit);
function onSubmit(e)
 {
    e.preventDefault();
    if(amount.value === '' || description.value === '' || category.value === '') {
      alert('Please enter all fields');
    }
    else{
        alert('Details Successfully Saved!');
        const details = {
            Amount: amount.value,
            Description: description.value,
            Category: category.value,
        };
       
        // localStorage.setItem(amount.value, JSON.stringify(details));
        // localStorage.setItem(amount.value, description.value);
        
        // Lets Scale the app to more users
        let div = document.createElement('div');
        // Creating a Delete Button
        div.className=" new-div";
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute('id', amount.value);
        deleteButton.textContent="Delete";
        deleteButton.addEventListener('click', onDelete);

        div.appendChild(document.createTextNode(amount.value));
        div.appendChild(document.createTextNode("🔶" + description.value +"🔶"));
        div.appendChild(document.createTextNode(category.value + " "));
        
        div.style.fontWeight= "bold";
        div.style.textAlign= "center";
        div.style.color= "brown";
        
        deleteButton.style.backgroundColor="red";
        deleteButton.style.color="white";
        deleteButton.style.borderColor="red"
         // Add an Delete button to the div
        div.appendChild(deleteButton);

        // Add an Edit button to the div
        let editButton=document.createElement("button");
        editButton.textContent = "Edit";
        div.appendChild(editButton);
        div.lastChild.addEventListener('click', onEdit);
        
        editButton.style.backgroundColor="green";
        editButton.style.color="white";
        editButton.style.borderColor="green"

        myForm.after(div);

        axios.post("http://localhost:4000/expense/add-expense", details).
        then(res=> console.log(res.data))
         .catch((err)=>{
           console.error(err);
         alert("Duplicate Entry Found, Please Register Again!")});

}
 }
 
// DELETE BUTTON FUNCTIONALITY
    function onDelete() {
    const div = this.parentNode;
    // console.log(div)
    // const name = div.childNodes[0].nodeValue.trim();
    // // console.log(name)
    // localStorage.removeItem(name);
    // div.remove();
    axios.delete(`http://localhost:4000/expense/delete-expense/${this.id}`)
    .then(res=> {
      console.log(res);
      alert("Selected User Details has been removed from Database!");})
      .catch(err=> console.error(err));
      
    div.remove();
  }

  // EDIT BUTTON FUNCTIONALITY
    function onEdit(e) {
    e.preventDefault();
    const div = this.parentNode;
    const name = this.parentNode.childNodes[0].nodeValue.trim();
    const details = JSON.parse(localStorage.getItem(name));
    amount.value = name;
    description.value = details.Description;
    category.value = details.Category;
    localStorage.removeItem(name);
    div.remove();
}
