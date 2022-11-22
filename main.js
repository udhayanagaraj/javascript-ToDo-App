let form = document.getElementById("form");
let textinput = document.getElementById("textInput");
let dateinput = document.getElementById("dateInput");
let textArea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    formvalidation();
});


let formvalidation=()=>{
    if(textinput.value===""){
        console.log("failure"); 
        msg.innerHTML="Task cannot be blank";
    }
    else{
        console.log("success");
        msg.innerHTML="";
        acceptdata();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();

        (()=>{
            add.setAttribute("data-bs-dismiss","");
        })()
    }
};


let data = [{}];

let acceptdata = () => {
    data.push({
        text: textinput.value,
        date: dateinput.value,
        description: textArea.value,
    });

    localStorage.setItem("data",JSON.stringify(data));
    console.log(data);
    createtask();
};

let createtask=()=>{
    tasks.innerHTML="";
    data.map((x,y) => {
        return  (tasks.innerHTML+=`
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
                <i onClick="edittask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick="deletetask(this);createtask()" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    });

   
    resetform();
};


let deletetask=(e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    
    localStorage.setItem("data",JSON.stringify(data));
    console.log(data);

};



let edittask=(e)=>{
    let selectedtask=e.parentElement.parentElement;
    textinput.value=selectedtask.children[0].innerHTML;
    dateinput.value=selectedtask.children[1].innerHTML;
    textArea.value=selectedtask.children[2].innerHTML;

    deletetask(e);
};



let resetform =()=>{
    textinput.value="";
    dateinput.value="";
    textArea.value="";
};




(()=>{
    data=JSON.parse(localStorage.getItem("data")) || [];
    
    console.log(data);
    createtask();
})();