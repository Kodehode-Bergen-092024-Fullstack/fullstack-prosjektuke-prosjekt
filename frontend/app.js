// Fetch JSON data
let familiesData;
// Show all families when the page is loaded, attach applyFilters to checkboxes for immidiate feedback
window.onload = async function () {
  // TODO: after syncing tree and restructuring, change to /api/families/all
  familiesData = (await (await fetch("/frontend/families.json")).json());
  displayFamilies(familiesData.families);
  document.querySelectorAll("input[type=checkbox]").forEach((checkboxElem) => {
    checkboxElem.addEventListener("click", applyFilters);
  });
};

// TODO: Implement applyFilters
function applyFilters() {}

// Function to add families to the page
function displayFamilies(families) {
  const familyList = document.querySelector('.family-list');
  familyList.innerHTML = '';
  
  families.forEach(family => {
    const familyCard = document.createElement('div');
    familyCard.classList.add('family-card');
    familyCard.innerHTML = `
      <img src="${family.image}" alt="${family.name}">
      <h3>${family.name}</h3>
      <p><strong>Family Size:</strong> ${family.familySize} people</p>
      <p>${family.description}</p>
      <button class="book-btn" data-family-id="${family.id}">Book with this family</button>
    `;
    familyList.appendChild(familyCard);
  });
  
  document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', function() {
      const familyId = this.getAttribute('data-family-id');
      alert(`You have booked a Christmas celebration with family ID: ${familyId}`);
    });
  });
}


//Accordion open/close function
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    body.style.display = body.style.display === 'block' ? 'none' : 'block';
  });
});

// Click the apply filter button
const applyFiltersButton = document.getElementById('apply-filters');
applyFiltersButton.addEventListener('click', applyFilters);
