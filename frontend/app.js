// Family information with JSON
const families = [
  {
    name: "The Smiths",
    title: "Family of 4",
    description: "We love celebrating Christmas with cozy decorations and good food.",
    preferences: ["No pets", "Vegetarian-friendly"],
    image: "family1.jpg",
    diet: ["vegetarian"],
    habits: [],
    allergies: [],
    children: ["4-10"]
  },
  {
    name: "The Johnsons",
    title: "Family of 6",
    description: "Looking forward to sharing the holiday spirit with others.",
    preferences: ["No allergies", "Kid-friendly"],
    image: "family2.jpg",
    diet: [],
    habits: [],
    allergies: ["nuts"],
    children: ["0-3", "11-17"]
  },
  {
    name: "Family Pedersen",
    title: "Family of 3",
    description: "Enjoys cozy evenings and homemade meals.",
    preferences: ["No gluten"],
    image: "family3.jpg",
    diet: ["halal"],
    habits: ["smoker"],
    allergies: ["gluten"],
    children: ["4-10"]
  }
];

// Select HTML elements
const familyList = document.querySelector(".family-list");
const filterForm = document.getElementById("filter-form");
const applyFilters = document.getElementById("apply-filters");

// Function to display family cards
function displayFamilies(filteredFamilies) {
  familyList.innerHTML = ""; // Clear existing cards
  filteredFamilies.forEach((family) => {
    const familyCard = document.createElement("div");
    familyCard.classList.add("family-card");
    familyCard.innerHTML = `
      <img src="${family.image}" alt="${family.name}">
      <h3>${family.name}</h3>
      <p>${family.title}</p>
      <p>${family.description}</p>
      <p><strong>Preferences:</strong> ${family.preferences.join(", ")}</p>
    `;
    familyList.appendChild(familyCard);
  });
}

// Filter families based on selected criteria
applyFilters.addEventListener("click", () => {
  const selectedDiet = Array.from(filterForm.querySelectorAll('input[name="diet"]:checked')).map((input) => input.value);
  const selectedHabits = Array.from(filterForm.querySelectorAll('input[name="habits"]:checked')).map((input) => input.value);
  const selectedAllergies = Array.from(filterForm.querySelectorAll('input[name="allergies"]:checked')).map((input) => input.value);
  const selectedChildrenAge = Array.from(filterForm.querySelectorAll('input[name="children-age"]:checked')).map((input) => input.value);

  const filteredFamilies = families.filter((family) => {
    return (
      (selectedDiet.length === 0 || selectedDiet.some((diet) => family.diet.includes(diet))) &&
      (selectedHabits.length === 0 || selectedHabits.some((habit) => family.habits.includes(habit))) &&
      (selectedAllergies.length === 0 || selectedAllergies.every((allergy) => family.allergies.includes(allergy))) &&
      (selectedChildrenAge.length === 0 || selectedChildrenAge.some((age) => family.children.includes(age)))
    );
  });

  displayFamilies(filteredFamilies);
});

// Display all families initially
displayFamilies(families);
