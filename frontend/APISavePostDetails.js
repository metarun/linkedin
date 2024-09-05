// APISavePostDetails.js

function savePostDetails(postDetails) {
  console.log('\n Sending post details to save:', postDetails);

  fetch('http://127.0.0.1:5001/save-post-details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postDetails),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.status === 'success') {
      console.log('\nSuccess:', data.message);
    } else {
      console.error('\nError:', data.message);
    }
  })
  .catch(error => {
    console.error('\n Error saving post details:', error);
  });
}