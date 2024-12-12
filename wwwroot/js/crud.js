// TODO: yank or disable? I'm thinking yank
const enableDebugLogging = true;
let currentDataset = null;
const properties = {};

async function onLoad() {
    currentDataset = await (await fetch("/api/family/all")).json();
    let diets = [];
    let habits = [];
    let allergies = [];
    let childrenAgeGroups = [];
    let ids = [];

    currentDataset.forEach(family => {
        ids.push(family.id);
        family.diet.forEach(diet => diets.push(diet));
        family.habits.forEach(habit => habits.push(habit));
        family.allergies.forEach(allergy => allergies.push(allergy));
        family.childrenAgeGroups.forEach(childrenAgeGroup => childrenAgeGroups.push(childrenAgeGroup));
    });
    if (enableDebugLogging) {
        console.log("diets: ", diets);
        console.log("habits: ", habits);
        console.log("allergies: ", allergies);
        console.log("childrenAgeGroups: ", childrenAgeGroups);
    }

    diets = new Set(diets);
    habits = new Set(habits);
    allergies = new Set(allergies);
    childrenAgeGroups = new Set(childrenAgeGroups);

    properties.diets = diets;
    properties.habits = habits;
    properties.allergies = allergies;
    properties.childrenAgeGroups = childrenAgeGroups;

    if (enableDebugLogging) {
        console.log("diets: ", diets);
        console.log("habits: ", habits);
        console.log("allergies: ", allergies);
        console.log("childrenAgeGroups: ", childrenAgeGroups);
    }

    PopulateSelect("upload-id", ids);
    PopulateSelect("delete-id", ids);

    PopulateSelect("create-diet", properties.diets);
    PopulateSelect("update-diet", properties.diets);
    
    PopulateSelect("create-habits", properties.habits);
    PopulateSelect("update-habits", properties.habits);


    PopulateSelect("create-allergies", properties.allergies);
    PopulateSelect("update-allergies", properties.allergies);


    PopulateSelect("create-children", properties.childrenAgeGroups);
    PopulateSelect("update-children", properties.childrenAgeGroups);

    totalProperties = diets.size + habits.size + allergies.size + childrenAgeGroups.size;
    if (enableDebugLogging) { console.log(`Total properties: ${totalProperties}`); }
}

function PopulateSelect(target, data) {
    const elem = document.getElementById(target);
    data.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.text = value;
        elem.appendChild(option);
    });
}

async function CreateSubmit() {
    console.log("Called: CreateSubmit");
}
async function UpdateSubmit() {
    console.log("Called: UpdateSubmit");
}

document.addEventListener("DOMContentLoaded", onLoad);