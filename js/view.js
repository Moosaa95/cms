const tickets = [
  {
    id: "001",
    name: "Aysha Sani",
    email: "ayoosha2004@gmail.com",
    subject: "Payment Issue",
    description: "Bug",
    status: "in-progress",
    priority: "High",
    created: "2 hours ago"
  },
  {
    id: "002",
    name: "Hannat Wakili",
    email: "hanny4@gmail.com",
    subject: "Payment Error",
    description: "Support needed",
    status: "closed",
    priority: "Normal",
    created: "7 hours ago"
  },
  {
    id: "003",
    name: "Amina Buhari",
    email: "meeno26@gmail.com",
    subject: "Login Failed",
    description: "Can't access dashboard",
    status: "on-hold",
    priority: "Medium",
    created: "Jan 02, 2025"
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
    <td>${index + 1}</td>
    <td>${ticket.id}</td>
    <td>${ticket.name}</td>
    <td>${ticket.email}</td>
    <td>${ticket.subject}</td>
    <td>${ticket.description}</td>
    <td><span class="status ${ticket.status}">${formatText(ticket.status)}</span></td>
    <td><span class="priority ${ticket.priority.toLowerCase()}">${ticket.priority}</span></td>
    <td>${ticket.created}</td>
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
