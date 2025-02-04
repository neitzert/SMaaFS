# Social Media as a File System (SMaaFS PoC)
README v 0.2

A technical proof of concept demonstrating how encrypted data, including files and filesystems can be stored and retrieved via social media platforms.

## 📌 Overview
This repository contains source code for a browser extension that explores an unconventional approach to distributed, stateless encrypted storage. The system encodes and fragments encrypted data, embedding it within social media posts, which can later be retrieved and decrypted using the same extension.

Encryption: AES-GCM with a passphrase-derived key (PBKDF2).

Decryption: Reads encrypted messages stored on social media and reconstructs the original content.

Stateless: No servers, no backend—data exists only in social media posts.

Minimal metadata: Uses randomized salts and IVs, avoiding sequential markers.


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


# **⚠️ 🚨 ⚖️ Legal Disclaimer**
This software is provided strictly for educational and research purposes only. The authors convey, express, and declare absolutely NO warranties, promises, or guarantees—including but not limited to functionality, usability, security, or 
even its continued existence. The authors provide no guarantees regarding its legality, usability, security, functionality, longevity, or even legibility of this. 

By using this software in any capacity beyond simply reading it, you assume full and sole responsibility for any and all outcomes. 

USE THIS AT YOUR OWN RISK. The authors are not responsible for any damages, losses, or legal consequences arising from its use. By proceeding, you agree to indemnify the authors against any and all claims, disputes, or liabilities related to this software.

The authors explicitly disclaim any liability for actions taken with or derived from this software.

**This is an educational proof of concept.** The developers do not endorse or encourage any misuse of social media platforms.

## **📧 Contact**
For questions or feedback, open an **issue on GitHub** or reach out on **"SOCIAL MEDIA SITES"**.


📧 Contact
For discussions, feedback, or contributions, open an issue on GitHub or find us @SMaaFS on the social media sites we are on.
