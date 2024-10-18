// Get DOM elements
let btnTambah = document.getElementById('btn-tambah');
let assignmentInput = document.getElementById('assignment');
let taskListOutput = document.getElementById('output');

// Function to create a new task element
function createTaskElement(title) {
    let task = document.createElement("div");
    task.id = `${Date.now()}`;
    task.className = 'flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm';

    task.innerHTML = `
        <p class="text-gray-700 text-base">${title}</p>
        <div class="space-x-2">
            <input type="button" id="btn-selesai" value="SELESAI" data-task="${task.id}"
                   class="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 cursor-pointer">
            <input type="button" id="btn-hapus" value="HAPUS" data-task="${task.id}"
                   class="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 cursor-pointer">
        </div>
    `;

    return task;
}

// Function to handle the "Hapus" button click
function handleHapusButtonClick(event) {
    let taskId = event.target.getAttribute('data-task');
    let taskElement = taskListOutput.querySelector(`div[id="${taskId}"]`);
    taskElement.remove();
}

// Function to handle the "Selesai" button click
function handleSelesaiButtonClick(event) {
    let taskId = event.target.getAttribute('data-task');
    let taskElement = taskListOutput.querySelector(`div[id="${taskId}"]`);
    taskElement.querySelector('p').classList.add('line-through', 'text-gray-500');
    event.target.disabled = true;
    event.target.classList.add('bg-gray-400', 'cursor-not-allowed');
}

// Event listener for the "Tambah" button
btnTambah.onclick = (e) => {
    let title = assignmentInput.value.trim();
    if (title === "") {
        alert("Inputan masih kosong");
        return;
    }

    let taskElement = createTaskElement(title);
    taskListOutput.appendChild(taskElement);
    assignmentInput.value = "";
    e.preventDefault();
};

// Event delegation for the "Hapus" and "Selesai" buttons
taskListOutput.addEventListener('click', (event) => {
    if (event.target.id === 'btn-hapus') {
        handleHapusButtonClick(event);
    } else if (event.target.id === 'btn-selesai') {
        handleSelesaiButtonClick(event);
    }
});