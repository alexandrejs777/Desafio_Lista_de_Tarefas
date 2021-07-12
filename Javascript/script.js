let elementList = document.getElementsByTagName('ul')[0];       // "Pesca" o primeiro elemento 'ul' do HTML pelo nome da Tag
let elementInput = document.getElementById('text');         // "Pesca" o elemento com a vid 'texto no HTML
let elementButton = document.getElementsByTagName('button')[0];         // "Pesca" o primeiro elemento 'button' do HTML pelo nome da tag

let tasks = []      // Cria o array para inserir as tarefas

function showTasks() {       // Função para exibir as tarefas na tela



    elementList.innerHTML = '';     // <== Limpa as tarefas que estavam na tela

    elementInput.focus();       // Aqui mantém o foco no campo de texto toda vez que é carregado a página ou alguma tarefa for inserida na lista



    for (task of tasks) {        // Passa por cada item dentro do array

        let elementTask = document.createElement('li');         // Cria no HTML um elemento 'li' em um tipo de dado chamado elementTask           
        let textTask = document.createTextNode(task);           // Cria um texto de acordo com cada item que vai ser adicionado no array

        let excludeTaskButton = document.createElement('button');       // Cria o botão que vai excluir a tarefa selecionada
        let buttonText = document.createTextNode('X');      // Insere um 'X' no centro do botão apenas para facilitar a visualização
        let position = tasks.indexOf(task);         // Coloca o índice atual do item (no caso a propriedade 'task') num array dentro de um tipo de dado 'let' para ser usado na exclusão futura do mesmo
        excludeTaskButton.appendChild(buttonText);          // Coloca o botão de excluir para cada 'li' criada
        excludeTaskButton.setAttribute('onclick', `deleteTask(${position})`);

        elementTask.appendChild(textTask);
        elementList.appendChild(elementTask);
        elementTask.appendChild(excludeTaskButton);
    }

}

function addTasks() {
 
    let textTask = elementInput.value;

    if (textTask == "") {
            alert("Você precisa inserir alguma tarefa para continuar!");
        } 
        else {
            if (tasks.length > 9) {
                alert("Só é possível incluir no máximo 10 tarefas por vez!");

                elementInput.value = '';
            } 
            else {
                
                tasks.push(textTask);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                console.log(tasks);
                elementInput.value = '';
            }
        }
    showTasks();
    taskCounter();
}

function keyPress(e) {

    let keyP = e.keyCode || e.which;

    if (keyP == 13) {
        addTasks();
    }
    taskCounter();
}

elementButton.setAttribute('onclick', 'addTasks()');

function deleteTask(position) {

    tasks.splice(position, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();

    taskCounter();
}

function deleteLastTask(position) {
    tasks.pop(position);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
    taskCounter();
}

function loadAllTasks() {

    let loadedTasks = localStorage.getItem("tasks");

    if (loadedTasks) {

        tasks = JSON.parse(loadedTasks);

        showTasks();
    }
}

function taskCounter() {
    let p = document.getElementById("count");
    p.innerText = "Você possui " + tasks.length + " tarefas de 10 possíveis."

    showTasks();
}

taskCounter();

loadAllTasks();
