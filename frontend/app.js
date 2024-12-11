// Fetch JSON data
const familiesData = {
  "families": [
    {
      "id": 1,
      "name": "The Holiday Family",
      "familySize": 4,
      "description": "A cheerful family that loves celebrating Christmas together by the fireplace.",
      "diet": ["Vegetarian-friendly"],
      "habits": ["Non-smoker"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": ["4-10"],
      "image": "./image/familie/family1.jpg"
    },
    {
      "id": 2,
      "name": "The Festive Family",
      "familySize": 6,
      "description": "A warm and lively family that enjoys celebrating Christmas with loved ones.",
      "diet": ["Halal"],
      "habits": ["No alcohol"],
      "hasPets": true,
      "allergies": ["gluten"],
      "childrenAgeGroups": ["0-3", "4-10"],
      "image": "./image/familie/family2.jpg"
    },
    {
      "id": 3,
      "name": "The Joyful Family",
      "familySize": 4,
      "description": "A happy and caring family who enjoys cozy winter nights by the fireplace.",
      "diet": ["Vegetarian-friendly"],
      "habits": ["Non-smoker"],
      "hasPets": false,
      "allergies": ["nuts"],
      "childrenAgeGroups": ["0-3", "4-10"],
      "image": "./image/familie/family3.jpg"
    },
    {
      "id": 4,
      "name": "The Cozy Family",
      "familySize": 5,
      "description": "A close-knit family that loves spending time together during the holidays.",
      "diet": ["Vegetarian-friendly", "Lactose-free"],
      "habits": ["No alcohol"],
      "hasPets": false,
      "allergies": ["gluten"],
      "childrenAgeGroups": ["0-3", "4-10"],
      "image": "./image/familie/family4.jpg"
    },
    {
      "id": 5,
      "name": "The Jolly Family",
      "familySize": 5,
      "description": "A festive family that brings the holiday spirit wherever they go.",
      "diet": ["Vegetarian-friendly"],
      "habits": ["Non-smoker", "No alcohol"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": ["0-3", "4-10"],
      "image": "./image/familie/family5.jpg"
    },
    {
      "id": 6,
      "name": "The Nordic Family",
      "familySize": 3,
      "description": "A small and loving family enjoying the Christmas season surrounded by Norwegian traditions.",
      "diet": ["Vegetarian-friendly"],
      "habits": ["No alcohol"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": ["0-3"],
      "image": "./image/familie/family6.jpg"
    },
    {
      "id": 7,
      "name": "The Warm Hearts",
      "familySize": 2,
      "description": "A loving couple celebrating Christmas in their cozy home.",
      "diet": ["Lactose-free"],
      "habits": ["Non-smoker"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": [],
      "image": "./image/familie/family7.jpg"
    },
    {
      "id": 8,
      "name": "The Elegant Couple",
      "familySize": 2,
      "description": "A sophisticated couple celebrating Christmas in their beautifully decorated home.",
      "diet": ["Lactose-free"],
      "habits": ["Non-smoker"],
      "hasPets": false,
      "allergies": ["lactose"],
      "childrenAgeGroups": [],
      "image": "./image/familie/family8.jpg"
    },
    {
      "id": 9,
      "name": "The Bunny Family",
      "familySize": 3,
      "description": "A cheerful family with a lovable pet bunny.",
      "diet": ["Halal"],
      "habits": ["No alcohol"],
      "hasPets": true,
      "allergies": ["none"],
      "childrenAgeGroups": ["4-10"],
      "image": "./image/familie/family9.jpg"
    },
    {
      "id": 10,
      "name": "The Cozy Cat Family",
      "familySize": 3,
      "description": "A loving family with their adorable pet cat.",
      "diet": ["Vegetarian-friendly"],
      "habits": ["Non-smoker"],
      "hasPets": true,
      "allergies": ["none"],
      "childrenAgeGroups": ["4-10"],
      "image": "./image/familie/family10.jpg"
    },
    {
      "id": 11,
      "name": "The Tropical Christmas Family",
      "familySize": 5,
      "description": "A lively family celebrating Christmas by the beach.",
      "diet": ["Halal"],
      "habits": ["No alcohol"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": ["4-10", "11-17"],
      "image": "./image/familie/family11.jpg"
    },
    {
      "id": 12,
      "name": "The Gifted Family",
      "familySize": 4,
      "description": "A cheerful family who loves sharing gifts and spreading holiday joy.",
      "diet": ["Halal"],
      "habits": ["No alcohol"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": ["4-10", "11-17"],
      "image": "./image/familie/family12.jpg"
    },
    {
      "id": 13,
      "name": "The Nordic Family 2",
      "familySize": 4,
      "description": "A festive family enjoying the winter holidays surrounded by nature.",
      "diet": ["Vegetarian-friendly"],
      "habits": ["Non-smoker"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": ["0-3", "4-10"],
      "image": "./image/familie/family13.jpg"
    },
    {
      "id": 14,
      "name": "The Holiday Couple",
      "familySize": 2,
      "description": "A loving couple who enjoys cozy holiday evenings by the fireplace.",
      "diet": ["Vegetarian-friendly"],
      "habits": ["Non-smoker", "No alcohol"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": [],
      "image": "./image/familie/family14.jpg"
    },{
      "id": 15,
      "name": "The Grandparent's Christmas",
      "familySize": 2,
      "description": "A lovely elderly couple enjoying their Christmas with their adorable cat.",
      "diet": ["Vegetarian-friendly"],
      "habits": ["Non-smoker", "No alcohol"],
      "hasPets": true,
      "allergies": ["none"],
      "childrenAgeGroups": [],
      "image": "./image/familie/family15.jpg"
    },
    {
      "id": 16,
      "name": "The Pet Lovers Family",
      "familySize": 6,
      "description": "A lively family celebrating Christmas with their adorable dog and cat.",
      "diet": ["Halal"],
      "habits": ["Non-smoker"],
      "hasPets": true,
      "allergies": ["none"],
      "childrenAgeGroups": ["0-3", "4-10"],
      "image": "./image/familie/family16.jpg"
    },
    {
      "id": 17,
      "name": "The Reindeer Family",
      "familySize": 3,
      "description": "A joyful family celebrating their baby's first Christmas.",
      "diet": ["Vegetarian"],
      "habits": ["Non-smoker"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": ["0-3"],
      "image": "./image/familie/family17.jpg"
    },
    {
      "id": 18,
      "name": "The Festive Couple",
      "familySize": 2,
      "description": "A cheerful couple who loves celebrating Christmas with a warm ambiance.",
      "diet": ["Halal"],
      "habits": ["Non-smoker"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": [],
      "image": "./image/familie/family18.jpg"
    },
    {
      "id": 19,
      "name": "The Grandparents' Christmas",
      "familySize": 2,
      "description": "A heartwarming couple who enjoys celebrating Christmas surrounded by cozy decorations.",
      "diet": ["Vegetarian"],
      "habits": ["Non-smoker"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": [],
      "image": "./image/familie/family19.jpg"
    },
    {
      "id": 20,
      "name": "The Christmas Tree Enthusiasts",
      "familySize": 5,
      "description": "A joyful family that loves spending Christmas around the tree.",
      "diet": ["Vegetarian", "Halal"],
      "habits": ["Non-smoker"],
      "hasPets": false,
      "allergies": ["none"],
      "childrenAgeGroups": ["4-10", "11-17"],
      "image": "./image/familie/family20.jpg"
    }
  ]
}

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

// Show all families when the page is loaded
window.onload = function() {
  displayFamilies(familiesData.families);
}

// Click the apply filter button
const applyFiltersButton = document.getElementById('apply-filters');
applyFiltersButton.addEventListener('click', applyFilters);
