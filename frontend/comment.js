// // commentOnPosts.js

// Function to comment on a post
function commentOnPost(post, commentText) {
  console.log(`Attempting to comment on post with content: "${commentText}"`);
  const commentButton = post.querySelector('button[aria-label="Comment"]');

  if (commentButton) {
    commentButton.click();
    console.log('\nClicked on the "Comment" button');
    setTimeout(() => {
      const commentInput = post.querySelector('div[contenteditable="true"][data-placeholder="Add a comment…"]');

      if (commentInput) {
        console.log('Found comment input box');
        commentInput.focus();
        commentInput.textContent = commentText;
        commentInput.dispatchEvent(new Event('input', { bubbles: true }));
        commentInput.dispatchEvent(new Event('blur', { bubbles: true }));

        setTimeout(() => {
          const postButton = post.querySelector('button.artdeco-button--primary');

          if (postButton && postButton.textContent.trim() === 'Post') {
            postButton.click();
            console.log(`\nPosted comment: "${commentText}"`);
          } else {
            console.log('\nUnable to find "Post" button');
          }
        }, 4000); // Wait for "Post" button to appear
      } else {
        console.log('\nUnable to find comment input box');
      }
    }, 4000); // Wait for comment box to appear
  } else {
    console.log('\nUnable to find "Comment" button');
  }
}

// Main function to read LinkedIn page and comment
// async function readLinkedInPageAndComment() {
//   console.log('\nStarting to read LinkedIn page and comment...');
//   clickLinkedInHomeIcon(); // Click on LinkedIn home icon
//
//   console.log('\nWaiting for 5 seconds for the page to load...'); // Wait for 5 seconds for the page to load
//   await new Promise(resolve => setTimeout(resolve, 5000));
//
//   console.log('\nPage load wait complete. Proceeding to find posts...');
//   const posts = findPosts();
//   let commentPosted = false;  // Flag to ensure only one comment is posted
//
//   for (const [index, post] of posts.entries()) {
//     console.log(`\n--- Processing Post ${index + 1} ---`);
//     const postDetails = ExtractPostDetails(post);
//     savePostDetails(postDetails);  // Save post details for all posts
//     console.log('\nSaving post details...');
//
//     const { postContent } = postDetails;
//
//     if (!commentPosted && postContent.length > 400) {  // Ensure content meets your criteria
//       const processedContent = await getPostResponseFromLLM(postContent);
//       if (processedContent !== 'Already Processed') {
//         commentOnPost(post, processedContent);
//         commentPosted = true;  // Set the flag to prevent further commenting
//       }
//     } else {
//       console.log(`\nPost ${index + 1} does not meet the content length criteria or already processed, skipping...`);
//     }
//   }
//
//   if (!commentPosted) {
//     console.log('\nNo suitable post found for commenting.');
//   }
// }

// // Function to comment on a post
// function commentOnPost(post, commentText) {
//   console.log(`Attempting to comment: "${commentText}"`);
//
//   // Find the "Comment" button
//   const commentButton = post.querySelector('button.comment-button');
//
//   if (commentButton) {
//     commentButton.click();
//     console.log('Clicked on the "Comment" button');
//
//     // Wait for the comment input box to appear
//     const commentInputWatcher = setInterval(() => {
//       const commentInput = post.querySelector('div[contenteditable="true"][data-placeholder="Add a comment…"]');
//
//       if (commentInput) {
//         clearInterval(commentInputWatcher);
//         console.log('Found comment input box');
//
//         // Focus on the comment input and enter the text
//         commentInput.focus();
//         commentInput.textContent = commentText;
//         commentInput.dispatchEvent(new Event('input', { bubbles: true }));
//         commentInput.dispatchEvent(new Event('blur', { bubbles: true }));
//
//         // Find and click the "Post" button
//         const postButton = post.querySelector('button.artdeco-button--primary span.artdeco-button__text');
//         if (postButton && postButton.textContent.trim() === 'Post') {
//           postButton.closest('button').click();
//           console.log(`\nPosted comment: "${commentText}"`);
//         } else {
//           console.log('\nUnable to find "Post" button');
//         }
//       }
//     }, 200); // Check for comment input box every 200ms
//   } else {
//     console.log('\nUnable to find "Comment" button');
//   }
// }