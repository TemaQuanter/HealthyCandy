/**
 * @brief This file is executed on the basket.html page
 */


/**
 * This function loads all the selected products from the Products page
 * 
 * @returns The overall price of all the selected products
 */
const loadSelectedProducts = () => {
    // Declare Variables

    // A box where chosen products from the Products page will be displayed
    let productsBox = document.getElementById("chosen_products_box");

    // The overall price
    let overallPrice = 0;

    // Start and end positions for working with strings
    let startPosition;
    let endPosition;

    // Indicates wheather the basket is empty or not
    let basketIsEmpty = true;

    // Load all the selected products from the Products page
    for (let key in localStorage) {
        // Declare temporary variables
        let template = "product_";

        // Check if the item is a product
        if ((key.length > template.length) && (key.slice(0, template.length) == template)) {
            // The basket is not empty
            basketIsEmpty = false;

            // Declare temporary variables

            // A variable for storing a new product as a string
            // (it is necessary to make some proceedures on the product)
            let newProduct = localStorage.getItem(key);

            // Remove legacy button 'Buy' (a legacy button from Products page)

            // Define start end end of 'newProduct' string cutting
            startPosition = newProduct.search("<button");
            endPosition = newProduct.search("</button>") + "</button>".length;

            // Cut the legacy button 'Buy' out
            newProduct = newProduct.slice(0, startPosition) + newProduct.slice(endPosition);

            // Find the price of the product
            startPosition = newProduct.search("<h1>") + "<h1>$".length;
            endPosition = newProduct.search("</h1>");

            // Sum up the price of the product with the overall price
            overallPrice = overallPrice + parseFloat(newProduct.slice(startPosition, endPosition));

            // Display a product on a webpage
            productsBox.innerHTML = productsBox.innerHTML + `
                <div id="${key}" class="cell">
                    ${newProduct}
                </div>
            `; // end productsBox.innerHTML
        } // end if
    } // end for

    // If the basket is empty, notify the user about it
    if (basketIsEmpty) {
        console.log("Empty");
        productsBox.innerHTML = "<h2 id=\"empty_basket_notification\">The basket is empty</h2>";
    } // end if

    return overallPrice;
} // end loadSelectedProducts()


/**
 * This function loads the delivery option chosen on Delivery page
 * 
 * @returns The overall delivery price
 */
const loadDeliveryOption = () => {
    // Get the element, where to place the information about delivery option
    const deliveryOptionBox = document.getElementById("delivery_option");

    // Get chosen delivery info
    const deliveryInfo = JSON.parse(localStorage.getItem("delivery_option"));

    // Display the information about delivery
    deliveryOptionBox.innerText = `${deliveryInfo["name"]} ($${deliveryInfo["price"]})`;

    return parseFloat(deliveryInfo["price"]);
} // end loadDeliveryOption()


/**
 * This function is called when the button 'Place order' is clicked
 */
const placeOrder = () => {
    alert("Your order is placed successfully!");
} // end placeOrder()


/**
 * This is the main function, which is executed right after a page is loaded.
 */
const main = () => {
    // Load selected products from the Products page
    // and get the overallPrice without the price of the delivery
    let overallPrice = loadSelectedProducts();

    // Load the chosen delivery option
    // and get its price as well
    overallPrice = overallPrice + loadDeliveryOption();

    // Set the precision to 2 decimal places
    overallPrice = overallPrice.toPrecision(parseInt(overallPrice).toString().length + 2);

    // Display the overall price to the user
    const priceSection = document.getElementById("final_price");

    priceSection.innerText = `$${overallPrice.toString()}`;
} // end main()

main();