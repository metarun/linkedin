async function clickLinkedInHomeIcon() {
  console.log('Attempting to find LinkedIn home icon...');
  const homeIcon = document.querySelector('li-icon[type="app-linkedin-bug-color-icon"]');
  if (homeIcon) {
    console.log('LinkedIn home icon found');
    const clickableAncestor = homeIcon.closest('a');
    if (clickableAncestor) {
      clickableAncestor.click();
      console.log('Clicked on LinkedIn home icon');
    } else {
      console.log('Found LinkedIn icon, but no clickable ancestor');
    }
  } else {
    console.log('LinkedIn home icon not found');
  }

  console.log('\nWaiting for 5 seconds for the page to load...');
  await new Promise(resolve => setTimeout(resolve, 5000));
}


function findPosts() {
  console.log('Attempting to find all posts on the page...');
  const posts = document.querySelectorAll('.feed-shared-update-v2');
  console.log(`Found ${posts.length} posts on the page`);
  return posts;
}
