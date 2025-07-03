// 🟢 Global ticket storage
let allTickets = [];

// 🟢 Badge styling based on status
function getBadgeClass(status) {
  switch (status) {
    case "open": return "bg-warning text-dark";
    case "in_progress": return "bg-primary";
    case "closed": return "bg-success";
    default: return "bg-secondary";
  }
}

// 🟢 Render tickets to table
function renderTickets(tickets) {
  const tableBody = document.getElementById("ticketTableBody");
  tableBody.innerHTML = "";

  const statusOrder = { "open": 1, "in_progress": 2, "closed": 3 };

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
      <td>${ticket.title}</td>
      <td>${ticket.assigned_to?.full_name || '-'}</td>
      <td>${ticket.category || '-'}</td>
      <td><span class="badge ${getBadgeClass(ticket.status)}">${ticket.status}</span></td>
      <td>${ticket.priority}</td>
      <td>${formatDate(ticket.created_at)}</td>   <!-- ✅ Call formatDate directly -->
    `;
    tableBody.appendChild(row);
  });
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  if (isNaN(date)) return '-';

  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleString('en-US', options);
}





// 🟢 Update card counts
function updateCardCounts(stats) {
  document.getElementById("all-tickets").textContent = stats.total || 0;
  document.getElementById("open-tickets").textContent = stats.open || 0;
  document.getElementById("progress-tickets").textContent = stats.in_progress || 0;
  document.getElementById("closed-tickets").textContent = stats.closed || 0;
}

// 🟢 Apply filters and search
function applyFilters() {
  const selectedStatus = document.getElementById("statusFilter").value;
  const query = document.getElementById("searchInput").value.toLowerCase();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const filtered = allTickets.filter(ticket => {
    const matchStatus = selectedStatus === "" || ticket.status === selectedStatus;
    const matchQuery = ticket.title.toLowerCase().includes(query) || ticket.subject.toLowerCase().includes(query);
    const ticketDate = new Date(ticket.createdAt).toISOString().split("T")[0];
    const matchStart = !startDate || ticketDate >= startDate;
    const matchEnd = !endDate || ticketDate <= endDate;

    return matchStatus && matchQuery && matchStart && matchEnd;
  });

  renderTickets(filtered);
}


// 🟢 Fetch data from APIs
async function fetchStats() {
    console.log("stats");
    
  try {
    const res = await fetch('http://192.168.0.193:8080/api/tickets/stats/');
    const stats = await res.json();
    updateCardCounts(stats);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }
}

async function fetchTickets() {
    console.log("tickets");
    
  try {
    const res = await fetch('http://192.168.0.193:8080/api/tickets/',{
        method:"GET",
         headers: {
    "Content-Type": "application/json",
  },
    });
    console.log(res);
    
    const tickets = await res.json();
    allTickets = tickets;
    renderTickets(tickets);
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
  }
}

// 🟢 Event listeners for filters
['statusFilter', 'startDate', 'endDate', 'searchInput'].forEach(id => {
  document.getElementById(id).addEventListener("input", applyFilters);
});

// 🟢 Sidebar toggle for mobile view
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("mobileSidebar");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });

    window.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove("show");
      }
    });
  }

  fetchStats();
  fetchTickets();
});
