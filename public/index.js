document.addEventListener("DOMContentLoaded", function () {
    var roundTripCheckbox = document.getElementById("roundTrip");
    var returnDateContainer = document.getElementById("returnDateContainer");
    var reservationForm = document.getElementById("reservationForm");

    roundTripCheckbox.addEventListener("change", function () {
        if (roundTripCheckbox.checked) {
            returnDateContainer.style.display = "block";
        } else {
            returnDateContainer.style.display = "none";
        }
    });

    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var email = document.getElementById("email").value;
        var flightDate = document.getElementById("flightDate").value;

        // Submit the reservation form
        reservationForm.submit();
    });
});
