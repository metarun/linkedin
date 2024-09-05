// Main function to read LinkedIn page and comment
async function readLinkedInPageAndComment() {
  await clickLinkedInHomeIcon(); // Click on LinkedIn home icon
  const posts = findPosts(); // Retrieve posts from the LinkedIn page
  const min_reactions = 100; // Minimum reactions threshold
  let postLiked = false; // To ensure only 1 post is liked
  let commentPosted = false; // To ensure only 1 post is commented on

  for (const [index, post] of posts.entries()) {
    const post_number = index + 1;
    let LikedPostNumber = 0;
    let CommentedPostNumber = 0;

    console.log(`\n--- Processing Post ${post_number} ---`);
    console.log(`Retrieving details for the post on the LinkedIn page.`);

    // Extract post details (assuming this function exists)
    const postDetails  = await extractPostDetails(post);
    const { postContent, reactions } = postDetails;

    // Save details of every post
    savePostDetails(postDetails);

    // --------- Like Processing ---------
    if (!postLiked && reactions > min_reactions) {
      console.log(`\n--- Like Processing for Post ${post_number} ---`);
      console.log(`Post ${post_number} has more than ${min_reactions} reactions, liking...`);
      clickLinkedInLikeButton(); // Like the post
      console.log(`Liked Post ${post_number} because it has ${reactions} reactions.`);
      postLiked = true; // Set flag to ensure no other post is liked
      LikedPostNumber = post_number;
    } else if (postLiked) {
      console.log(`\nPost ${post_number} was not liked because a previous post ${LikedPostNumber} has already been liked.`);
    } else {
      console.log(`\nPost ${post_number} was not liked because it has only ${reactions} reactions (less than the required ${min_reactions}).`);
    }

    // --------- Comment Processing ---------
    if (!commentPosted && postContent.length > 4000000) {
      console.log(`\n--- Comment Response Processing for Post ${post_number} ---`);
      const isPostAlreadyResponded = await checkPostResponseStatus(postDetails); // Assuming this checks if a response exists
      if (!isPostAlreadyResponded) {
        const llmResponse = await getPostResponse(postContent); // Generate response
        console.log(`\nLLM Response for Post ${post_number}: ${llmResponse}`);
        commentOnPost(post, llmResponse); // Post the comment
        savePostDetails({ ...postDetails, response: llmResponse }); // Save post details with response
        commentPosted = true; // Set flag to ensure no other post is commented on
      } else {
        console.log(`\nPost ${post_number} has already been responded to, skipping comment.`);
      }
    } else if (commentPosted) {
      console.log(`\nPost ${post_number} was not commented on because a previous post ${CommentedPostNumber} has already been commented on.`);
    } else {
      console.log(`\nPost ${post_number} was not commented on because its content length is only ${postContent.length} characters (less than the required 400 characters).`);
    }
  }
}
