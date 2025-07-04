// Initialize staff list from localStorage or default
let staffList = JSON.parse(localStorage.getItem("staffList")) || [];

// Utility: format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-GB");
}

// Render staff table
function renderStaffTable() {
  const tbody = document.getElementById("staff-body");
  tbody.innerHTML = "";

  if (staffList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center">No staff records found.</td></tr>`;
    return;
  }

  staffList.forEach((staff, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${staff.staffId}</td>
      <td>${staff.name}</td>
      <td>${staff.email}</td>
      <td>${staff.subject}</td>
      <td><span class="badge badge--${staff.status}">${staff.status.replace('-', ' ')}</span></td>
      <td><span class="priority priority--${staff.priority}">${staff.priority}</span></td>
      <td>${formatDate(staff.created)}</td>
      <td>
        <button class="btn btn--sm btn--primary" onclick="viewStaff('${staff.id}')">
          View
        </button>
        <button class="btn btn--sm btn-danger" onclick="deleteStaff('${staff.id}')">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Add staff
document.getElementById("submitStaff").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value;
  const status = document.getElementById("status").value;

  if (!name || !email || !subject || !description || !priority || !status) {
    alert("Please fill all fields.");
    return;
  }

  const newStaff = {
    id: Date.now().toString(),
    staffId: "STF-" + Math.floor(Math.random() * 900 + 100),
    name,
    email,
    subject,
    description,
    priority,
    status,
    created: new Date().toISOString(),
  };

  staffList.push(newStaff);
  localStorage.setItem("staffList", JSON.stringify(staffList));
  renderStaffTable();

  // Reset form
  document.getElementById("staffForm").reset();
  bootstrap.Modal.getOrCreateInstance(document.getElementById("addStaffModal")).hide();
});

// View staff details
function viewStaff(id) {
  const staff = staffList.find((s) => s.id === id);
  if (!staff) return;

  document.getElementById("modal-id").textContent = staff.staffId;
  document.getElementById("modal-name").textContent = staff.name;
  document.getElementById("modal-email").textContent = staff.email;
  document.getElementById("modal-subject").textContent = staff.subject;
  document.getElementById("modal-description").textContent = staff.description;
  document.getElementById("modal-created").textContent = formatDate(staff.created);

  const statusSpan = document.createElement("span");
  statusSpan.className = `badge badge--${staff.status}`;
  statusSpan.textContent = staff.status.replace("-", " ");
  document.getElementById("modal-status").innerHTML = "";
  document.getElementById("modal-status").appendChild(statusSpan);

  const prioritySpan = document.createElement("span");
  prioritySpan.className = `priority priority--${staff.priority}`;
  prioritySpan.textContent = staff.priority;
  document.getElementById("modal-priority").innerHTML = "";
  document.getElementById("modal-priority").appendChild(prioritySpan);

  bootstrap.Modal.getOrCreateInstance(document.getElementById("viewStaffModal")).show();
}

// Deletion logic with confirmation
let staffIdToDelete = null;

function deleteStaff(id) {
  staffIdToDelete = id;
  bootstrap.Modal.getOrCreateInstance(document.getElementById("deleteConfirmModal")).show();
}

document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  if (staffIdToDelete) {
    staffList = staffList.filter((s) => s.id !== staffIdToDelete);
    localStorage.setItem("staffList", JSON.stringify(staffList));
    renderStaffTable();
    bootstrap.Modal.getOrCreateInstance(document.getElementById("deleteConfirmModal")).hide();
    staffIdToDelete = null;
  }
});

// Render on load
window.addEventListener("DOMContentLoaded", renderStaffTable);
