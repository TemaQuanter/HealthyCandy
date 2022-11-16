// Select selected items
for (let key in localStorage) {
    try {
        const buttonClicked = document.getElementById(key).childNodes[7];

        if (buttonClicked) {
            buttonClicked.style.backgroundColor = "#3E0732";
            buttonClicked.innerText = "Selected";
        } // end if
    } catch (error) {

    } // end try
} // end for


/**
 * This function is called when a user clickes on "Buy"/"Selected" button in Products page
 * @param elementId - is an ID of the item, chosen by a user
 */
const buyButton = (cell) => {

    // Get the button that was clicked
    const buttonClicked = cell.childNodes[7];

    // Get the id of the selected product
    const productId = cell.id.toString();

    // Check if the button state is selected or not
    if (localStorage.getItem(productId)) {
        localStorage.removeItem(productId);

        buttonClicked.style.backgroundColor = "#C847AB";
        buttonClicked.innerText = "Buy";
    } else {
        localStorage.setItem(productId, cell.innerHTML);

        buttonClicked.style.backgroundColor = "#3E0732";
        buttonClicked.innerText = "Selected";
    } // end if
} // end buyButton()