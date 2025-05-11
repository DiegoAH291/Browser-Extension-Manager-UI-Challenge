const btnFilterAll = document.getElementById("filter-all");
const btnFilterActive = document.getElementById("filter-active");
const btnFilterInactive = document.getElementById("filter-inactive");
const extensionContainer = document.getElementById("extension-container");

const states = {
  all: "all",
  inactive: "inactive",
  active: "active",
};

let extensions = [];
let currentFilter = states.all;

function removeExtension(name) {
  extensions = extensions.filter((extension) => extension.name !== name);
  filterExtensions(currentFilter);
}

function createCardExtension(logo, name, description, isActive) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";

  const cardInformation = document.createElement("div");
  cardInformation.className = "card-information";

  const cardLogo = document.createElement("img");
  cardLogo.src = logo;
  cardLogo.alt = name;
  cardLogo.title = name;

  const cardData = document.createElement("div");
  cardData.className = "card-data";

  const cardName = document.createElement("h3");
  cardName.className = "card-data__name";
  cardName.textContent = name;

  const cardDescription = document.createElement("p");
  cardDescription.className = "card-data__description";
  cardDescription.textContent = description;

  cardData.append(cardName, cardDescription);
  cardInformation.append(cardLogo, cardData);

  const cardActions = document.createElement("div");
  cardActions.className = "card-actions";

  const btnRemoveExtension = document.createElement("button");
  btnRemoveExtension.className = "card-actions__remove";
  btnRemoveExtension.textContent = "Remove";

  btnRemoveExtension.addEventListener("click", () => removeExtension(name));

  const btnSwitchState = document.createElement("div");
  btnSwitchState.role = "button";
  btnSwitchState.className = `${
    isActive ? "card-actions__state" : "card-actions__state inactive"
  }`;

  const btnSwitchStateCircle = document.createElement("div");
  btnSwitchStateCircle.className = `${
    isActive
      ? "card-actions__state--circle"
      : "card-actions__state--circle inactive"
  }`;
  btnSwitchStateCircle.id = "card-actions__state--circle";

  btnSwitchState.addEventListener("click", () => {
    extensions = extensions.map((extension) => {
      if (extension.name === name) {
        return { ...extension, isActive: !extension.isActive };
      }
      return extension;
    });

    filterExtensions(currentFilter);
  });

  btnSwitchState.append(btnSwitchStateCircle);
  cardActions.append(btnRemoveExtension, btnSwitchState);
  cardContainer.append(cardInformation, cardActions);

  return cardContainer;
}

function showAllExtensions() {
  extensionContainer.innerHTML = "";
  extensions.forEach(({ logo, name, description, isActive }) => {
    extensionContainer.append(
      createCardExtension(logo, name, description, isActive)
    );
  });
}

function showExtensionsByStateActive() {
  extensionContainer.innerHTML = "";
  extensions
    .filter((extension) => extension.isActive)
    .forEach(({ logo, name, description, isActive }) => {
      extensionContainer.append(
        createCardExtension(logo, name, description, isActive)
      );
    });
}

function showExtensionsByStateInactive() {
  extensionContainer.innerHTML = "";
  extensions
    .filter((extension) => !extension.isActive)
    .forEach(({ logo, name, description, isActive }) => {
      extensionContainer.append(
        createCardExtension(logo, name, description, isActive)
      );
    });
}

function filterExtensions(state) {
  currentFilter = state;

  btnFilterAll.classList.toggle(
    "filter-button--inactive",
    state !== states.all
  );
  btnFilterActive.classList.toggle(
    "filter-button--inactive",
    state !== states.active
  );
  btnFilterInactive.classList.toggle(
    "filter-button--inactive",
    state !== states.inactive
  );

  switch (state) {
    case states.all:
      showAllExtensions();
      break;
    case states.active:
      showExtensionsByStateActive();
      break;
    case states.inactive:
      showExtensionsByStateInactive();
      break;
    default:
      throw new Error("Error: The status is incorrect or invalid.");
  }
}

btnFilterAll.addEventListener("click", () => filterExtensions(states.all));
btnFilterActive.addEventListener("click", () =>
  filterExtensions(states.active)
);
btnFilterInactive.addEventListener("click", () =>
  filterExtensions(states.inactive)
);

async function init() {
  try {
    const response = await fetch("https://res.cloudinary.com/dvfihxcwo/raw/upload/v1746987772/odsa8y2dajnoibxc9oeb.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    extensions = Array.from(data);
    showAllExtensions();
  } catch (error) {
    console.error("Error loading the extensions:", error);
  }
}

init();
