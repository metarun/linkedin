async function getPostResponse(postContent) {
    console.log(`Sending content to http://127.0.0.1:5001/post-response-fromllm for processing: "${postContent}"`);

    try {
        const response = await fetch('http://127.0.0.1:5001/post-response-fromllm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: postContent }),  // Send the postContent directly
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Received response from API');
        const data = await response.json();

        if (data.processedContent) {
            console.log('API response: Processed content received');
            return data.processedContent;  // Return the processed content
        } else {
            console.log('API response: No processed content returned');
            return null;
        }
    } catch (error) {
        console.error('Error processing content:', error);
        return null;  // Return null in case of an error
    }
}
