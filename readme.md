# 📋 Customer Management Dashboard (Frontend Only)

An internal-facing web tool built with **HTML, CSS, Bootstrap, JavaScript**, and **LocalStorage** — designed to help teams manage and track customer issues.

> ⚙️ Built by interns at \[PayrepMfb], inspired by real support workflows at fintechs like Opay.

---

## 🚀 Features

* ✅ Add new customer issues via form
* 📄 View all issues in a dashboard
* 🔄 Track issue status: Open, In Progress, Resolved
* 👤 Assign issues to team members
* 🔍 Filter or sort by status (optional)
* 💾 Persistent storage via `localStorage`

---

## 📁 File Structure

```
customer-dashboard/
├── index.html          # Dashboard view
├── add.html            # Add issue form
├── view.html           # Detailed issue view
├── js/
│   ├── storage.js      # All localStorage logic
│   ├── dashboard.js    # Render table, filter, delete
│   ├── add.js          # Form handling & validation
│   └── view.js         # Show ticket details
├── css/
│   └── style.css       # Optional custom styles
└── assets/
    └── ...             # Images/icons if needed
```

---

## ✍️ Data Structure

```js
{
  id: "uuid-1",
  customerName: "Jane Doe",
  email: "jane@example.com",
  subject: "Transfer issue",
  description: "I sent money but it didn’t arrive.",
  priority: "High",
  assignedTo: "Intern 1",
  status: "Open",
  createdAt: "2025-06-24T08:00:00Z"
}
```

---

## ✅ How to Run It Locally

1. Clone the repo:

```bash
git clone https://github.com/your-org/customer-dashboard.git
```

2. Open `index.html` in your browser or use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
3. Add some tickets via `add.html`
4. Refresh dashboard to see updates

---

## 🧠 Intern Responsibilities

| Intern | Role                                          |
| ------ | --------------------------------------------- |
| A      | Dashboard view, filters, table UI             |
| B      | Add ticket form, validation, storage          |
| C      | Ticket assignment, status toggle, detail view |

---

## 🧪 Features To Test

* [ ] New issues appear in dashboard after submission
* [ ] Assigned team member is saved and displayed
* [ ] Status can be updated and persists across reloads
* [ ] Ticket detail page loads correct issue info
* [ ] Data stored in `localStorage` under key `tickets`

---

## 💡 Stretch Goals

* Search by name or email
* Add timestamps like "3 hours ago"
* Add dark mode toggle
* Export ticket list to JSON

---

## 📬 Feedback

This is a learning project. Feedback, suggestions, and improvements welcome!

---

**Maintained by:** `@moosaa95`

Feel free to open an issue or pull request ✨
