//Tüm Elementleri Seçmek
const form=document.querySelector("#todoAddForm");
const addInput=document.querySelector("#todoName");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const clearButton=document.querySelector("#clearButton");
const filterInput=document.querySelector("#todoSearch");

let todos=[];

runEvents();

// Olay EKleme
function runEvents() {
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    //Todoları UI dan silmek için Second Card Body seçilir
    secondCardBody.addEventListener("click",removeToDoFromUI);
    //Todosların hepsini temizleme
    clearButton.addEventListener("click",clearAllTodosEverywhere);
    //Filtreleme işlemi
    filterInput.addEventListener("keyup",filter);
}

function filter(e) {
    const filterValue= e.target.value.toLowerCase().trim();
    const todoListesi=document.querySelectorAll(".list-group-item");
    if (todoListesi.length>0) {
        todoListesi.forEach((todo)=>{
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display:none !important");
            }
        });
    }else{
        showAlert("warning","Filtreleme Yapmak için en az bir kayda ihtiyacınız vardır...");
    }
}

function clearAllTodosEverywhere() {
    const todoList=document.querySelectorAll(".list-group-item");
    // console.log(todoList);
    if (todoList.length>0) {
        //UI dan silme işlemi
        todoList.forEach((todo)=>{
            todo.remove();
        });
        //Storage dan silme
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Todolar başarılı bir şekilde silindi...");
    }else{
        showAlert("warning","Silmek için en az 1 adet Todo olmalıdır...");
    }
    
}

function removeToDoFromUI(e) {
    // console.log(e.target);
    if (e.target.className==="fa fa-remove") {
        // console.log("çarpıya basıldı");
        //Ekrandan kayıt silme
        const todo=e.target.parentElement.parentElement;
        todo.remove();

        //Storage den silme
        removeTodoFromStorage(todo.textContent);
        showAlert("primary","Kayıt başarıyla silinmiştir...");
    }
}

function removeTodoFromStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach((todo,index)=>{
        if (removeTodo==todo) {
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

//Sayfa Yüklendiğinde olacak olanlar
function pageLoaded() {
    //Storage den todolar kontrol ediliyor
    checkTodosFromStorage();
    //todos dizisindeki her bir elemanı todo olarak yakalamak
    todos.forEach((todo) => {
        //console.log(todo);
        //Gelen her todo yu UI ya gönderiyoruz
        addTodoToUI(todo);
    });
}

//ToDo Ekleme
function addTodo(e) {
    //Inputtwxt teki veriyi trim şeklinde al
    const inputText=addInput.value.trim();
    // ToDo eklerken input kontrolü yapma
    if (inputText=="" || inputText==null) {
        showAlert("secondary","Lütfen Todo Giriniz..");
    }else{
        //Arayüze Ekleme
        addTodoToUI(inputText);
        //Storage e ekleme
        addTodoToStorage(inputText);
        //submitleri farklı sayfaya yöönlendirmesini engellemek için
        showAlert("success","Todo Başarıyla Eklenmiştir...");
    }
    e.preventDefault();
}

function addTodoToUI(newTodo) {
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
                            <a href="#" class="delete-item">
                                <i class="fa fa-remove"></i>
                            </a>
                        </li>
    */

    const li=document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.textContent=newTodo;

    const a=document.createElement("a");
    a.href="#";
    a.className="delete-item";

    const i=document.createElement("i");
    i.className="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.append(li);

    addInput.value="";
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

// Localstorageden gelen Todos ları kontrol etme
function checkTodosFromStorage() {
    if (localStorage.getItem("todos")===null) {
        tıdıs=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}

//Bootstrap Alert Mesaj Ekleme
function showAlert(type,message) {
    /*
    <div class="alert alert-success" role="alert">
  This is a success alert—check it out!
</div>
    */

const div=document.createElement("div");
div.className=`alert alert-${type}`;
div.textContent=message;
firstCardBody.appendChild(div);

setTimeout(() => {
    div.remove();
}, 2000);
}