// // // Need more changes : -
// // // 1. Yes and No for each should be A toggle not to sepearte actions
// // // 2. By Default all three options are set to No
// // // 3. Add a button as Save when something is changed its enabled else its disabled
// // // 4. When Save is clicked it should show a popup saying Saved
// // // 5. Write three functions for each option and call them on save based on the toggle if yes is selected
// // // 6. For testing purpose you can use console.log to see if the functions are called or not
// // // 7. All three functions should be in three different files and should be imported in the main file/
// // // It worked. Now Lets just detail the code for Comment on Posts -- What I want is look/read the current page, and find how many comments are there on a post.
// // // 1. Find the post on the page
// // // 2. Find the comments on the post
// // // 3. Count the comments
// // // 4. If the count is more than 0 then comment on the post as "Great Post"
// // // 5. If the count is 0 then do nothing
// // // 6. For testing purpose you can use console.log to see if the functions are called or not
// // // 7. All three functions should be in three different files and should be imported in the main file/
//
// // // Lets create a function as readpage which reads the current page. And then created another function as readPost which reads the post and parses the text and logs the text in the console.
//
// // <button role="button" aria-label="Comment" id="feed-shared-social-action-bar-comment-ember47" class="artdeco-button artdeco-button--muted artdeco-button--4 artdeco-button--tertiary ember-view social-actions-button comment-button flex-wrap " data-finite-scroll-hotkey="c">        <svg role="none" aria-hidden="true" class="artdeco-button__icon " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-supported-dps="24x24" data-test-icon="comment-medium">
// // <!---->
// //     <use href="#comment-medium" width="24" height="24"></use>
// // </svg>
//
//
// // <span class="artdeco-button__text">
// //     Comment
// // </span></button>
//
//
// // <button role="button" aria-label="Comment" id="feed-shared-social-action-bar-comment-ember102" class="artdeco-button artdeco-button--muted artdeco-button--4 artdeco-button--tertiary ember-view social-actions-button comment-button flex-wrap " data-finite-scroll-hotkey="c">        <svg role="none" aria-hidden="true" class="artdeco-button__icon " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-supported-dps="24x24" data-test-icon="comment-medium">
// // <!---->
// //     <use href="#comment-medium" width="24" height="24"></use>
// // </svg>
//
//
// // <span class="artdeco-button__text">
// //     Comment
// // </span></button>
//
// <a className="app-aware-link  update-components-actor__sub-description-link" aria-label="Promoted" target="_self"
//    href="https://www.linkedin.com/company/lufthansa-group-for-business/posts" data-test-app-aware-link="">
//                 <span className="update-components-actor__sub-description t-12 t-normal
//                     t-black--light
//                     update-components-actor__sub-description--untruncated
//                     ">
//                     <span aria-hidden="true"><!---->Promoted<!----></span><span
//                     className="visually-hidden"><!---->Promoted<!----></span>
//                 </span>
// </a>