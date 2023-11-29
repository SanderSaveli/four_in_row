function showPopup(popupContainer, text, buttons) {
    const popup = document.createElement("div");
    popup.className = "popup";
    const popupContent = document.createElement("div");
    popupContent.className = "popup-content";
    const heading = document.createElement("h2");
    heading.textContent = text;
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "popup-buttons";

    for (const element of buttons) {
        let button = document.createElement("button");
        button.textContent = element.text;
        button.addEventListener("click", element.action);
        buttonsDiv.appendChild(button);
    }

    popupContent.appendChild(heading);
    popupContent.appendChild(buttonsDiv);
    popup.appendChild(popupContent);
    popupContainer.appendChild(popup);
}

module.exports = showPopup;
