 // 🟢 Badge styling based on status
    function getBadgeClass(status) {
      switch (status) {
        case "Open": return "bg-warning text-dark";
        case "In Progress": return "bg-primary";
        case "Resolved": return "bg-success";
        default: return "bg-secondary";
      }
    }

    // 🟢 Render tickets to table
    function renderTickets(tickets) {
      const tableBody = document.getElementById("ticketTableBody");
      tableBody.innerHTML = "";

      const statusOrder = { "Open": 1, "In Progress": 2, "Resolved": 3 };

      tickets.sort((a, b) => {
        const statusA = statusOrder[a.status] || 99;
        const statusB = statusOrder[b.status] || 99;
        if (statusA !== statusB) return statusA - statusB;

        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      tickets.forEach((ticket, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${ticket.id}</td>
          <td>${ticket.name}</td>
          <td>${ticket.email || '-'}</td>
          <td>${ticket.subject}</td>
          <td>${ticket.category || '-'}</td>
          <td><span class="badge ${getBadgeClass(ticket.status)}">${ticket.status}</span></td>
          <td>${ticket.priority}</td>
          <td>${ticket.createdAt}</td>
        `;
        tableBody.appendChild(row);
      });
    }

    // 🟢 Apply filters and search
    function applyFilters() {
      const allTickets = JSON.parse(localStorage.getItem("tickets")) || [];
      const selectedStatus = document.getElementById("statusFilter").value;
      const query = document.getElementById("searchInput").value.toLowerCase();
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;

      const filtered = allTickets.filter(ticket => {
        const matchStatus = selectedStatus === "" || ticket.status === selectedStatus;
        const matchQuery = ticket.name.toLowerCase().includes(query) || ticket.subject.toLowerCase().includes(query);
        const ticketDate = new Date(ticket.createdAt).toISOString().split("T")[0];
        const matchStart = !startDate || ticketDate >= startDate;
        const matchEnd = !endDate || ticketDate <= endDate;

        return matchStatus && matchQuery && matchStart && matchEnd;
      });

      renderTickets(filtered);
    }

    // 🟢 Filter triggers
    document.getElementById("statusFilter").addEventListener("change", applyFilters);
    document.getElementById("searchInput").addEventListener("input", applyFilters);

    // 🟢 Dummy test data
    const testTickets = [
      {
        id: "001",
        name: "Zainab",
        email: "zainabagee@gmail.com",
        subject: "Login Error",
        category: "Login",
        priority: "High",
        status: "Open",
        createdAt: "20/6/2025"
      },
      {
        id: "002",
        name: "Gambo",
        email: "husna@gmail.com",
        subject: "Payment Issue",
        category: "Billing",
        priority: "Medium",
        status: "Resolved",
        createdAt: "1/6/2025"
      }
    ];
    localStorage.setItem("tickets", JSON.stringify(testTickets));

    // 🟢 Render on page load
    window.addEventListener("DOMContentLoaded", () => {
      const allTickets = JSON.parse(localStorage.getItem("tickets")) || [];
      renderTickets(allTickets);
    });