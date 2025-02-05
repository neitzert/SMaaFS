# Social Media as a File System (SMaaFS PoC)
README v 0.2.1

A technical proof of concept demonstrating how encrypted data, including files and filesystems can be stored and retrieved via social media platforms.

## 📌 Overview
This repository contains source code for a Chrome browser extension that explores an unconventional approach to distributed, stateless encrypted storage.

The system encodes and fragments encrypted data, embedding it within social media posts, which can later be retrieved and decrypted using the same extension.

Encryption: AES-GCM with a passphrase-derived key (PBKDF2).

Decryption: Reads encrypted messages stored on social media and reconstructs the original content.

Stateless: No servers, no backend—data exists only in social media posts.

Minimal metadata: Uses randomized salts and IVs, avoiding sequential markers.

## Current Architecture
Encryption: AES-GCM with a passphrase-derived key (PBKDF2).

Decryption: Reads encrypted messages stored on social media and reconstructs the original content.

Stateless: No servers, no backend—data exists only in social media posts.

Minimal metadata: Uses randomized salts and IVs, avoiding sequential markers.

## Why Future Versions Will Move to ATProto & Fediverse
While this proof of concept currently relies on centralized platforms like Twitter/X, future versions will transition towards ATProto (Bluesky) and decentralized Fediverse platforms (Mastodon, 
 Pleroma, etc.) for better resilience, censorship resistance, and federation.

Twitter/X can delete posts & ban users while ATProto & Fediverse allow data to persist across multiple servers. 

Scraping Twitter is fragile where ATProto & Mastodon provide open APIs for reading/writing encrypted posts.

Twitter limits message length when Fediverse platforms allow longer storage-friendly posts.

Moving towards decentralized protocols ensures that encrypted content remains accessible, even if individual servers disappear, building layer-1 resilience required for long life stateful storage.

## Installation and Use
Due to the litegous nature of social media organizations, we are not going to tell you how to install or use this.  You're smart you can figure it out how to install an uncompressed plugin from source by yourself.


## 🔍 How It Works
This extension does not interact with any central server. Instead, it:

Encrypts text input using AES-GCM with a passphrase-derived key.

Encodes the encrypted data into social media-friendly formats.

Retrieves and decrypts data from existing posts when the correct passphrase is provided.

Because encryption is performed client-side, only users with the correct passphrase can decrypt and reconstruct the stored messages.

## 📁 Repository Contents

```
SMaaFS/
│── manifest.json      # Chrome extension manifest
│── popup.html         # Minimal UI for encryption/decryption
│── popup.js           # Handles user input, encryption, and decryption
│── content.js         # Extracts and processes posts from social media
│── background.js      # Manages inter-script messaging
│── at-ext-core        # Stub outlining move to atproto and fedi based social media
│── icons/             # Extension icons (16, 32, 48, 64, 128px)
│── README.txt         # This file
```
##  🛡 Security Details
Encryption: AES-GCM (256-bit)

Key Derivation: PBKDF2 with 100,000 iterations

Salt & IV: Generated randomly for every encryption event

No Centralized Storage: This extension does not retain or transmit any data

## 🔎 Design Considerations
Decentralized: Data exists only within social media posts, reducing reliance on a single storage provider.

Ephemeral: Encrypted data disappears if a post is deleted, leaving no traceable history.

Metadata-Aware: Avoids unnecessary identifiers, reducing the risk of automated detection.

## 📌 Limitations
Posts can be deleted. If a post is removed, its contents cannot be retrieved.

Limited Storage Capacity. Due to platform constraints, this system is impractical for large files.

No Key Recovery. If a passphrase is lost, decryption is impossible.

🛠 Future Roadmap: Transitioning to ATProto & Fediverse
🔹 Phase 0: Twitter-Only (Where We Are Now)

  - Only supports Twitter/X via JavaScript.

  - Scraping-based retrieval of encrypted messages.

  - No API integration.

  - No support for ATProto or Mastodon yet.
  - 
🔹 Phase 1: Hybrid Mode (Twitter + ATProto)

  - Add ATProto backend to allow posting encrypted data to Bluesky.

  - Users can choose Twitter/X or ATProto as their storage method.

  - Still requires manual Twitter/X copy-n-pasta for encrypted posts.
  - 
🔹 Phase 2: Full ATProto & Mastodon Support

  - Expand full support for ATProto’s decentralized storage.

  - Add Mastodon ActivityPub API integration.

  - Users can post & retrieve encrypted data across multiple federated networks.

  - No need for scraping, making SMaaFS fully API-based.

🔹 Phase 3: Deprecate Twitter/X (Optional)

  - Once decentralized options are stable, Twitter/X may be depreciated, not sure, will twitter exist then?

  - Users will have full control over their encrypted storage in the Fediverse & ATProto.

# **⚠️ 🚨 ⚖️ Legal Disclaimer
This software is provided strictly for educational and research purposes only.
The authors convey, express, and declare absolutely NO warranties, promises, or guarantees—including but not limited to functionality, usability, security, or even its continued existence.

✅ The authors provide no guarantees regarding its legality, usability, security, longevity, or even legibility.
✅ By using this software beyond simply reading it, you assume full and sole responsibility for any and all outcomes.
✅ USE THIS AT YOUR OWN RISK.
✅ The authors are not responsible for any damages, losses, or legal consequences.

By even reading this page you agree to indemnify the authors against any and all claims, disputes, or liabilities resulting from things you may do with ideas espoused, diagramed, or documented here. 

**This is an educational proof of concept.** The developers do not endorse or encourage any misuse of social media platforms.

## **📧 Contact**
For questions or feedback, open an **issue on GitHub** or reach out on **"SOCIAL MEDIA SITES"**.
