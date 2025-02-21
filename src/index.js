import './global.css';
import { Project } from './handleProjects';
import { ToDo } from './handleToDos';
import { Category } from './handleCategories';

const addProject = document.querySelector('#add-project');
const closeDialog = document.querySelector('#close-dialog');
const toDoDialog = document.querySelector('#display-todo');

const body = document.querySelector('body');

export const projectList = [];

addProject.addEventListener('click', e => {
    const newProject = new Project();
    projectList.push(newProject);
    newProject.renderProject();

    saveLocal();
});

closeDialog.addEventListener('click', e => {
    toDoDialog.close();

    saveLocal();
});

function loadLocal() {
    let loadedContent = window.localStorage.getItem('projectHistory');
    loadedContent = JSON.parse(loadedContent);

    const parser = new DOMParser();

    if (loadedContent != null && loadedContent.length > 0) {        

        for (let p in loadedContent) {
            loadedContent[p] = JSON.parse(loadedContent[p]);

            const projectName = loadedContent[p].projectName;

            const newProject = new Project(projectName);
            projectList.push(newProject);

            for (let c in loadedContent[p].categories) {

                const categoryName = loadedContent[p].categories[c].categoryName;
                const newCategory = new Category(newProject, ++newProject.categoryId, categoryName);
                newProject.categories.push(newCategory);
                
                for (let t in loadedContent[p].categories[c].todos) {

                    const title = loadedContent[p].categories[c].todos[t].title;
                    const desc = loadedContent[p].categories[c].todos[t].desc;
                    const dueDate = loadedContent[p].categories[c].todos[t].dueDate;
                    const priority = loadedContent[p].categories[c].todos[t].priority;
                    const notes = loadedContent[p].categories[c].todos[t].notes;

                    const newToDo = new ToDo(newCategory, ++newCategory.toDoId, title, desc, dueDate, priority, notes);
                    newCategory.todos.push(newToDo);
                }
            }
        }
        
        const content = document.querySelector('.content');
        content.textContent = '';
        
        for (const project of projectList) {
            project.renderProject(project, true);
        }
        projectList[0].openProject();
    }
    
    else {
        // If nothing in local storage, make default todo list
        const testProject = new Project();
        projectList.push(testProject);

        testProject.renderProject();
        testProject.openProject();
        testProject.addCategory();
        testProject.categories.at(-1).addToDo();
        testProject.changeText('Home');
    }
}

export function saveLocal() {

    let contentToAdd = [];

    // const existingContent = JSON.parse(window.localStorage.getItem('projectHistory'));
    // console.log(existingContent);
    // if (existingContent != null && existingContent.length > 1) { contentToAdd = existingContent; }

    for (const project of projectList) {
        const savedProject = JSON.stringify(project, (key, value) => {
            if (key != 'project') {
                if (value.outerHTML != undefined) {
                    return value.outerHTML;
                }
                return value;
            }
        });
        contentToAdd.push(savedProject);
    }
    window.localStorage.setItem('projectHistory', JSON.stringify(contentToAdd));
}

document.addEventListener('DOMContentLoaded', () => {
    loadLocal();
});  


