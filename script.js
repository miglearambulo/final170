// Simple view switching (Home / Favorites)
const navPills = document.querySelectorAll(".nav-pill");
const homeView = document.getElementById("home-view");
const favoritesView = document.getElementById("favorites-view");
const favoritesGrid = document.getElementById("favorites-grid");
const favoritesEmpty = document.getElementById("favorites-empty");

// Account dropdown toggle
const accountToggle = document.querySelector(".js-account-toggle");
const accountDropdown = document.getElementById("account-dropdown");

if (accountToggle && accountDropdown) {
  accountToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    accountToggle.classList.toggle("open");
    accountDropdown.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-dropdown")) {
      accountToggle.classList.remove("open");
      accountDropdown.classList.remove("show");
    }
  });

  // Handle dropdown item clicks
  const dropdownItems = accountDropdown.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      const view = item.getAttribute("data-view");
      if (view === "favorites") {
        showView("favorites");
        navPills.forEach((p) => p.classList.remove("nav-pill--active"));
      }
      accountDropdown.classList.remove("show");
      accountToggle.classList.remove("open");
    });
  });
}

// Heart icon toggle functionality
const heartIcons = document.querySelectorAll(".js-heart-toggle");
heartIcons.forEach((heart) => {
  heart.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent card click event
    heart.classList.toggle("filled");
    
    // Optional: Add haptic feedback or animation
    if (heart.classList.contains("filled")) {
      heart.style.transform = "scale(1.2)";
      setTimeout(() => {
        heart.style.transform = "";
      }, 200);
    }
  });
});

// View Details button functionality
const viewDetailsButtons = document.querySelectorAll(".btn-outline");
viewDetailsButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = "https://hillcrestfarmersmarket.com/";
  });
});

// Helper to switch visible view
function showView(view) {
  if (view === "favorites") {
    homeView.classList.add("hidden");
    favoritesView.classList.remove("hidden");
  } else {
    // default to home
    homeView.classList.remove("hidden");
    favoritesView.classList.add("hidden");
  }
}

navPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    navPills.forEach((p) => p.classList.remove("nav-pill--active"));
    pill.classList.add("nav-pill--active");
    const view = pill.getAttribute("data-view");
    if (view === "favorites") {
      showView("favorites");
    } else {
      showView("home");
    }
  });
});

// Favorites logic
const addFavoriteButtons = document.querySelectorAll(".js-add-favorite");
const favoritesSet = new Set(); // track event IDs already saved

addFavoriteButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".event-card");
    if (!card) return;

    const id = card.getAttribute("data-event-id");
    if (favoritesSet.has(id)) return;

    favoritesSet.add(id);

    // Add animation feedback
    btn.textContent = "Added!";
    btn.style.background = "#5db32c";
    setTimeout(() => {
      btn.textContent = "Add to Favorites";
      btn.style.background = "";
    }, 1500);

    // clone card and append to favorites grid
    const clone = card.cloneNode(true);
    // remove old "Add to Favorites" button inside the clone
    const cloneFavBtn = clone.querySelector(".js-add-favorite");
    if (cloneFavBtn) {
      cloneFavBtn.remove();
    }

    favoritesGrid.appendChild(clone);

    // hide empty state
    favoritesEmpty.style.display = "none";
  });
});

// Chip filter interactions
const chips = document.querySelectorAll(".chip");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("chip-active");
  });
});

// Add active class styling
const style = document.createElement("style");
style.textContent = `
  .chip-active {
    background: var(--green) !important;
    color: #ffffff !important;
    border-color: var(--green) !important;
  }
`;
document.head.appendChild(style);

// Event card click to expand/collapse description
const eventCards = document.querySelectorAll(".event-card");
eventCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Don't expand if clicking a button
    if (e.target.closest("button")) return;
    
    const description = card.querySelector(".event-description");
    const isExpanded = card.classList.contains("expanded");
    
    if (isExpanded) {
      card.classList.remove("expanded");
      description.style.maxHeight = "3em";
      description.style.overflow = "hidden";
    } else {
      card.classList.add("expanded");
      description.style.maxHeight = "none";
      description.style.overflow = "visible";
    }
  });
});

// Initialize descriptions with ellipsis
eventCards.forEach((card) => {
  const description = card.querySelector(".event-description");
  description.style.maxHeight = "3em";
  description.style.overflow = "hidden";
  description.style.textOverflow = "ellipsis";
});
