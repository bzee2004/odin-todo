
import { ToDo } from "./handleToDos";
import { saveLocal } from ".";


const content = document.querySelector('.content');

export class Category {

    todos = [];
    toDoId = 0;

    constructor(project, categoryId, categoryName="New Category") {
        this.categoryName = categoryName;
        this.project = project
        this.categoryElement = this.#makeCategory(project.projectElement, categoryId);
    }

    #makeCategory(projectElem, categoryId) {
        const categoryCard = document.createElement('div');
        const categoryTitle = document.createElement('h2');
        const addToDo = document.createElement('button');

        categoryCard.classList.add('category-card');
        categoryCard.setAttribute('id', `${projectElem.id}-category-${categoryId}`);

        categoryTitle.textContent = this.categoryName;

        addToDo.textContent = 'Add To-Do';
        addToDo.addEventListener('click', (e) => {
            this.addToDo();
        })

        const categoryRemove = document.createElement('button');
        categoryRemove.textContent = 'x';
        categoryRemove.setAttribute('id', 'category-remove');
        categoryRemove.addEventListener('click', e => {
            this.removeCategory(this.project)
            content.removeChild(this.categoryElement);
        });

        categoryCard.append(categoryTitle, addToDo, categoryRemove);

        return categoryCard;
    }

    renderCategory() {
        content.appendChild(this.categoryElement);

        for (let todo of this.todos) {
            todo.renderToDo(this.categoryElement);
        }
    }

    addToDo() {
        this.todos.push(new ToDo(this, ++this.toDoId));
        this.todos.at(-1).renderToDo(this.categoryElement);

        saveLocal();
    }

    removeCategory(project) {
        const categoryId = this.categoryElement.id;        
        const categoryIndex = project.categories.indexOf(this)

        project.categories.splice(categoryIndex, 1);    
        
        saveLocal();
    }
}