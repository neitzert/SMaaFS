console.log("Popup loaded.");

// PBKDF2-based Key Derivation
async function deriveKey(passphrase, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw", enc.encode(passphrase), { name: "PBKDF2" }, false, ["deriveKey"]
    );
    return await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

// AES-GCM Encryption
async function encrypt(text, passphrase) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(passphrase, salt);

    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        new TextEncoder().encode(text)
    );

    return JSON.stringify({
        encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
        iv: btoa(String.fromCharCode(...iv)),
        salt: btoa(String.fromCharCode(...salt))
    });
}

// AES-GCM Decryption
async function decrypt(encryptedData, passphrase) {
    try {
        const { encrypted, iv, salt } = JSON.parse(encryptedData);
        const saltBytes = new Uint8Array([...atob(salt)].map(c => c.charCodeAt(0)));
        const ivBytes = new Uint8Array([...atob(iv)].map(c => c.charCodeAt(0)));
        const encryptedBytes = new Uint8Array([...atob(encrypted)].map(c => c.charCodeAt(0)));

        const key = await deriveKey(passphrase, saltBytes);
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: ivBytes },
            key,
            encryptedBytes
        );

        return new TextDecoder().decode(decrypted);
    } catch (e) {
        console.error("Decryption failed:", e);
        return "Decryption error";
    }
}

// Function to inject text into Twitter's tweet box
function injectTextToTweetBox(text) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs.length) {
            document.getElementById("output").innerText = "No active Twitter tab found.";
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (tweetText) => {
                let tweetBox = document.querySelector('[data-testid="tweetTextarea_0"]');
                if (tweetBox) {
                    // Simulate pasting instead of setting value
                    tweetBox.focus();

                    const event = new Event('input', { bubbles: true });
                    const clipboardData = new DataTransfer();
                    clipboardData.setData('text/plain', tweetText);
                    
                    const pasteEvent = new ClipboardEvent('paste', {
                        bubbles: true,
                        cancelable: true,
                        clipboardData: clipboardData
                    });

                    tweetBox.dispatchEvent(pasteEvent);
                    tweetBox.dispatchEvent(event);
                } else {
                    alert("Could not find Twitter's tweet box.");
                }
            },
            args: [text]
        });
    });
}



// Encryption Button
document.getElementById("encrypt").addEventListener("click", async () => {
    const text = document.getElementById("inputText").value;
    const passphrase = document.getElementById("passphrase").value;
    if (!text || !passphrase) {
        document.getElementById("output").innerText = "Missing text or passphrase.";
        return;
    }
    const encrypted = await encrypt(text, passphrase);

    // Instead of just displaying, insert into Twitter
    injectTextToTweetBox(encrypted);
    document.getElementById("output").innerText = "Encrypted text inserted into Twitter!";
});

// Decryption Button
document.getElementById("decrypt").addEventListener("click", async () => {
    chrome.runtime.sendMessage({ action: "get_data" }, async (response) => {
        if (!response || !response.data) {
            document.getElementById("output").innerText = "No tweet found.";
            return;
        }
        const passphrase = document.getElementById("passphrase").value;
        if (!passphrase) {
            document.getElementById("output").innerText = "Enter a passphrase.";
            return;
        }
        const decrypted = await decrypt(response.data, passphrase);
        document.getElementById("output").innerText = "Decrypted: " + decrypted;
    });
});
