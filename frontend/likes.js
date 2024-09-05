function clickLinkedInLikeButton() {
    try {
        // Use a querySelector to find the button with the specific aria-label and class name
        const likeButton = document.querySelector('button[aria-label="React Like"].artdeco-button--muted');

        if (likeButton) {
            // Click the Like button
            likeButton.click();
            console.log('Successfully clicked the LinkedIn Like button.');
        } else {
            console.error('Like button not found.');
        }
    } catch (error) {
        console.error('An error occurred while trying to click the LinkedIn Like button:', error);
    }
}

function likePopularPosts(posts, minLikes = 10) {
    posts.forEach(post => {
        const postDetails = extractPostDetails(post);
        if (postDetails.reactions > minLikes) {
            const likeButton = post.querySelector('button[aria-label="React Like"].artdeco-button--muted');
            if (likeButton) {
                likeButton.click();
                console.log(`Liked post with ${postDetails.likes} likes.`);
            } else {
                console.error('Like button not found for a popular post.');
            }
        }
    });
}

