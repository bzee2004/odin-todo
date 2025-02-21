
// import projectImg from '/static/task-square-svgrepo-com.svg';
// // import { makeToDo } from './handleToDos';

// const content = document.querySelector('.content');
// const projectList = document.querySelector('.project-list');

// const toDoDialog = document.querySelector('#display-todo');

// export class insertDOM {

//     static addProject(projectObj) {
//         const project = document.createElement('div');
//         project.classList.add('project');
//         project.setAttribute('id', `project-${projectObj.id}`);

//         project.addEventListener('click', e => {
//             renderDOM.renderProject(projectObj, e.target);
//         })

//         const title = document.createElement('div');
//         title.classList.add('title');

//         const titleImg = document.createElement('img');
//         titleImg.src = projectImg;

//         const titlePar = document.createElement('p');
//         titlePar.textContent = projectObj.name;
//         titlePar.style.pointerEvents = 'all';

//         titlePar.addEventListener('dblclick', e => {
//             e.target.contentEditable = 'true';
//             projectObj.name = e.target.textContent;
//         })

//         titlePar.addEventListener('keydown', e => {
//             if (e.key == 'Enter') {
//                 e.target.contentEditable = 'false';
//             }
//         })
        
//         title.append(titleImg, titlePar);

//         project.appendChild(title);
//         projectList.appendChild(project);
//     }

//     static addCategory(categoryObj) {
//         const categoryCard = document.createElement('div');
//         categoryCard.classList.add('category-card');
//         categoryCard.setAttribute('id', `category-${categoryObj.id}`);

//         const categoryTitle = document.createElement('h2');
//         categoryTitle.textContent = categoryObj.name;

//         const addToDo = document.createElement('button');
//         addToDo.textContent = 'Add To-Do';
//         addToDo.addEventListener('click', (e) => {
//             categoryObj.todos.push(makeToDo([`Todo ${categoryObj.numTodos}`, /*Desc*/, /*Due*/, /*Priority*/, /*Notes*/, categoryObj.numTodos], categoryObj.numTodos++));
//             insertDOM.addToDo(categoryObj.todos.at(-1), categoryObj.id);
//         })

//         categoryCard.append(categoryTitle, addToDo);
//         content.appendChild(categoryCard);
//     }
    
//     static addToDo(todoObj, categoryId) {
//         const todoId = `category-${categoryId}-todo-${todoObj.id}`;

//         const todoCard = document.createElement('div');
//         todoCard.classList.add('todo-card');
//         todoCard.setAttribute('id', `${todoId}`);

//         const todoText = document.createElement('div');
//         todoText.classList.add('todo-text-content');
//         todoText.addEventListener('click', e => {
//             renderDOM.renderToDo(todoObj, document.querySelector(`#${todoId}`));
//         });

//         const todoTitle = document.createElement('p');
//         todoTitle.setAttribute('id', 'todoTitle');
//         todoTitle.textContent = `- ${todoObj.title}`;

//         const todoDueDate = document.createElement('p');
//         todoDueDate.setAttribute('id', 'todoDueDate');
//         todoDueDate.textContent = todoObj.due;

//         todoText.append(todoTitle, todoDueDate);

//         const categoryCard = document.querySelector(`#category-${categoryId}`);

//         const todoRemove = document.createElement('button');
//         todoRemove.textContent = 'x';
//         todoRemove.setAttribute('id', 'todo-remove');
//         todoRemove.addEventListener('click', e => {
//             categoryCard.removeChild(document.querySelector(`#${todoId}`));
//         });

//         todoCard.append(todoText, todoRemove);

//         categoryCard.appendChild(todoCard);
//     }
// }

// export class renderDOM {
 
//     static renderProject(projectObj, projectElem) {
//         handleClick.updateClicked(projectElem);
//         content.textContent = '';
//         for (const category of projectObj.categories) {
//             insertDOM.addCategory(category);
//             for (const todo of category.todos) {
//                 insertDOM.addToDo(todo, category.id);
//             }
//         }
//     }
//     static renderToDo(todoObj, todoElem) {
//         const todoContent = toDoDialog.querySelectorAll('p');
//         const todoArr = [todoObj.title, todoObj.desc, todoObj.due, todoObj.priority, todoObj.notes];

//         for (let i = 0; i < 5; i++) {
//             todoContent[i].contentEditable = 'true';
//             todoContent[i].textContent = todoArr[i];

//             todoContent[i].addEventListener('input', e => {

//                 todoObj[e.target.id] = e.target.textContent;
//                 const todoCardElems = todoElem.querySelectorAll('p');

//                 if (e.target.id == 'title') {
//                     todoCardElems[0].textContent = '- ' + e.target.textContent;
//                 }
//                 else if (e.target.id == 'dueDate') {
//                     todoCardElems[1].textContent = e.target.textContent;
//                 }
//             })
//         }
//         toDoDialog.showModal();
//     }

// }

// class handleClick {

//     static updateClicked(projectElem) {
//         if (this.clicked != undefined) {
//             this.clicked.classList.remove('selected');
//         }
//         this.clicked = projectElem;
//         this.clicked.classList.add('selected');
//     }

// }