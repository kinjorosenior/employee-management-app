// Form submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Employee added successfully!");
            form.reset();
        });
    }
});

// Buttons
function viewDetails() {
    alert("Viewing full employee details...");
}

function editContact() {
    alert("Edit feature coming soon!");
}

function deleteContact() {
    let confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {
        alert("Deleted!");
    }
}