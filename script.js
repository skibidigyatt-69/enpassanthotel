let users = {}; // Stores user accounts
let reservations = {}; // Stores user bookings

function showSignup() {
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
}

function showLogin() {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function signup() {
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    if (users[email]) {
        alert("Email already registered!");
    } else {
        users[email] = { name, password };
        reservations[email] = [];
        alert("Sign up successful! Please log in.");
    }
}

function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    if (users[email] && users[email].password === password) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", email);
        loadReservations();
    } else {
        alert("Invalid email or password.");
    }
}

document.getElementById("booking-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let userEmail = localStorage.getItem("loggedInUser");
    if (!userEmail) {
        alert("Please log in to make a booking.");
        return;
    }

    let checkin = document.getElementById("checkin").value;
    let checkout = document.getElementById("checkout").value;

    let booking = `From ${checkin} to ${checkout}`;
    reservations[userEmail].push(booking);

    document.getElementById("confirmation-message").innerText = 
        "Booking confirmed!";
    
    loadReservations();
});

function loadReservations() {
    let userEmail = localStorage.getItem("loggedInUser");
    if (!userEmail) return;

    let reservationList = document.getElementById("reservation-list");
    reservationList.innerHTML = "";

    reservations[userEmail].forEach(reservation => {
        let li = document.createElement("li");
        li.textContent = reservation;
        reservationList.appendChild(li);
    });
}
