function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;

    // Validate the required fields
    if (!name || !email || !subject || !description || !priority) {
        alert("All fields are required");
        return false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email");
        return false;
    }

    return true;
}

function addTicket() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;

    const ticket = {
        id: Date.now(),
        name: name,
        email: email,
        subject: subject,
        description: description,
        priority: priority
    };

    // Get existing tickets from localStorage
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.push(ticket); // Add new ticket to the array

    // Save updated tickets array back to localStorage
    localStorage.setItem('tickets', JSON.stringify(tickets));

    // Show success message
    document.getElementById('success-message').style.display = 'block'; // Corrected ID

    // Reset the form
    document.getElementById('ticketForm').reset();
}

// Save form data to localStorage on input change
document.getElementById('ticketForm').addEventListener('input', function() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value,
        priority: document.getElementById('priority').value
    };
    localStorage.setItem('formData', JSON.stringify(formData));
});

// Load saved form data on page load
window.onload = function() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        document.getElementById('name').value = savedData.name || '';
        document.getElementById('email').value = savedData.email || '';
        document.getElementById('subject').value = savedData.subject || '';
        document.getElementById('description').value = savedData.description || '';
        document.getElementById('priority').value = savedData.priority || '';
    }
};

// Handle form submission
document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    if (validateForm()) {
        addTicket(); // Only add ticket if validation passes
    }
});
const tickets =[
{
    name: "Amina Buhari",
    email: "meeno26@gmail.com",
    subject: "Login Failed",
    description: "Can't access dashboard",
    priority: "Medium",
  }
];
// Save only once
if (!localStorage.getItem("tickets")) {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}
const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
const tableBody = document.getElementById("ticket-body");
storedTickets.forEach((ticket, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${ticket.name}</td>
    <td>${ticket.email}</td>
    <td>${ticket.subject}</td>
    <td>${ticket.description}</td>
    <td><span class="priority ${ticket.priority.toLowerCase()}">${ticket.priority}</span></td>
    <td>
      <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#ticketModal" onclick="showDetails(${index})">
        View
      </button>
    </td>
  `;
  tableBody.appendChild(row);
});
function formatText(text) {
  return text.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase());
}
function showDetails(index) {
  const ticket = storedTickets[index];
  document.getElementById("modal-id").textContent = ticket.id;
  document.getElementById("modal-name").textContent = ticket.name;
  document.getElementById("modal-email").textContent = ticket.email;
  document.getElementById("modal-subject").textContent = ticket.subject;
  document.getElementById("modal-description").textContent = ticket.description;
  document.getElementById("modal-status").textContent = formatText(ticket.status);
  document.getElementById("modal-priority").textContent = ticket.priority;
  document.getElementById("modal-created").textContent = ticket.created;
}
