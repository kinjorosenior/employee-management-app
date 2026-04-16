// =======================
// STORAGE FUNCTIONS
// =======================
function getContacts() {
    return JSON.parse(localStorage.getItem("contacts")) || [];
}

function saveContacts(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// =======================
// INIT APP
// =======================
document.addEventListener("DOMContentLoaded", () => {
    handleFormSubmit();
    loadContacts();
    loadDashboard();
});

// =======================
// ADD CONTACT
// =======================
function handleFormSubmit() {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const contact = {
            id: Date.now(),
            idNumber: form.elements[0].value,
            firstName: form.elements[1].value,
            lastName: form.elements[2].value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || "",
            phone: form.elements[3].value,
            email: form.elements[4].value,
            address: form.elements[5].value,
            dob: form.elements[6].value,
            position: form.elements[7].value
        };

        const contacts = getContacts();
        contacts.push(contact);
        saveContacts(contacts);

        alert("Contact added successfully!");

        // 🔥 Redirect to view contacts page
        window.location.href = "view-contacts.html";
    });
}

// =======================
// LOAD CONTACTS INTO TABLE
// =======================
function loadContacts() {
    const table = document.getElementById("tableBody");
    if (!table) return;

    const contacts = getContacts();
    table.innerHTML = "";

    if (contacts.length === 0) {
        table.innerHTML = `<tr><td colspan="5">No contacts found</td></tr>`;
        return;
    }

    contacts.forEach(contact => {
        const row = `
            <tr>
                <td>${contact.firstName} ${contact.lastName}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.position}</td>
                <td>
                    <button onclick="viewDetails(${contact.id})">Details</button>
                    <button onclick="editContact(${contact.id})">Edit</button>
                    <button onclick="deleteContact(${contact.id})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// =======================
// VIEW DETAILS
// =======================
function viewDetails(id) {
    const contacts = getContacts();
    const c = contacts.find(x => x.id === id);

    alert(`
Name: ${c.firstName} ${c.lastName}
Email: ${c.email}
Phone: ${c.phone}
Position: ${c.position}
    `);
}

// =======================
// DELETE CONTACT
// =======================
function deleteContact(id) {
    let contacts = getContacts();

    if (confirm("Are you sure you want to delete?")) {
        contacts = contacts.filter(c => c.id !== id);
        saveContacts(contacts);
        loadContacts();
        loadDashboard();
    }
}

// =======================
// EDIT CONTACT
// =======================
function editContact(id) {
    let contacts = getContacts();
    let c = contacts.find(x => x.id === id);

    const newName = prompt("Enter new first name:", c.firstName);
    if (newName !== null && newName !== "") c.firstName = newName;

    const newPhone = prompt("Enter new phone:", c.phone);
    if (newPhone !== null && newPhone !== "") c.phone = newPhone;

    saveContacts(contacts);
    loadContacts();
}

// =======================
// DASHBOARD UPDATE
// =======================
function loadDashboard() {
    const contacts = getContacts();

    const contactCount = document.getElementById("contactCount");
    if (contactCount) {
        contactCount.textContent = contacts.length;
    }
}