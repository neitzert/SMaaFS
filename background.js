console.log("Background script loaded.");

// Relays messages between popup.js and content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "get_data") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs.length) {
                sendResponse({ error: "No active tab found." });
                return;
            }

            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    func: () => {
                        let tweetElement = document.querySelector('[data-testid="tweetText"]');
                        return tweetElement ? tweetElement.innerText : null;
                    }
                },
                (result) => {
                    if (chrome.runtime.lastError) {
                        console.error("Script execution failed:", chrome.runtime.lastError);
                        sendResponse({ error: "Script execution failed." });
                    } else {
                        sendResponse({ data: result[0]?.result || null });
                    }
                }
            );
        });
        return true; // Keep sendResponse valid for async
    }
});
