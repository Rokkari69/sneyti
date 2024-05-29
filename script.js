function calculateFuelConsumption() {
    var averageConsumption = parseFloat(document.getElementById("average-consumption").value);
    var pricePerLiter = parseFloat(document.getElementById("price-per-liter").value);
    var distance = parseFloat(document.getElementById("distance").value);
    var resultElement = document.getElementById("result");

    // Retrieve fuel price data from API
            // Check if the input values and fuel prices are valid
            if (isNaN(averageConsumption) || isNaN(distance) || isNaN(pricePerLiter)) {
                resultElement.innerHTML = "<span class='error'>Vinsamlegast skrifaðu númer.</span>";
                return;
            }

            // Calculate fuel consumption
            var fuelConsumption = (averageConsumption * distance) / 100;

            // Calculate total cost of fuel
            var totalCost = fuelConsumption * pricePerLiter;

            resultElement.innerHTML = "Mögulegt verð: " + totalCost.toFixed(2) + "kr<br>";
}

function calculateDistanceWithFuelBudget() {
    var budget = parseFloat(document.getElementById("budget").value);
    var averageConsumption = parseFloat(document.getElementById("average-consumption1").value);
    var pricePerLiter = parseFloat(document.getElementById("price-per-liter1").value);
    var resultElement = document.getElementById("result1");

    // Retrieve fuel price data from API

            // Check if the input values and fuel prices are valid
    if (isNaN(budget) || isNaN(averageConsumption) || isNaN(pricePerLiter)) {
        resultElement.innerHTML = "<span class='error'>Vinsamlegast skrifaðu rétt númer.</span>";
        return;
    }

    // Calculate distance with the given budget
    var distance = budget / ((averageConsumption / 100) * pricePerLiter)

    resultElement.innerHTML = "Þú kemst: " + distance.toFixed(2) + "km";
}


        // Initialize the Google Places Autocomplete for origin and destination inputs
function initializeAutocomplete() {
    var originAutocomplete = new google.maps.places.Autocomplete(document.getElementById('origin'));
    var destinationAutocomplete = new google.maps.places.Autocomplete(document.getElementById('destination'));
}

// Define the callback function
function callback(response, status) {
    var resultElement = document.getElementById('result2');

    if (status == 'OK') {
        var distance = response.rows[0].elements[0].distance.text;
        var duration = response.rows[0].elements[0].duration.text;

        resultElement.innerHTML = 'Vegalengd: ' + distance + '<br>Tími: ' + duration;
    } else {
        resultElement.innerHTML = 'Error: Unable to calculate distance.';
    }
}

// Attach the event listener to the button click event
document.getElementById('calculateBtn').addEventListener('click', function () {
    // Get the origin and destination values
    var origin = document.getElementById('origin').value;
    var destination = document.getElementById('destination').value;
    const submitButton = document.querySelector("calculateBtn");

    form.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            submitButton.click(); // Simulate a click on the submit button
        }
    });

    // Check if both origin and destination are provided
    if (origin && destination) {
        // Use the Distance Matrix API to calculate the distance
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, callback);
    } else {
        alert('Please enter both origin and destination.');
    }
});



// Attach the event listener to the window load event to initialize the Autocomplete
google.maps.event.addDomListener(window, 'load', initializeAutocomplete);