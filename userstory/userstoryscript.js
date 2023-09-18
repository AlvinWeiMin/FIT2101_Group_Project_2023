document.addEventListener('DOMContentLoaded', () => {
    const userStoryForm = document.getElementById('userStoryForm');
    const backlogList = document.getElementById('backlogList');

    userStoryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(userStoryForm);
      const response = await fetch('/api/user-stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        const newUserStory = await response.json();
        const listItem = document.createElement('li');
        listItem.textContent = `${newUserStory.title} (Epic: ${newUserStory.epic}, Estimate: ${newUserStory.estimate})`;
        backlogList.appendChild(listItem);
        userStoryForm.reset();
      } else {
        alert('Error creating user story.');
      }
    });
  });