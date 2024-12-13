// 1️⃣ API URL and global variables
const API_URL = "data.json";
let families = [];
const output = document.querySelector(".family-list");
const searchInput = document.getElementById("search");
const filters = document.querySelectorAll('#filters input[type="checkbox"], #filters input[type="radio"]');

// 2️⃣ Fetch JSON data and display all families on the screen
async function fetchFamilies() {
  const loadingMessage = document.getElementById('loading');
  loadingMessage.style.display = 'block'; // Show loading message

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to load data!");
    families = await response.json(); // Load families data from JSON
    renderFamilies(families); // Display families on page load
  } catch (error) {
    console.error("An error occurred while retrieving data:", error);
  } finally {
    loadingMessage.style.display = 'none'; // Hide loading message
  }
}

// 3️⃣ Render family cards on the screen
function renderFamilies(array) {
  output.innerHTML = ""; // Clear previous family list
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
      output.appendChild(familyCard); // Append family card to DOM
    });
  }
}


// 4️⃣ Filter families based on user input
function filterFamilies() {
  
  const searchQuery = searchInput.value.toLowerCase().trim();
  console.log('search query:', searchQuery); // 🔥 Konsolda arama sorgusunu gör


  const selectedCelebrateSizes = Array.from(document.querySelectorAll("input[data-celebration-size]:checked"))
    .map(input => input.getAttribute("data-celebration-size"));

  const selectedDiets = Array.from(document.querySelectorAll('input[data-trait="diet"]:checked'))
    .map(input => input.getAttribute("data-trait-value"));

  const selectedHabits = Array.from(document.querySelectorAll('input[data-trait="habit"]:checked'))
    .map(input => input.getAttribute("data-trait-value"));

  const hasPetsFilter = document.querySelector('input[name="hasPets"]:checked')
    ? document.querySelector('input[name="hasPets"]:checked').getAttribute("data-pets")
    : null;

  const selectedAllergies = Array.from(document.querySelectorAll('input[data-trait="allergy"]:checked'))
    .map(input => input.getAttribute("data-trait-value"));

  const selectedFoodAllergies = Array.from(document.querySelectorAll('input[data-allergies-food]:checked'))
    .map(input => input.getAttribute("data-allergies-food"));

  const selectedAgeGroups = Array.from(document.querySelectorAll("input[data-group]:checked"))
    .map(input => input.getAttribute("data-group"));

  const filteredFamilies = families.filter(family => {
    const matchesSearchQuery = family.name?.toLowerCase().includes(searchQuery) ||
      family.description?.toLowerCase().includes(searchQuery);

    const matchesCelebrateSize = selectedCelebrateSizes.length === 0 ||
      selectedCelebrateSizes.some(range => {
        const [min, max] = range.includes("+") ? [7, Infinity] : range.split("-").map(Number);
        return family.celebratesize >= min && family.celebratesize <= max;
      });

    const matchesDiet = selectedDiets.length === 0 || selectedDiets.every(diet => family.diet?.includes(diet));

    const matchesHabits = selectedHabits.length === 0 || 
    selectedHabits.every(habit => 
      family.habits?.map(h => h.toLowerCase()).includes(habit.toLowerCase())
    );

    const matchesHasPets = hasPetsFilter === null ||
      (hasPetsFilter === "yes" && family.hasPets) ||
      (hasPetsFilter === "no" && !family.hasPets);

    const matchesAllergies = selectedAllergies.length === 0 ||
      !selectedAllergies.some(allergy => family.pet?.includes(allergy));

    const matchesFoodAllergies = selectedFoodAllergies.length === 0 ||
      selectedFoodAllergies.every(foodAllergy => !family.allergies?.includes(foodAllergy));

    const matchesAgeGroups = selectedAgeGroups.length === 0 ||
      selectedAgeGroups.some(ageGroup => family.childrenAgeGroups?.includes(ageGroup));

      

    return matchesSearchQuery && matchesCelebrateSize && matchesDiet && matchesHabits &&
      matchesHasPets && matchesAllergies && matchesFoodAllergies && matchesAgeGroups;
  });

  renderFamilies(filteredFamilies); // Display filtered families
}
// 📌 5️⃣ Search Butonuna tıklama ve Enter tuşu ile arama

const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", filterFamilies); // Butona tıklama
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    filterFamilies(); // Enter tuşuna basıldığında filtreleme çalışır
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const otherAllergyCheckbox = document.getElementById("other-allergy-checkbox");
  const otherAllergyText = document.getElementById("other-allergy-text");
  const otherAllergyMessage = document.getElementById("other-allergy-message");
  const sendOtherAllergyInfoButton = document.getElementById("send-other-allergy-info-btn");

  otherAllergyCheckbox.addEventListener("change", () => {
    if (otherAllergyCheckbox.checked) {
      otherAllergyText.style.display = "block"; 
      sendOtherAllergyInfoButton.style.display = "block"; 
    } else {
      otherAllergyText.style.display = "none"; 
      sendOtherAllergyInfoButton.style.display = "none"; 
      otherAllergyText.value = ""; 
      otherAllergyMessage.style.display = "none"; 
    }
  });

  sendOtherAllergyInfoButton.addEventListener("click", () => {
    const allergyInfo = otherAllergyText.value.trim();
    if (allergyInfo === "") {
      alert("Please specify your allergy description.");
      return;
    }
    otherAllergyMessage.style.display = "block"; 
    otherAllergyMessage.textContent = `Your information (${allergyInfo}) has been sent to the family you choose.`;
    otherAllergyText.value = ""; 
    otherAllergyCheckbox.checked = false; 
  });
});

// 5️⃣ Handle "Other" Options for Food Allergies
document.addEventListener("DOMContentLoaded", () => {
  const otherAllergyCheckboxFood = document.getElementById("other-allergy-checkbox-food");
  const otherAllergyTextFood = document.getElementById("other-allergy-text-food");
  const otherAllergyMessageFood = document.getElementById("allergy-message-food");
  const sendOtherAllergyInfoButtonFood = document.getElementById("send-allergy-food-info");

  otherAllergyCheckboxFood.addEventListener("change", () => {
    if (otherAllergyCheckboxFood.checked) {
      otherAllergyTextFood.style.display = "block"; // Show textarea
      sendOtherAllergyInfoButtonFood.style.display = "block"; // Show button
    } else {
      otherAllergyTextFood.style.display = "none"; // Hide textarea
      sendOtherAllergyInfoButtonFood.style.display = "none"; // Hide button
      otherAllergyTextFood.value = ""; // Clear text
      otherAllergyMessageFood.style.display = "none"; // Hide message
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
    otherAllergyTextFood.value = ""; // Clear text
    otherAllergyCheckboxFood.checked = false; // Uncheck "Other"
  });
});

// 6️⃣ Accordion logic for opening and closing filter items
const accordionHeaders = document.querySelectorAll(".accordion-header");
accordionHeaders.forEach(header => {
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



// Fetch family data on page load
fetchFamilies();
