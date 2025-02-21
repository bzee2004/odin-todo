
import { saveLocal } from ".";

const toDoDialog = document.querySelector('#display-todo');

export class ToDo {

    constructor(category, toDoId, title="New To-Do", desc='Description', dueDate='Due Date', priority='N/A', notes='N/A') {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.toDoElement = this.#makeToDo(category.categoryElement, toDoId);
    }

    #makeToDo(categoryElem, toDoId) {

        const todoCard = document.createElement('div');
        const todoText = document.createElement('div');
        const todoTitle = document.createElement('p');
        const todoDueDate = document.createElement('p');

        todoCard.classList.add('todo-card');
        todoCard.setAttribute('id', `${categoryElem.id}-todo-${toDoId}`);

        todoText.classList.add('todo-text-content');
        todoText.addEventListener('click', e => {
            this.openToDo();
        });

        todoTitle.setAttribute('id', 'todoTitle');
        todoTitle.textContent = `- ${this.title}`;

        todoDueDate.setAttribute('id', 'todoDueDate');
        todoDueDate.textContent = this.dueDate;

        todoText.append(todoTitle, todoDueDate);

        const todoRemove = document.createElement('button');
        todoRemove.textContent = 'x';
        todoRemove.setAttribute('id', 'todo-remove');
        todoRemove.addEventListener('click', e => {
            categoryElem.removeChild(this.toDoElement);
        });

        todoCard.append(todoText, todoRemove);

        return todoCard;
    }

    renderToDo(categoryElem) {
        categoryElem.append(this.toDoElement);
    }

    openToDo() {
        const todoContent = toDoDialog.querySelectorAll('p');
        const todoArr = [this.title, this.desc, this.dueDate, this.priority, this.notes];

        for (let i = 0; i < 5; i++) {
            todoContent[i].textContent = todoArr[i];

            todoContent[i].addEventListener('mouseover', e => {
                e.target.contentEditable = 'true';
            })
            todoContent[i].addEventListener('mouseleave', e => {
                e.target.contentEditable = 'false';
            })

            todoContent[i].addEventListener('input', e => {
                this.changeText(e);
            })
        }

        toDoDialog.showModal();
    }    

    changeText(event) {
        const target = event.target.id;
        this[target] = event.target.textContent;

        if (target == 'title') {
            this.toDoElement.querySelector('#todoTitle').textContent = event.target.textContent;
        }
        else if (target == 'dueDate') {
            this.toDoElement.querySelector('#todoDueDate').textContent = event.target.textContent;
        }

        saveLocal();
    }
}
