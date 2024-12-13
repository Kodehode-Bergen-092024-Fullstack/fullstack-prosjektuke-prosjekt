// 1️⃣ API URL and global variables
const API_URL = "data.json";
let families = [];
const output = document.querySelector(".family-list");
const searchInput = document.getElementById("search");
const filters = document.querySelectorAll('#filters input[type="checkbox"], #filters input[type="radio"]');

// 2️⃣ Fetch JSON data and display all families on the screen
async function fetchFamilies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to load data!");
    families = await response.json();
    renderFamilies(families);
  } catch (error) {
    console.error("An error occurred while retrieving data:", error);
  }
}

// 3️⃣ Render family cards on the screen
function renderFamilies(array) {
  output.innerHTML = "";
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
        <button class="btn-book" onclick="openBookingModal(${family.id})">Book Now</button>
      `;
      output.appendChild(familyCard);
    });
  }
}

// Filter families based on user input
function filterFamilies() {
  const searchQuery = searchInput.value.toLowerCase();
  const selectedCelebrateSizes = Array.from(
    document.querySelectorAll("input[data-celebration-size]:checked")
  ).map((input) => input.getAttribute("data-celebration-size"));

  const selectedDiets = Array.from(
    document.querySelectorAll('input[data-trait="diet"]:checked')
  ).map((input) => input.getAttribute("data-trait-value"));

  const selectedHabits = Array.from(
    document.querySelectorAll('input[data-trait="habit"]:checked')
  ).map((input) => input.getAttribute("data-trait-value"));

  const hasPetsFilter = document.querySelector('input[name="hasPets"]:checked')
    ? document.querySelector('input[name="hasPets"]:checked').getAttribute("data-pets")
    : null;

  const selectedAllergies = Array.from(
    document.querySelectorAll('input[data-trait="allergy"]:checked')
  ).map((input) => input.getAttribute("data-trait-value"));

  const selectedAgeGroups = Array.from(
    document.querySelectorAll("input[data-group]:checked")
  ).map((input) => input.getAttribute("data-group"));

  const filteredFamilies = families.filter((family) => {
    const matchesSearchQuery =
      family.name?.toLowerCase().includes(searchQuery) ||
      family.description?.toLowerCase().includes(searchQuery);

    const matchesCelebrateSize =
      selectedCelebrateSizes.length === 0 ||
      selectedCelebrateSizes.some((range) => {
        const [min, max] = range.includes("+")
          ? [7, Infinity]
          : range.split("-").map(Number);
        return family.celebratesize >= min && family.celebratesize <= max;
      });

    const matchesDiet =
      selectedDiets.length === 0 ||
      selectedDiets.every((selectedDiet) =>
        family.diet?.includes(selectedDiet)
      );

    const matchesHabits =
      selectedHabits.length === 0 ||
      selectedHabits.every((selectedHabit) =>
        family.habits?.map((h) => h.toLowerCase()).includes(selectedHabit.toLowerCase())
      );

    const matchesHasPets =
      hasPetsFilter === null ||
      (hasPetsFilter === "yes" && family.hasPets) ||
      (hasPetsFilter === "no" && !family.hasPets);

    const familyPets = family.pet ?? [];
    const matchesAllergies = 
      selectedAllergies.length === 0 || 
      !selectedAllergies.some((allergy) => 
        familyPets.map((pet) => pet?.toLowerCase()).includes(allergy?.toLowerCase())
      );

    const matchesAgeGroups =
      selectedAgeGroups.length === 0 ||
      selectedAgeGroups.some((ageGroup) =>
        family.childrenAgeGroups?.includes(ageGroup)
      );

    return (
      matchesSearchQuery &&
      matchesCelebrateSize &&
      matchesDiet &&
      matchesHabits &&
      matchesHasPets &&
      matchesAllergies &&
      matchesAgeGroups
    );
  });

  renderFamilies(filteredFamilies);
}

// Add event listeners for filters and search input
searchInput.addEventListener("input", filterFamilies);
filters.forEach((filter) => filter.addEventListener("change", filterFamilies));

// Fetch family data on page load
fetchFamilies();

// Accordion logic for opening and closing filter items
const accordionHeaders = document.querySelectorAll(".accordion-header");
accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const parent = header.parentElement;
    if (parent.classList.contains("open")) {
      parent.classList.remove("open");
    } else {
      document.querySelectorAll(".accordion-item.open").forEach((item) => item.classList.remove("open"));
      parent.classList.add("open");
    }
  });
});

// Allergy input field toggle logic
const otherAllergyCheckbox = document.getElementById('other-allergy-checkbox');
const otherAllergyText = document.getElementById('other-allergy-text');
const allergyMessage = document.getElementById('allergy-message');
const sendAllergyInfoButton = document.getElementById('send-allergy-info-btn');

otherAllergyCheckbox.addEventListener('change', function () {
  if (otherAllergyCheckbox.checked) {
    otherAllergyText.style.display = 'block';
  } else {
    otherAllergyText.style.display = 'none';
    otherAllergyText.value = '';
    allergyMessage.style.display = 'none';
  }
});

sendAllergyInfoButton.addEventListener('click', function () {
  const allergyInfo = otherAllergyText.value.trim();
  if (otherAllergyCheckbox.checked && allergyInfo !== '') {
    allergyMessage.style.display = 'block';
    otherAllergyText.value = '';
  } else {
    alert('Please enter an allergy description.');
    allergyMessage.style.display = 'none';
  }
});

// Additional Information section logic
const additionalInfoText = document.getElementById('additional-info-text');
const additionalMessage = document.getElementById('additional-message');
const sendAdditionalInfoButton = document.getElementById('send-additional-info-btn');

sendAdditionalInfoButton.addEventListener('click', function () {
  const additionalInfo = additionalInfoText.value.trim();
  if (additionalInfo !== '') {
    additionalMessage.style.display = 'block';
    additionalInfoText.value = '';
  } else {
    alert('Please enter additional information.');
    additionalMessage.style.display = 'none';
  }
});
