import data from "../json/data.json";

const btnFilterAll = document.getElementById("filter-all");
const btnFilterActive = document.getElementById("filter-active");
const btnFilterInactive = document.getElementById("filter-inactive");
const extensionContainer = document.getElementById("extension-container");

let extensions = Array.from(data);

const states = {
  all: "all",
  inactive: "inactive",
  active: "active",
};

let currentFilter = states.all;

function removeExtension(name) {
  const newExtension = extensions.filter(
    (extension) => extension.name !== name
  );

  extensions = newExtension;

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
    isActive === true ? "card-actions__state" : "card-actions__state inactive"
  }`;

  const btnSwitchStateCircle = document.createElement("div");
  btnSwitchStateCircle.className = `${
    isActive === true
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

  extensions.forEach((extension) => {
    const { logo, name, description, isActive } = extension;

    extensionContainer.append(
      createCardExtension(logo, name, description, isActive)
    );
  });
}

function showExtensionsByStateActive() {
  const filteredExtensions = extensions.filter(
    (extension) => extension.isActive === true
  );

  extensionContainer.innerHTML = "";

  filteredExtensions.forEach((extension) => {
    const { logo, name, description, isActive } = extension;

    extensionContainer.append(
      createCardExtension(logo, name, description, isActive)
    );
  });
}

function showExtensionsByStateInactive() {
  const filteredExtensions = extensions.filter(
    (extension) => extension.isActive === false
  );

  extensionContainer.innerHTML = "";

  filteredExtensions.forEach((extension) => {
    const { logo, name, description, isActive } = extension;

    extensionContainer.append(
      createCardExtension(logo, name, description, isActive)
    );
  });
}

showAllExtensions();

function filterExtensions(state) {
  currentFilter = state;

  switch (state) {
    case states.all:
      btnFilterAll.classList.remove("filter-button--inactive");
      btnFilterActive.classList.add("filter-button--inactive");
      btnFilterInactive.classList.add("filter-button--inactive");
      showAllExtensions();
      break;
    case states.active:
      btnFilterActive.classList.remove("filter-button--inactive");
      btnFilterAll.classList.add("filter-button--inactive");
      btnFilterInactive.classList.add("filter-button--inactive");
      showExtensionsByStateActive();
      break;

    case states.inactive:
      btnFilterInactive.classList.remove("filter-button--inactive");
      btnFilterAll.classList.add("filter-button--inactive");
      btnFilterActive.classList.add("filter-button--inactive");
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
