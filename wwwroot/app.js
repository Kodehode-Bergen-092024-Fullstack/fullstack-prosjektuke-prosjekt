// 1️⃣ API URL'si ve global değişkenler
const API_URL = "data.json";
let families = [];
const output = document.querySelector(".family-list");
const searchInput = document.getElementById("search");
const filters = document.querySelectorAll(
  '#filters input[type="checkbox"], #filters input[type="radio"]'
);

// 2️⃣ JSON verilerini çek ve ekrana tüm aileleri yazdır
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

// 3️⃣ Aile kartlarını ekrana ekle
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
    ? document
        .querySelector('input[name="hasPets"]:checked')
        .getAttribute("data-pets")
    : null;
    
    const selectedAllergies = Array.from(
      document.querySelectorAll('input[data-trait="allergy"]:checked')
    ).map((input) => input.getAttribute("data-trait-value"));

    
  const selectedAgeGroups = Array.from(
    document.querySelectorAll("input[data-group]:checked")
  ).map((input) => input.getAttribute("data-group"));

  const filteredFamilies = families.filter((family) => {
    // 🔍 Arama Sorgusu
    const matchesSearchQuery =
      family.name?.toLowerCase().includes(searchQuery) ||
      family.description?.toLowerCase().includes(searchQuery);

    // 🎉 Kutlama Boyutu (Aralık Kontrolü)
    const matchesCelebrateSize =
      selectedCelebrateSizes.length === 0 ||
      selectedCelebrateSizes.some((range) => {
        const [min, max] = range.includes("+")
          ? [7, Infinity]
          : range.split("-").map(Number);
        return family.celebratesize >= min && family.celebratesize <= max;
      });

    // 🍽️ Diyet Tercihleri
    const matchesDiet =
      selectedDiets.length === 0 ||
      selectedDiets.every((selectedDiet) =>
        family.diet?.includes(selectedDiet)
      );

    // 🚭 Alışkanlıklar

    const matchesHabits =
      selectedHabits.length === 0 ||
      selectedHabits.every((selectedHabit) =>
        family.habits
          ?.map((h) => h.toLowerCase())
          .includes(selectedHabit.toLowerCase())
      );

    // 🐶 Evcil Hayvan
    const matchesHasPets =
      hasPetsFilter === null ||
      (hasPetsFilter === "yes" && family.hasPets) ||
      (hasPetsFilter === "no" && !family.hasPets);

    // 🤧 Alerjiler
   
    const familyPets = family.pet ?? []; // Eğer null ise boş dizi yapar
    const matchesAllergies = 
      selectedAllergies.length === 0 || 
      !selectedAllergies.some((allergy) => 
        familyPets
          .map((pet) => pet?.toLowerCase())
          .includes(allergy?.toLowerCase())
      );
   
    // 🧒 Çocuk Yaş Grupları
    const matchesAgeGroups =
      selectedAgeGroups.length === 0 ||
      selectedAgeGroups.some((ageGroup) =>
        family.childrenAgeGroups?.includes(ageGroup)
      );

    // ✅ Filtreleme mantığı: Tüm kuralları sağlamalı
    return (
      matchesSearchQuery &&
      matchesCelebrateSize &&
      matchesDiet &&
      matchesHabits &&
      matchesHasPets &&
      matchesAllergies &&
      matchesAgeGroups
    ); // Yeni eklenen yaş grubu kontrolü
  });

  renderFamilies(filteredFamilies);
}

// 📌 Filtreleme olay dinleyicilerini ekliyoruz
searchInput.addEventListener("input", filterFamilies);
filters.forEach((filter) => filter.addEventListener("change", filterFamilies));

// Sayfa yüklendiğinde JSON verilerini al
fetchFamilies();



// Tüm accordion başlıklarını seç
const accordionHeaders = document.querySelectorAll(".accordion-header");

// Her butona tıklama olayı ekle
accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const parent = header.parentElement;

    // Eğer bu bölüm zaten açıksa, kapat
    if (parent.classList.contains("open")) {
      parent.classList.remove("open");
    } else {
      // Tüm açık olanları kapat
      document
        .querySelectorAll(".accordion-item.open")
        .forEach((item) => item.classList.remove("open"));
      // Tıklanan bölümü aç
      parent.classList.add("open");
    }
  });
});


  // **Other seçildiğinde metin kutusunu ve mesajı kontrol et**
  const otherPetAllergyCheckbox = document.getElementById('other-allergy-checkbox');
  const otherPetAllergyText = document.getElementById('other-allergy-text');
  const otherPetAllergyMessage = document.getElementById('other-allergy-message');

  // 📌 **"Other" kutusu seçildiğinde metin kutusunu aç**
  otherPetAllergyCheckbox.addEventListener('change', function () {
    if (otherPetAllergyCheckbox.checked) {
      otherPetAllergyText.style.display = 'block'; // Metin kutusunu göster
    } else {
      otherPetAllergyText.style.display = 'none'; // Metin kutusunu gizle
      otherPetAllergyText.value = ''; // Metni temizle
      otherAllergyMessage.style.display = 'none'; // Mesajı gizle
    }
  });

  // 📌 **Kullanıcı metin kutusuna yazı yazarsa bilgilendirme mesajını göster**
  otherpetAllergyText.addEventListener('input', function () {
    if (otherAllergyText.value.trim() !== '') {
      otherpetAllergyMessage.style.display = 'block'; // Mesajı göster
    } else {
      otherpetAllergyMessage.style.display = 'none'; // Mesajı gizle
    }
  });


  // 📌 **Allergy Bölümü**
const otherAllergyCheckbox = document.getElementById('other-allergy-checkbox');
const otherAllergyText = document.getElementById('other-allergy-text');
const allergyMessage = document.getElementById('allergy-message');
const sendAllergyInfoButton = document.getElementById('send-allergy-info-btn');

// 📌 **Other seçildiğinde metin kutusunu aç**
otherAllergyCheckbox.addEventListener('change', function () {
  if (otherAllergyCheckbox.checked) {
    otherAllergyText.style.display = 'block'; // Metin kutusunu göster
  } else {
    otherAllergyText.style.display = 'none'; // Metin kutusunu gizle
    otherAllergyText.value = ''; // Metni temizle
    allergyMessage.style.display = 'none'; // Mesajı gizle
  }
});

// 📌 **Bilgiyi gönderme butonuna tıklama**
sendAllergyInfoButton.addEventListener('click', function () {
  const allergyInfo = otherAllergyText.value.trim();

  if (otherAllergyCheckbox.checked && allergyInfo !== '') {
    allergyMessage.style.display = 'block'; // Onay mesajını göster
    otherAllergyText.value = ''; // Metin kutusunu temizle
  } else {
    alert('Please enter an allergy description.');
    allergyMessage.style.display = 'none';
  }
});


// 📌 **Additional Information Bölümü**
const additionalInfoText = document.getElementById('additional-info-text');
const additionalMessage = document.getElementById('additional-message');
const sendAdditionalInfoButton = document.getElementById('send-additional-info-btn');

// 📌 **Ek bilgi gönderme butonuna tıklama**
sendAdditionalInfoButton.addEventListener('click', function () {
  const additionalInfo = additionalInfoText.value.trim();

  if (additionalInfo !== '') {
    additionalMessage.style.display = 'block'; // Onay mesajını göster
    additionalInfoText.value = ''; // Metin kutusunu temizle
  } else {
    alert('Please enter additional information.');
    additionalMessage.style.display = 'none';
  }
});