/**
 * @brief This file is executed after Delivery page is loaded
 */


/**
 * This function get the delivery info based on the option ID
 * 
 * @param optionId An ID of the delivery option
 * 
 * @returns Dictionary object with the delivery info
 */
const getDeliveryInfo = (optionId) => {
    // Get the parent element of the option
    const parent = document.getElementById(optionId).parentElement;

    // Get the name and the price of the option
    const optionName = parent.getElementsByTagName("h2")[0].innerText;
    const optionPrice = parent.getElementsByClassName("price")[0].innerText.slice(1);

    // Create a dictionary with the delivery option info
    const deliveryInfo = {
        id: optionId,
        name: optionName,
        price: optionPrice
    }; // end deliveryInfo

    return deliveryInfo;
} // end getDeliveryInfo()


/**
 * This function selects the latest selected option of delivery
 */
const selectLatestDeliveryOption = () => {
    // Check if the option was selected buy a user
    // If not selected, than set 'Standard delivery' as the default option
    if (localStorage.getItem("delivery_option") === null) {
        // Set a default option
        const defaultOption = "delivery_2";

        // Get the default delivery info
        const deliveryInfo = getDeliveryInfo(defaultOption);

        // Set the default option
        localStorage.setItem("delivery_option", JSON.stringify(deliveryInfo));
    } // end if

    // Get the info about selected delivery option
    const delivery_option = JSON.parse(localStorage.getItem("delivery_option"));

    // Get the button of the selected option
    const buttonSelected = document.getElementById(delivery_option["id"]);

    // Change the style of the button
    buttonSelected.style.backgroundColor = "#3E0732";
    buttonSelected.innerText = "Selected";
} // end selectLatestDeliveryOption()


/**
 * This function resets 'Select' button to the default style
 * 
 * @param optionId An ID of the button to reset
 */
const resetButton = (optionId) => {

    // Get the button to reset
    const buttonSelected = document.getElementById(optionId);

    // Reset the button
    buttonSelected.style.backgroundColor = "#C847AB";
    buttonSelected.innerText = "Select";
} // end resetButton()


/**
 * This function is called when user selects a delivery option on Delivery page
 * 
 * @param optionId An ID of the chosen delivery option
 */
const selectDeliveryOption = (optionId) => {
    // Reset the previously selected option

    // Get the info about previously selected option
    const previousDeliveryOption = JSON.parse(localStorage.getItem("delivery_option"));
    
    // Reset button of the previously selected option
    resetButton(previousDeliveryOption["id"]);

    // Update the chosen option

    // Get the delivery info
    const deliveryInfo = getDeliveryInfo(optionId);

    localStorage.setItem("delivery_option", JSON.stringify(deliveryInfo));

    // Display the new option
    selectLatestDeliveryOption();
} // end selectDeliveryOption()


/**
 * This is the main function, which is executed after Delivery page is loaded
 */
const main = () => {
    selectLatestDeliveryOption();
} // end main()

main();