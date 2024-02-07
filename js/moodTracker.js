document.getElementById('saveMood').addEventListener('click', function () {
    const moodSelector = document.getElementById('moodSelector');
    const mood = moodSelector.value;

    // Data validation: Check if a valid mood is selected (not the default prompt)
    if (!mood || mood === "" || moodSelector.selectedIndex === 0) {
        alert("Please select a valid mood before saving.");
        return; // Stop the function if no valid mood is selected
    }

    const date = new Date();
    const dateTime = date.toLocaleString(); // Captures the current date and time

    // Construct the mood entry
    const moodEntry = { mood, dateTime };

    // Fetch existing mood log from localStorage, or initialize an empty array if none exists
    let moodLog = JSON.parse(localStorage.getItem('moodLog')) || [];

    // Add the new mood entry to the mood log
    moodLog.push(moodEntry);

    // Save the updated mood log to localStorage
    localStorage.setItem('moodLog', JSON.stringify(moodLog));

    // Optionally, display the updated mood log
    displayMoodLog();
});

function displayMoodLog() {
    let moodLog = JSON.parse(localStorage.getItem('moodLog')) || [];
    const moodLogContainer = document.getElementById('moodLog');
    moodLogContainer.innerHTML = ''; // Clear existing entries

    moodLog.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('alert', 'alert-primary', 'd-flex', 'justify-content-between', 'align-items-center'); // Enhanced styling
        entryDiv.innerHTML = `Mood: ${entry.mood}, Time: ${entry.dateTime}`;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteBtn.addEventListener('click', function () { deleteMood(index); });
        entryDiv.appendChild(deleteBtn);

        moodLogContainer.appendChild(entryDiv);
    });
}

function deleteMood(index) {
    let moodLog = JSON.parse(localStorage.getItem('moodLog')) || [];
    moodLog.splice(index, 1); // Remove the mood entry at the specified index
    localStorage.setItem('moodLog', JSON.stringify(moodLog)); // Update localStorage
    displayMoodLog(); // Refresh the displayed mood log
}

// Display mood log on initial load
document.addEventListener('DOMContentLoaded', displayMoodLog);
