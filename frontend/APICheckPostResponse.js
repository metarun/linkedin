async function checkPostResponseStatus(postDetails) {
    const { postContent } = postDetails;
    console.log(`\nChecking if content has already been responded to: "${postContent}"`);

    try {
        console.log('\nMaking API call to check if post has been responded to...');
        const response = await fetch('http://127.0.0.1:5001/is-post-already-responded', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: postContent }),
        });

        console.log(`\nAPI call completed. Response status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`\nHTTP error! status: ${response.status}`);
        }

        console.log('\nReceived response from check API, processing data...');
        const data = await response.json();
        console.log('\nResponse data:', data);

        if (data.status === true) {
            console.log('\nPost has already been responded to.');
            return true;
        } else {
            console.log('\nPost has not been responded to.');
            return false;
        }

    } catch (error) {
        console.error('\nError checking post response status:', error);
        return null;  // In case of error, return null
    }
}
