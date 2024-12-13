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

    PopulateSelect("update-id", ids);
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

// TODO: pop-up modal with response information?
async function CreateSubmit() {
    console.log("Called: CreateSubmit");

    const get = ValueFromTarget;

    const data = {
        name: get("create-name"),
        familySize: Number(get("create-size")),
        description: get("create-description"),
        diet: [get("create-diet") ? get("create-diet") : null],
        habits: [get("create-habits") ? get("create-habits") : null],
        hasPets: get("create-pets") === "on" ? true : false,
        allergies: [get("create-allergies") === "none" ? null : get("create-allergies")],
        childrenAgeGroups: [get("create-children") ? get("create-children") : null],
        image: get("create-image")
    };

    console.log("Data: ", data);

    const resp = await fetch("/api/family", {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({ "content-type": "text/json" })
    });

    console.log(resp);

    console.log(await resp.json());
}

// TODO: pop-up modal with response information?
async function UpdateSubmit() {
    console.log("Called: UpdateSubmit");

    const get = ValueFromTarget;

    const data = {
        id: get("update-id"),
        name: get("update-name"),
        familySize: Number(get("update-size")),
        description: get("update-description"),
        diet: [get("update-diet") ? get("update-diet") : null],
        habits: [get("update-habits") ? get("update-habits") : null],
        hasPets: get("update-pets") === "on" ? true : false,
        allergies: [get("update-allergies") === "none" ? null : get("update-allergies")],
        childrenAgeGroups: [get("update-children") ? get("update-children") : null],
        image: get("update-image")
    };

    console.log("Data: ", data);

    const resp = await fetch(`/api/family/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({ "content-type": "application/json" })
    });

    console.log(resp);
}

// TODO: pop-up modal with response information?
async function DeleteSubmit() {
    console.log("Called: DeleteSubmit");

    const get = ValueFromTarget;
    const id = get("delete-id")
    console.log("Id: ", id);

    const resp = await fetch(`/api/family/${id}`, {
        method: "DELETE"
    });

    console.log(resp);
}

function ValueFromTarget(target) {
    console.log("Target: ", target);
    return document.getElementById(target).value;
}

function UpdateTargetValue(target, value) {
    console.log("Target: ", target);
    document.getElementById(target).value = value;
}

function FillExisting() {
    console.log("Called: FillExisting");

    const get = ValueFromTarget;
    const set = UpdateTargetValue;

    const selectedId = Number(get("update-id"));
    if (enableDebugLogging) console.log("SelectedId: ", selectedId);
    const selectedData = currentDataset.find((data) => { return data.id === selectedId });
    if (enableDebugLogging) console.log("SelectedData: ", selectedData);
    if (!selectedData) return;

    set("update-name", selectedData.name);
    set("update-size", selectedData.familySize);
    set("update-description", selectedData.description);
    set("update-diet", selectedData.diet[0] ? selectedData.diet[0] : "none");
    set("update-habits", selectedData.habits[0] ? selectedData.habits[0] : "none");
    set("update-pets", selectedData.pets ? "on" : "off");
    set("update-allergies", selectedData.allergies[0] ? selectedData.allergies[0] : "none");
    set("update-children", selectedData.childrenAgeGroups);
    set("update-image", selectedData.image);
}

document.addEventListener("DOMContentLoaded", onLoad);