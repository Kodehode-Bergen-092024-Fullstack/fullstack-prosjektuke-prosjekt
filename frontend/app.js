// Family information with JSON
const families = [
    {
      name: "The Smiths",
      title: "Family of 4",
      description: "We love celebrating Christmas with cozy decorations and good food.",
      preferences: ["No pets", "Vegetarian-friendly"],
      image: "family1.jpg"
    },
    {
      name: "The Johnsons",
      title: "Family of 6",
      description: "Looking forward to sharing the holiday spirit with others.",
      preferences: ["No allergies", "Kid-friendly"],
      image: "family2.jpg"
    }
  ];
  
  // Create family cards dynamically
  const familyList = document.querySelector('.family-list');
  families.forEach(family => {
    const familyCard = document.createElement('div');
    familyCard.classList.add('family-card');
    familyCard.innerHTML = `
      <img src="${family.image}" alt="${family.name}">
      <h3>${family.name}</h3>
      <p>${family.title}</p>
      <p>${family.description}</p>
      <p><strong>Preferences:</strong> ${family.preferences.join(', ')}</p>
    `;
    familyList.appendChild(familyCard);
  });
  