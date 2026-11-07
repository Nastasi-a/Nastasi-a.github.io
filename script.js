// ПОКУПКА ТОВАРА

const buyButtons = document.querySelectorAll(".buy-button");

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let email = prompt("Veuillez entrer votre adresse électronique :");

    if (email && email.includes("@")) {
      alert("Merci ! Nous vous contacterons dans les plus brefs délais.");
    } else {
      alert("Veuillez entrer une adresse électronique valide.");
    }
  });
});

// ПОИСК ТОВАРОВ

const search = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

if (search) {
  search.addEventListener("input", function () {
    let text = this.value.toLowerCase();

    cards.forEach((card) => {
      let name = card.querySelector("h2").textContent.toLowerCase();

      card.style.display = name.includes(text) ? "" : "none";
    });
  });
}

// ГАЛЕРЕИ ФОТОГРАФИЙ

let activeGallery = [];
let activeIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

function showGalleryImage(index) {
  if (!activeGallery.length) return;

  activeIndex = (index + activeGallery.length) % activeGallery.length;

  lightboxImage.src = activeGallery[activeIndex].src;
  lightboxImage.alt = activeGallery[activeIndex].alt;
}

function openLightbox(images, index) {
  activeGallery = images;
  showGalleryImage(index);

  lightbox.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

// СОЗДАНИЕ ГАЛЕРЕЙ

document.querySelectorAll(".gallery").forEach(function (gallery) {
  const images = Array.from(gallery.querySelectorAll("img"));

  if (!images.length) return;

  let currentIndex = 0;

  const prev = document.createElement("button");
  prev.className = "gallery-arrow gallery-prev";
  prev.type = "button";
  prev.textContent = "❮";

  const next = document.createElement("button");
  next.className = "gallery-arrow gallery-next";
  next.type = "button";
  next.textContent = "❯";

  const counter = document.createElement("span");
  counter.className = "gallery-counter";

  gallery.append(prev, next, counter);

  // ПОКАЗ ФОТОГРАФИИ

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;

    images.forEach(function (img, i) {
      img.classList.toggle("active", i === currentIndex);
    });

    prev.style.display = images.length > 1 ? "block" : "none";
    next.style.display = images.length > 1 ? "block" : "none";
    counter.style.display = images.length > 1 ? "block" : "none";

    counter.textContent = currentIndex + 1 + " / " + images.length;
  }

  // ПЕРЕЛИСТЫВАНИЕ НАЗАД

  prev.addEventListener("click", function (event) {
    event.stopPropagation();
    showImage(currentIndex - 1);
  });

  // ПЕРЕЛИСТЫВАНИЕ ВПЕРЁД

  next.addEventListener("click", function (event) {
    event.stopPropagation();
    showImage(currentIndex + 1);
  });

  // ОТКРЫТИЕ УВЕЛИЧЕННОГО ФОТО

  images.forEach(function (img, i) {
    img.addEventListener("click", function () {
      openLightbox(images, i);
    });
  });

  showImage(0);
});

// УПРАВЛЕНИЕ УВЕЛИЧЕННЫМ ФОТО

document
  .getElementById("lightboxClose")
  .addEventListener("click", closeLightbox);

document.getElementById("lightboxPrev").addEventListener("click", function () {
  showGalleryImage(activeIndex - 1);
});

document.getElementById("lightboxNext").addEventListener("click", function () {
  showGalleryImage(activeIndex + 1);
});

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// УПРАВЛЕНИЕ КЛАВИАТУРОЙ

document.addEventListener("keydown", function (event) {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showGalleryImage(activeIndex - 1);
  if (event.key === "ArrowRight") showGalleryImage(activeIndex + 1);
});

// ПЕРЕЛИСТЫВАНИЕ ПАЛЬЦЕМ НА ТЕЛЕФОНЕ

let touchStartX = 0;

lightbox.addEventListener(
  "touchstart",
  function (event) {
    touchStartX = event.changedTouches[0].screenX;
  },
  { passive: true }
);

lightbox.addEventListener(
  "touchend",
  function (event) {
    const touchEndX = event.changedTouches[0].screenX;
    const difference = touchEndX - touchStartX;

    if (Math.abs(difference) > 50) {
      showGalleryImage(activeIndex + (difference < 0 ? 1 : -1));
    }
  },
  { passive: true }
);
