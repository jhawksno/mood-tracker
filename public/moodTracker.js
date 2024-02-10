document.getElementById('saveMood').addEventListener('click', function() {
    const moodSelector = document.getElementById('moodSelector');
    const mood = moodSelector.value;
    const dateTime = new Date().toISOString(); // ISO string format for consistency

    if (moodSelector.selectedIndex > 0) { // Ensures a valid mood is selected
        fetch('http://localhost:3000/moods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mood, dateTime }),
        })
        .then(response => response.json())
        .then(data => {
            displayMoodLog(); // Refresh the mood log
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert("Please select a valid mood before saving.");
    }
});

moodLog.forEach((entry) => {
    // Assuming entry._id is the unique ID from your MongoDB document
    const entryDiv = document.createElement('div');
    // Your code to set up the entryDiv goes here

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    // Set a data attribute or directly use the ID in the onclick function
    deleteBtn.setAttribute('data-id', entry._id);
    deleteBtn.addEventListener('click', function() {
        const entryId = this.getAttribute('data-id');
        deleteMood(entryId);
    });

    entryDiv.appendChild(deleteBtn);
    moodLogContainer.appendChild(entryDiv);
});


function deleteMood(id) {
    fetch(`http://localhost:3000/moods/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            displayMoodLog(); // Refresh the mood log to reflect the deletion
        } else {
            throw new Error('Failed to delete the mood entry');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while trying to delete the mood entry.');
    });
}

// Display mood log on initial load
document.addEventListener('DOMContentLoaded', displayMoodLog);
