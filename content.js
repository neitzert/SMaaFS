function getTweetContent() {
    let tweetElement = document.querySelector('[data-testid="tweetText"]');
    return tweetElement ? tweetElement.innerText : null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'get_data') {
        const data = getTweetContent();
        sendResponse({ data: data });
    }
});
