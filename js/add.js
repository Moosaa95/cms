function validateForm(){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;


    //validate the required fields
    if (!name,!email,!subject,!description,!priority) {
                alert("All fields are required");
                return false;
    }

    //validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        alert("Please enter a valid email");
        return false;
    }
    
    return true;
}

function addTicket(){
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
    document.getElementById('successMessage').style.display = 'block';
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
