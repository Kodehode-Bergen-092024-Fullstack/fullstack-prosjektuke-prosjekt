// TODO: yank or disable? I'm thinking yank
const enableDebugLogging = true;
let currentDataset = null;

async function onLoad() {
    currentDataset = await (await fetch("/api/family/all")).json();
    let diets = [];
    let habits = [];
    let allergies = [];
    let childrenAgeGroups = [];

    currentDataset.forEach(family => {
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

    if (enableDebugLogging) {
        console.log("diets: ", diets);
        console.log("habits: ", habits);
        console.log("allergies: ", allergies);
        console.log("childrenAgeGroups: ", childrenAgeGroups);
    }

    totalProperties = diets.size + habits.size + allergies.size + childrenAgeGroups.size;
    if (enableDebugLogging) { console.log(`Total properties: ${totalProperties}`); }
}
document.addEventListener("DOMContentLoaded", onLoad);