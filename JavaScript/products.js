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
 * 
 * @param cell - is an ID of the item, chosen by a user.
 */
const buyButton = (cell) => {

    // Get the button that was clicked
    const buttonClicked = cell.childNodes[7];

    // Get the id of the selected product
    const productId = cell.id.toString();

    // Check if the button state is selected or not
    if (localStorage.getItem(productId)) {
        // If button state is selected, then deselect it
        localStorage.removeItem(productId);

        buttonClicked.style.backgroundColor = "#C847AB";
        buttonClicked.innerText = "Buy";
        buttonClicked.style.width = "95px";
    } else {
        // If button state is deselected, then select it

        // Store the product data in local storage
        localStorage.setItem(productId, cell.innerHTML);

        buttonClicked.style.backgroundColor = "#3E0732";
        buttonClicked.innerText = "Selected";
        buttonClicked.style.width = "120px";
    } // end if
} // end buyButton()


/**
 * This function runs through all the products on the page and selects only
 * those products, which suit filters.
 * 
 * This function also re-selects chosen filters after Products page update.
 */
const runFilters = () => {
    // Re-select chosen filters

    // Get filters menu
    const filtersMenu = document.getElementById("menu");

    // Get all the children of filtersMenu
    const filterMenuChildren = filtersMenu.children;

    // Get all the option names
    let optionNames = [];

    // Indicates if at least 1 option is selected
    let optionSelected = false;

    // Add all the option names to the array
    for (let i = 0; i < filterMenuChildren.length; i++) {
        optionNames.push(filterMenuChildren[i].innerText);
    } // end for

    // Convert option names to option IDs
    for (let i = 0; i < filterMenuChildren.length; i++) {
        optionNames[i] = optionNames[i].toLowerCase().replace(" ", "_");
        console.log(optionNames[i]);
    } // end for

    // Re-select selected filters
    for (let i = 0; i < optionNames.length; i++) {
        // If option was selected, then re-select it
        if (localStorage.getItem(optionNames[i])) {
            optionSelected = true;
            filterMenuChildren[i].style.textDecoration = "underline";
        } // end if
    } // end for

    // Filter products

    // Get grid with products
    const grid = document.getElementById("grid");

    // Get all the products
    const products = grid.children;

    // Run through all the products and determine if the should be shown to the user or not
    for (let i = 0; i < products.length; i++) {
        // Get all the classes of a product
        const classes = products[i].classList;

        // Indicates if the product should be shown to the user or not
        let productSelected = false;

        // Check if at least one class suits the filters
        for (let j = 0; j < classes.length; j++) {
            // If the following statement is true, then the product is selected
            if (localStorage.getItem(classes[j])) {
                productSelected = true;
                break;
            } // end if
        } // end for

        // If product is not selected, then disable it
        // If product selected, display it
        // If no option selected, then just display everything
        if ((productSelected == false) && optionSelected) {
            products[i].style.display = "none";
        } else {
            products[i].style.display = "inline-block";
        }
    } // end for

} // end runFilters()


/**
 * This function is called when one of the options on category panel is chosen.
 * This function filters the products according to filters.
 * 
 * @param element - the element clicked
 */
const filterProducts = (element) => {
    // Get the filter value
    const filterValue = element.innerText.toLowerCase().replace(" ", "_");

    // Check if the element is already chosen
    if (localStorage.getItem(filterValue)) {
        // Deselect element
        element.style.textDecoration = "none";

        // Remove it from local storage
        localStorage.removeItem(filterValue);
    } else {
        // Select element
        element.style.textDecoration = "underline";

        // Add it to local storage
        localStorage.setItem(filterValue, "selected");
    } // end if

    // Update products grid
    runFilters();
} // end filterOptions()


/**
 * This is the main function, which is executed right after a page is loaded.
 */
const main = () => {
    // Select selected items
    selectSelectedItems();
    runFilters();
} // end main()

main();