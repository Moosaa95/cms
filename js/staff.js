// Load staff from localStorage
let staffList = JSON.parse(localStorage.getItem("staffList")) || [];
let staffIdToDelete = null;

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-GB");
}

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
      <td>${staff.department}</td>
      <td>${staff.role}</td>
      <td>${staff.status}</td>
      <td>${formatDate(staff.created)}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="openEditModal('${staff.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="confirmDeleteStaff('${staff.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById("staffForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("staff-name").value.trim();
  const email = document.getElementById("staff-email").value.trim();
  const department = document.getElementById("staff-department").value.trim();
  const role = document.getElementById("staff-role").value.trim();
  const status = document.getElementById("staff-status").value;

  if (!name || !email || !department || !role || !status) return alert("Please fill all fields.");

  const newStaff = {
    id: Date.now().toString(),
    staffId: "STF-" + Math.floor(Math.random() * 900 + 100),
    name,
    email,
    department,
    role,
    status,
    created: new Date().toISOString(),
  };

  staffList.push(newStaff);
  localStorage.setItem("staffList", JSON.stringify(staffList));
  renderStaffTable();
  document.getElementById("staffForm").reset();
  bootstrap.Modal.getOrCreateInstance(document.getElementById("addStaffModal")).hide();
});

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

document.getElementById("editStaffForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("edit-id").value;
  const name = document.getElementById("edit-name").value.trim();
  const email = document.getElementById("edit-email").value.trim();
  const department = document.getElementById("edit-department").value.trim();
  const role = document.getElementById("edit-role").value.trim();
  const status = document.getElementById("edit-status").value;

  const staff = staffList.find((s) => s.id === id);
  if (!staff) return;

  staff.name = name;
  staff.email = email;
  staff.department = department;
  staff.role = role;
  staff.status = status;

  localStorage.setItem("staffList", JSON.stringify(staffList));
  renderStaffTable();
  bootstrap.Modal.getOrCreateInstance(document.getElementById("editStaffModal")).hide();
});

function confirmDeleteStaff(id) {
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

window.addEventListener("DOMContentLoaded", renderStaffTable);
