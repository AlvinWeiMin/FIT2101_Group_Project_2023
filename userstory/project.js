const projectForm = document.getElementById("projectForm");
const projectName = document.getElementById("projectName");
const projectList = document.getElementById("projectList");


const addProject = (projectName) => {
    const projectLst = document.createElement("li");
    projectLst.textContent = projectName;
    projectList.appendChild(projectLst);
}

projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const projectName = projectNameInput.value;

    addProject(projectName);
    projectNameInput.value = "";
});