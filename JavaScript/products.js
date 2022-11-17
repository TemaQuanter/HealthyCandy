/**
 * @brief This file is executed on the products.html page.
 */



/**
 * This function goes to the local storage and re-selects already
 * selected items.
 */
const selectSelectedItems = () => {
    // Select selected items
    for (let key in localStorage) {
        // Try catch block is needed to eliminate errors, which may occur in case 'key' 
        // variable points to the object other than product
        try {
            const buttonClicked = document.getElementById(key).childNodes[7];

            if (buttonClicked) {
                buttonClicked.style.backgroundColor = "#3E0732";
                buttonClicked.innerText = "Selected";
            } // end if
        } catch (error) {

        } // end try
    } // end for
} // end selectSelectedItems()


/**
 * This function is called when a user clickes on "Buy"/"Selected" button in Products page.
 * @param cell - is an ID of the item, chosen by a user.
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


/**
 * This is the main function, which is executed right after a page is loaded.
 */
const main = () => {
    // Select selected items
    selectSelectedItems();
} // end main()

main();