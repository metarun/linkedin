async function extractPostDetails(post) {
  // Extract the post content
  const postContentElement = post.querySelector('.feed-shared-update-v2__description');
  const postContent = postContentElement ? postContentElement.textContent.trim() : '';

  // Extract the number of reactions by checking multiple possible elements
  let reactionsElement = post.querySelector('span[aria-hidden="true"].social-details-social-counts__reactions-count') ||
                         post.querySelector('span[aria-hidden="true"].social-details-social-counts__social-proof-fallback-number');

  // Fallback logic: Use the first element with a valid, non-empty value
  let reactions = 0;
  if (reactionsElement && reactionsElement.textContent.trim()) {
    reactions = parseInt(reactionsElement.textContent.trim().replace(/\D/g, ''), 10);
  }
  // Extract the number of comments
  const commentsElement = post.querySelector('.social-details-social-counts__comments');
  const comments = commentsElement ? parseInt(commentsElement.textContent.trim(), 10) : 0;

  // Extract the number of reposts
  const repostsElement = post.querySelector('.social-details-social-counts__reposts');
  const reposts = repostsElement ? parseInt(repostsElement.textContent.trim(), 10) : 0;

  // Calculate total engagement
  const totalEngagement = reactions + comments + reposts;

  // Extract the profile URL
  const profileLinkElement = post.querySelector('a.app-aware-link');
  const profileURL = profileLinkElement
    ? profileLinkElement.href.replace(/\?miniProfileUrn=.*/, '')
    : null;

  // Extract the activity ID from the div with data-id
  const activityElement = post.querySelector('div[data-id^="urn:li:activity:"]');
  const activityId = activityElement ? activityElement.getAttribute('data-id') : null;

  // Check if the post is promoted
  const promotedElement = post.querySelector('a.app-aware-link span[aria-hidden="true"]');
  const isPromoted = promotedElement ? promotedElement.textContent.trim() === 'Promoted' : false;

  // Logging extracted data for debugging
  console.log('\n Is Promoted:', isPromoted);
  console.log('\n Original content:', postContent.substring(0, 30));
  console.log('\n Number of comments:', comments);
  console.log('\n Number of reactions:', reactions);
  console.log('\n Number of reposts:', reposts);
  console.log('\n Total number of Engagement:', totalEngagement);
  console.log('\n Profile URL:', profileURL);
  console.log('\n Activity ID:', activityId);

  // Return all extracted details
  return { postContent, reactions, comments, reposts, totalEngagement, profileURL, activityId, isPromoted };
}