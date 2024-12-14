// API URL and global variables
const API_URL = "/api/family/all";
console.log("API URL:", API_URL);
let families = [];
const output = document.querySelector(".family-list");
const searchInput = document.getElementById("search");
const filters = document.querySelectorAll('#filters input[type="checkbox"], #filters input[type="radio"]');

// Fetch JSON data and display all families on the screen
async function fetchFamilies() {
  try {
    const response = await fetch(API_URL); // API endpoint
    if (!response.ok) throw new Error("Failed to fetch data");
    families = await response.json(); // Load families data
    console.log("Families loaded:", families);
    renderFamilies(families); // Render families on load
  } catch (error) {
    console.error("Error fetching families:", error);
  }
}

// Render family cards on the screen
function renderFamilies(array) {
  output.innerHTML = ""; // Clear previous data
  if (array.length === 0) {
    output.innerHTML = `<p>No families found. Check filters.</p>`;
  } else {
    array.forEach((family) => {
      const familyCard = document.createElement("div");
      familyCard.classList.add("family-card");
      familyCard.innerHTML = `
        <img src="${family.image}" alt="${family.name}">
        <h3>${family.name}</h3>
        <p>${family.description}</p>
        <button class="btn-book" onclick="openBookingModal('${family.id}')">Book Now</button>
      `;
      output.appendChild(familyCard);
    });
  }
}

// Filter families based on user input
function filterFamilies() {
  const searchQuery = searchInput.value.toLowerCase().trim(); // Get search query
  const selectedCelebrateSizes = Array.from(document.querySelectorAll("input[data-celebration-size]:checked"))
    .map(input => input.getAttribute("data-celebration-size"));
  const selectedDiets = Array.from(document.querySelectorAll('input[data-trait="diet"]:checked'))
    .map(input => input.getAttribute("data-trait-value"));
  const selectedHabits = Array.from(document.querySelectorAll('input[data-trait="habit"]:checked'))
    .map(input => input.getAttribute("data-trait-value"));
  const hasPetsFilter = document.querySelector('input[name="hasPets"]:checked')
    ? document.querySelector('input[name="hasPets"]:checked').getAttribute("data-pets")
    : null;
  const selectedPetAllergies = Array.from(document.querySelectorAll('input[data-trait="pet-allergy"]:checked'))
    .map(input => input.getAttribute("data-trait-value"));
  const selectedAgeGroups = Array.from(document.querySelectorAll("input[data-group]:checked"))
    .map(input => input.getAttribute("data-group"));
  const selectedFoodAllergies = Array.from(document.querySelectorAll('input[data-allergies-food]:checked'))
    .map(input => input.getAttribute("data-allergies-food"));
  const otherFoodAllergy = document.getElementById("other-allergy-text-food").value.trim();
  if (otherFoodAllergy) {
    selectedFoodAllergies.push(otherFoodAllergy.toLowerCase());
  }

  console.log("Search Query:", searchQuery);

  const filteredFamilies = families.filter(family => {
    const matchesCelebrateSize = selectedCelebrateSizes.length === 0 ||
      selectedCelebrateSizes.some(size => {
        const [min, max] = size.includes("+") ? [7, Infinity] : size.split("-").map(Number);
        return family.celebrateSize >= min && family.celebrateSize <= max;
      });
    const matchesDiet = selectedDiets.length === 0 || selectedDiets.every(diet => family.diet.includes(diet));
    const matchesHabits = selectedHabits.length === 0 ||
      selectedHabits.every(habit =>
        family.habits?.map(h => h.toLowerCase()).includes(habit.toLowerCase())
      );
    const matchesHasPets = hasPetsFilter === null ||
      (hasPetsFilter === "yes" && family.hasPets) ||
      (hasPetsFilter === "no" && !family.hasPets);
    const matchesPetAllergies = selectedPetAllergies.length === 0 ||
      !selectedPetAllergies.some(allergy => family.pet?.includes(allergy));
    const matchesAgeGroups = selectedAgeGroups.length === 0 ||
      selectedAgeGroups.some(ageGroup => family.childrenAgeGroups?.includes(ageGroup));
    const matchesFoodAllergies = selectedFoodAllergies.length === 0 ||
      selectedFoodAllergies.every(foodAllergy => family.allergies?.includes(foodAllergy));
    const matchesSearchQuery = family.name?.toLowerCase().includes(searchQuery) ||
      family.description?.toLowerCase().includes(searchQuery);

    return matchesCelebrateSize && matchesDiet && matchesHabits && matchesHasPets && matchesPetAllergies && matchesAgeGroups && matchesFoodAllergies && matchesSearchQuery;
  });

  console.log("Filtered Families:", filteredFamilies);
  renderFamilies(filteredFamilies);
}

// Add event listeners to filters and search inputs
document.addEventListener("DOMContentLoaded", () => {
  fetchFamilies();
  document.querySelectorAll("input[data-celebration-size], input[data-trait='diet'], input[data-trait='habit'], input[name='hasPets'], input[data-trait='pet-allergy'], input[data-group], input[data-allergies-food]").forEach(input => {
    input.addEventListener("change", filterFamilies);
  });

  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", filterFamilies);
  searchInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
      filterFamilies();
    }
  });
});

// other of pet-allergy
document.addEventListener("DOMContentLoaded", () => {
  const otherAllergyCheckbox = document.getElementById("other-allergy-checkbox");
  const otherAllergyText = document.getElementById("other-allergy-text");
  const otherAllergyMessage = document.getElementById("other-allergy-message");
  const sendOtherAllergyInfoButton = document.getElementById("send-other-allergy-info-btn");

  // Handle checkbox change event
  otherAllergyCheckbox.addEventListener("change", () => {
    if (otherAllergyCheckbox.checked) {
      otherAllergyText.style.display = "block"; // Show text area
      sendOtherAllergyInfoButton.style.display = "block"; // Show send button
    } else {
      otherAllergyText.style.display = "none"; // Hide text area
      sendOtherAllergyInfoButton.style.display = "none"; // Hide send button
      otherAllergyText.value = ""; // Clear text area
      otherAllergyMessage.style.display = "none"; // Hide confirmation message
    }
  });

  // Handle send button click event
  sendOtherAllergyInfoButton.addEventListener("click", () => {
    const allergyInfo = otherAllergyText.value.trim();
    if (allergyInfo === "") {
      alert("Please specify your allergy description."); // Alert if no input
      return;
    }
    otherAllergyMessage.style.display = "block"; // Show confirmation message
    otherAllergyMessage.textContent = `Your information (${allergyInfo}) has been sent to the family you choose.`; // Update message content
    otherAllergyText.value = ""; // Clear text area
    otherAllergyCheckbox.checked = false; // Uncheck checkbox
  });
});

// Handle "Other" option for allergies
document.addEventListener("DOMContentLoaded", () => {
  const otherAllergyCheckboxFood = document.getElementById("other-allergy-checkbox-food");
  const otherAllergyTextFood = document.getElementById("other-allergy-text-food");
  const otherAllergyMessageFood = document.getElementById("allergy-message-food");
  const sendOtherAllergyInfoButtonFood = document.getElementById("send-allergy-food-info");

  otherAllergyCheckboxFood.addEventListener("change", () => {
    if (otherAllergyCheckboxFood.checked) {
      otherAllergyTextFood.style.display = "block";
      sendOtherAllergyInfoButtonFood.style.display = "block";
    } else {
      otherAllergyTextFood.style.display = "none";
      sendOtherAllergyInfoButtonFood.style.display = "none";
      otherAllergyTextFood.value = "";
      otherAllergyMessageFood.style.display = "none";
    }
  });

  sendOtherAllergyInfoButtonFood.addEventListener("click", () => {
    const allergyInfoFood = otherAllergyTextFood.value.trim();
    if (allergyInfoFood === "") {
      alert("Please specify your allergy description.");
      return;
    }
    otherAllergyMessageFood.style.display = "block";
    otherAllergyMessageFood.textContent = `Your information (${allergyInfoFood}) has been sent to the family you choose.`;
    otherAllergyTextFood.value = "";
    otherAllergyCheckboxFood.checked = false;
  });
});

// Accordion logic for filter toggling
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const parent = header.parentElement;
    if (parent.classList.contains("open")) {
      parent.classList.remove("open");
    } else {
      document.querySelectorAll(".accordion-item.open").forEach(item => item.classList.remove("open"));
      parent.classList.add("open");
    }
  });
});
