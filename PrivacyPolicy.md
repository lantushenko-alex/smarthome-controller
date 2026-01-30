# Privacy Policy — Power Cut-off Detector (Android)

**Effective date:** 30 Jan 2026  
**App name:** Power Cut-off Detector
**Purpose:** Detect grid power cut-offs (power off/on events) and notify you via a Telegram bot.

This Privacy Policy explains what information the app processes, why it is processed, how it is stored, and what choices you have.

---

## 1) Summary

- **No account / no login required.**
- The app **monitors device power/charging state** to detect possible grid power outages.
- When a power event occurs, the app can **send a message to Telegram** using the bot token and chat IDs you provide.
- The app may store **local event logs** on your device for your review.
- The developer **does not operate a backend server** for collecting your data (unless you add one yourself).

---

## 2) Information the App Processes

### 2.1 Power status and event data
To detect grid power cut-offs, the app processes:
- Charging state (plugged/unplugged)
- Time of detected power off/on events
- Basic event type (e.g., “Power OFF”, “Power ON”)

**Purpose:** Detect outages and create a local history of events.

### 2.2 Telegram notification configuration (provided by you)
In the Settings screen you may enter:
- **Telegram Bot API key (token)**
- **Telegram Chat ID(s)** (comma-separated)
- **Message templates/text** to send on power off/on

**Purpose:** To send Telegram messages to the chat(s) you specify.

### 2.3 Logs stored on device
The app can store locally:
- Power event history (power off/on)
- Notification attempts and errors (including retries)

**Purpose:** Troubleshooting and visibility into app behavior.

### 2.4 What the App does *not* collect (by design)
The app is not intended to collect:
- Your name, email, phone number
- Contacts, photos, microphone recordings
- Precise location
- Advertising identifiers (unless added by third-party SDKs you integrate)

---

## 3) Where Data Is Stored

- **On-device local storage:** Power event logs are stored locally on your device (persistent storage).
- **Secure storage:** The Telegram bot token is stored using Android secure storage mechanisms (e.g., encrypted/secure storage provided by the platform/Expo Secure Store).

The developer does not receive these values unless you explicitly share them.

---

## 4) When Data Is Shared

### 4.1 Telegram
If Telegram notifications are enabled, the app will send HTTPS requests to the **Telegram Bot API** containing:
- Your bot token (to authenticate the bot)
- Target chat ID(s)
- Message text (your configured templates)
- Event information (power off/on, timestamp as included in the message text)

**Telegram is a third-party service**. Their handling of data is governed by Telegram’s policies and terms.

### 4.2 No developer backend
The app does not require a developer-controlled server for normal operation. Data is not uploaded to the developer by default.

### 4.3 Legal requirements
If required by law, data may be disclosed where applicable. In practice, the app does not hold your data on a server, so disclosures would generally be limited to what is on your device or what is sent to Telegram.

---

## 5) Background Operation & Android Permissions

The app is designed to work when the device is idle/asleep to detect changes and send messages.

Depending on Android version and device vendor behavior, the app may request/require system capabilities such as:

- **WAKE_LOCK**: Helps keep the CPU awake briefly to process background work reliably.
- **RECEIVE_BOOT_COMPLETED**: Allows the app to re-register background tasks after device reboot (so monitoring resumes).
- Network access: Required to reach Telegram servers.

The app uses background execution mechanisms (e.g., background fetch/task manager) to periodically check state and trigger notifications.

---

## 6) Data Retention

- **On-device logs:** Kept until you delete them (if the app provides deletion controls), clear app data, or uninstall the app.
- **Telegram messages:** Retention is controlled by Telegram and your chat settings.

---

## 7) Security

Reasonable safeguards are used:
- Sensitive values (Telegram bot token) are stored in **secure storage** where supported.
- Network communication with Telegram uses **encrypted connections (HTTPS)**.

However, no method of storage or transmission is 100% secure. You are responsible for protecting your device and your Telegram bot token.

---

## 8) Your Choices and Controls

You can:
- Disable Telegram notifications at any time in the app.
- Change or remove the bot token and chat IDs in Settings.
- Clear app storage or uninstall the app to remove locally stored logs and settings.
- Revoke permissions via Android system settings (note: functionality may be reduced).

---

## 9) Children’s Privacy

This app is not directed to children under 13 (or the minimum age in your jurisdiction). The app does not knowingly collect personal information from children.

---

## 10) Internationalization

The app supports multiple languages (default: Russian). This policy applies regardless of the language used in the UI.

---

## 11) Changes to This Policy

This policy may be updated over time. If changes are made, the “Effective date” will be updated. Continued use of the app after changes means you accept the updated policy.

---

## 12) Contact

For privacy questions or requests, contact:  
**Email:** _[insert contact email]_  
**Developer/Company:** _[insert name]_  
**Address (optional):** _[insert address]_

---

## Optional Addendum (Recommended for Play Store Listing)

**Data safety (high-level):**
- **Data collected:** Telegram chat IDs and bot token (user-provided), power event timestamps, error logs (on device)
- **Data shared:** Telegram message content and identifiers to Telegram Bot API (only if notifications are enabled)
- **Data stored:** On device; bot token in secure storage
- **Deletion:** Via uninstall/clear storage (and any in-app deletion features, if present)

---

If you want, I can also provide a **Russian version (RU)** of the same policy and/or tailor the wording to match your exact implementation details (e.g., whether logs include stack traces, whether timestamps are included in message text, whether you provide an in-app “Clear logs” button).
