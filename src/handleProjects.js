
import projectImg from '/static/task-square-svgrepo-com.svg';
import { Category } from "./handleCategories";
import { projectList } from ".";
import { saveLocal } from ".";

const content = document.querySelector('.content');
const projectListElem = document.querySelector('.project-list');

export class Project {

    categories = [];
    categoryId = 0;
    static projectId = 0;

    constructor(projectName='New Project') {
        this.projectName = projectName;
        this.projectElement = this.#makeProject();
    }

    #makeProject() {
        const projectElem = this.#makeProjectElem();

        const title = this.#makeTitle();
        const projectRemove = this.#makeProjectElemRemoveBtn();

        this.#handleProjectEvents(projectElem, projectRemove);
        
        projectElem.append(title, projectRemove);

        return projectElem;
    }

    #makeTitle() {
        const title = document.createElement('div');
        const titleImg = document.createElement('img');
        const titlePar = document.createElement('p');

        title.classList.add('title');

        titleImg.src = projectImg;
        titleImg.contentEditable = 'false';

        titlePar.textContent = this.projectName;
        this.#handleTitleParEvents(titlePar);

        title.append(titleImg, titlePar);

        return title;
    }
    
    #makeProjectElem() {
        const projectElem = document.createElement('div');
        
        projectElem.classList.add('project');
        projectElem.setAttribute('id', `project-${++Project.projectId}`);
        
        return projectElem;
    }

    #makeProjectElemRemoveBtn() {
        const projectRemove = document.createElement('button');

        projectRemove.textContent = 'x';
        projectRemove.classList.add('remove-project');

        return projectRemove;        
    }

    #handleTitleParEvents(titlePar) {

        titlePar.addEventListener('dblclick', e => e.target.contentEditable = 'true');

        titlePar.addEventListener('blur', e => {
            e.target.contentEditable = 'false';
            if (e.target.textContent.trim() == '') { e.target.textContent = 'Untitled Project' };
        });

        titlePar.addEventListener('keypress', e => { 
            if (e.key == 'Enter') { 
                e.target.contentEditable = 'false';
                if (e.target.textContent.trim() == '') { e.target.textContent = 'Untitled Project' };
            }
        });
    }

    #handleProjectEvents(projectElem, projectRemove) {

        projectElem.addEventListener('click', (e) => {
            if (!e.target.classList.contains('remove-project')) { this.openProject(); }
        });

        projectRemove.addEventListener('click', e => this.removeProject());
    }

    renderProject() {
        projectListElem.append(this.projectElement);
    }

    openProject() {
        content.textContent = '';
        const addCategory = document.createElement('button');
        addCategory.classList.add('add-category');
        addCategory.textContent = 'Add Category';
        addCategory.addEventListener('click', e => this.addCategory());
        
        content.appendChild(addCategory);

        for (const category of this.categories) {
            category.renderCategory();
        }
    }

    removeProject() {
        const projectIndex = projectList.indexOf(this);
        if (projectIndex != -1) { projectList.splice(projectIndex, 1); }

        projectListElem.removeChild(this.projectElement);
        content.textContent = '';

        saveLocal();
    }

    changeText(newText) {
        const projectTitle = this.projectElement.querySelector('.title p');
        projectTitle.textContent = newText;
        this.projectName = newText;
        
        saveLocal();
    }

    addCategory() {
        this.categories.push(new Category(this, ++this.categoryId,));
        this.categories.at(-1).renderCategory();

        saveLocal();
    }
}