let staffIdToDelete = null;
let staffList = [];

// Format date
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-GB");
}

// Render staff table
function renderStaffTable() {
  const tbody = document.getElementById("staff-body");
  tbody.innerHTML = "";

  if (staffList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center">No staff records found.</td></tr>`;
    return;
  }

  staffList.forEach((staff, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${staff.full_name}</td>
      <td>${staff.email}</td>
      <td>${staff.role}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="openEditModal('${staff.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="confirmDeleteStaff('${staff.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Fetch staff from API
async function fetchStaffs() {
  try {
    const res = await fetch('http://192.168.0.193:8002/api/tickets/staff', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    staffList = data;
    renderStaffTable();
  } catch (error) {
    console.error('Failed to fetch staff:', error);
  }
}

// Add new staff via API
document.getElementById("staffForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.getElementById("staff-name").value.trim();
  const email = document.getElementById("staff-email").value.trim();
  const department = document.getElementById("staff-department").value.trim();
  const role = document.getElementById("staff-role").value.trim();
  const status = document.getElementById("staff-status").value;

  if (!name || !email || !department || !role || !status) return alert("Please fill all fields.");

  const newStaff = {
    name,
    email,
    department,
    role,
    status
  };

  try {
    await fetch('http://192.168.0.193:8002/api/tickets/staff', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStaff),
    });

    await fetchStaffs();
    document.getElementById("staffForm").reset();
    bootstrap.Modal.getOrCreateInstance(document.getElementById("addStaffModal")).hide();
  } catch (error) {
    console.error('Failed to add staff:', error);
  }
});

// Open edit modal
function openEditModal(id) {
  const staff = staffList.find((s) => s.id === id);
  if (!staff) return;

  document.getElementById("edit-id").value = staff.id;
  document.getElementById("edit-name").value = staff.name;
  document.getElementById("edit-email").value = staff.email;
  document.getElementById("edit-department").value = staff.department;
  document.getElementById("edit-role").value = staff.role;
  document.getElementById("edit-status").value = staff.status;

  bootstrap.Modal.getOrCreateInstance(document.getElementById("editStaffModal")).show();
}

// Submit edit form
document.getElementById("editStaffForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const id = document.getElementById("edit-id").value;
  const name = document.getElementById("edit-name").value.trim();
  const email = document.getElementById("edit-email").value.trim();
  const department = document.getElementById("edit-department").value.trim();
  const role = document.getElementById("edit-role").value.trim();
  const status = document.getElementById("edit-status").value;

  const updatedStaff = {
    name,
    email,
    department,
    role,
    status
  };

  try {
    await fetch(`http://192.168.0.193:8002/api/tickets/staff/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStaff),
    });

    await fetchStaffs();
    bootstrap.Modal.getOrCreateInstance(document.getElementById("editStaffModal")).hide();
  } catch (error) {
    console.error('Failed to update staff:', error);
  }
});

// Confirm delete
function confirmDeleteStaff(id) {
  staffIdToDelete = id;
  bootstrap.Modal.getOrCreateInstance(document.getElementById("deleteConfirmModal")).show();
}

// Delete via API
document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
  if (staffIdToDelete) {
    try {
      await fetch(`http://192.168.0.193:8002/api/tickets/staff/${staffIdToDelete}/`, {
        method: "DELETE"
      });

      staffIdToDelete = null;
      await fetchStaffs();
      bootstrap.Modal.getOrCreateInstance(document.getElementById("deleteConfirmModal")).hide();
    } catch (error) {
      console.error('Failed to delete staff:', error);
    }
  }
});

// Load data on page load
window.addEventListener("DOMContentLoaded", fetchStaffs);
