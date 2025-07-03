// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tickets if not exists
  const initializeTickets = () => {
    const defaultTickets = [
      {
        id: "TKT-001",
        name: "Aysha Sani",
        email: "ayoosha2004@gmail.com",
        subject: "Payment Issue",
        description: "Bug in payment processing",
        status: "in-progress",
        priority: "high",
        created: new Date().toLocaleString()
      },
      {
        id: "TKT-002",
        name: "Hannat Wakili",
        email: "hanny4@gmail.com",
        subject: "Payment Error",
        description: "Support needed for failed transaction",
        status: "closed",
        priority: "normal",
        created: new Date(Date.now() - 7 * 60 * 60 * 1000).toLocaleString()
      },
      {
        id: "TKT-003",
        name: "Amina Buhari",
        email: "meeno26@gmail.com",
        subject: "Login Failed",
        description: "Can't access dashboard after multiple attempts",
        status: "on-hold",
        priority: "medium",
        created: new Date('2025-01-02').toLocaleString()
      }
    ];

    if (!localStorage.getItem("tickets")) {
      localStorage.setItem("tickets", JSON.stringify(defaultTickets));
    }
  };

  // Format text for display
  const formatText = (text) => {
    if (!text) return '';
    return text.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase());
  };

  // Render tickets table
  const renderTickets = () => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const tableBody = document.getElementById("ticket-body");
    
    if (!tableBody) {
      console.error("Ticket table body not found");
      return;
    }
    
    tableBody.innerHTML = "";

    tickets.forEach((ticket, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${ticket.id}</td>
        <td>${ticket.name}</td>
        <td>${ticket.email}</td>
        <td>${ticket.subject}</td>
        <td><span class="status ${ticket.status}">${formatText(ticket.status)}</span></td>
        <td><span class="priority ${ticket.priority}">${formatText(ticket.priority)}</span></td>
        <td>${ticket.created}</td>
        <td>
          <button class="btn btn-sm btn-primary view-btn" data-id="${ticket.id}">
            View
          </button>
          <button class="btn btn-sm btn-danger delete-btn ms-2" data-id="${ticket.id}">
            Delete
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Add event listeners after rendering
    setupEventListeners();
  };

  // Show ticket details in modal
  const showTicketDetails = (ticketId) => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const ticket = tickets.find(t => t.id === ticketId);
    
    if (!ticket) {
      console.error("Ticket not found");
      return;
    }

    // Safely set text content
    const setTextContent = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value || 'N/A';
    };

    setTextContent("modal-id", ticket.id);
    setTextContent("modal-name", ticket.name);
    setTextContent("modal-email", ticket.email);
    setTextContent("modal-subject", ticket.subject);
    setTextContent("modal-description", ticket.description);
    setTextContent("modal-status", formatText(ticket.status));
    setTextContent("modal-priority", formatText(ticket.priority));
    setTextContent("modal-created", ticket.created);

    // Initialize and show the modal
    const viewModal = new bootstrap.Modal(document.getElementById('viewTicketModal'));
    viewModal.show();
  };

  // Delete a ticket
  const deleteTicket = (ticketId) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
      const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      renderTickets();
    }
  };

  // Add new ticket
  const addTicket = () => {
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const subject = document.getElementById('subject')?.value;
    const description = document.getElementById('description')?.value;
    const priority = document.getElementById('priority')?.value;
    const status = document.getElementById('status')?.value;

    // Basic validation
    if (!name || !email || !subject || !description || !priority || !status) {
      alert("All fields are required");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    // Generate new ticket ID
    const newId = `TKT-${Date.now().toString().slice(-6)}`;

    const newTicket = {
      id: newId,
      name,
      email,
      subject,
      description,
      priority,
      status,
      created: new Date().toLocaleString()
    };

    // Get existing tickets and add new one
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    // Close modal and refresh table
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTicketModal'));
    modal.hide();
    
    // Reset form
    document.getElementById('ticketForm')?.reset();
    
    // Refresh the tickets display
    renderTickets();
  };

  // Search functionality
  const setupSearch = () => {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;
    
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const rows = document.querySelectorAll("#ticket-body tr");
      
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? "" : "none";
      });
    });
  };

  // Setup event listeners
  const setupEventListeners = () => {
    // View buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => showTicketDetails(btn.dataset.id));
    });

    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteTicket(btn.dataset.id));
    });

    // Submit ticket button
    const submitBtn = document.getElementById("submitTicket");
    if (submitBtn) {
      submitBtn.addEventListener('click', addTicket);
    }
  };

  // Initialize the page
  initializeTickets();
  renderTickets();
  setupSearch();
});