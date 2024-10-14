# Chrome Extension: Admin Messages
## Overview
This Chrome extension displays messages from an organization's admin to users. The extension shows a badge icon when there are unread messages, provides a popup interface for users to view messages, and allows users to mark messages as read. It also stores message history locally and supports background message checking.

https://github.com/user-attachments/assets/db9cb5d8-35c9-4d3a-ac32-968a2e72e757

---

## Table of Contents

- [Overview](#overview)
- [Setup Instructions](#setup-instructions)
- [Installation](#installation)
- [Testing](#testing)
- [Assumptions Made](#assumptions-made)
- [Architectural Decisions](#architectural-decisions)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Setup Instructions
### Prerequisites
- Node.js (version 14.x or later) and npm must be installed.
- Chrome browser (for extension development and testing).

### Steps to Setup the Extension Locally
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kenytw/Chrome_Extension_Message_Reader.git
   cd chrome-extension-admin-messages
   ```
2. **Install dependencies: The project uses npm to manage dependencies:**
   ```bash
   npm install
   ```
3. **Build the extension: Build the extension for production:**
   ```bash
   npm run build
   ```
   This will generate the necessary files to load the Chrome extension in the `dist/` folder.
4. **Load the extension in Chrome:**
   1. Open Chrome and navigate to `chrome://extensions/`.
   2. Enable Developer mode (top right corner).
   3. Click on Load unpacked.
   4. Select the `dist/` folder to load the extension.

---

## Installation
### Manual Installation (Without Build)
To install the extension without building it, you can use the source code directly:
1. Go to `chrome://extensions/`.
2. Enable Developer mode.
3. Click Load unpacked.
4. Select the `src/` folder to load the extension.

---

## Testing
(not done yet)
### Running Unit Tests
Unit tests are written using Jest to test the logic behind message fetching, notifications, and message state management.
1. Install the testing dependencies:
   ```bash
   npm install
   ```
2. Run the tests:
   ```bash
   npm test
   ```
3. View the test results:  
   After running the tests, Jest will output the results to the terminal. Example output:
   ```bash
   PASS  src/background.test.js
   ✓ should fetch messages correctly (15 ms)
   
   Test Suites: 1 passed, 1 total
   Tests:       2 passed, 2 total
   ```
4. To see coverage reports:
   ```bash
   npm run test:coverage
   ```
### Manual Testing Instructions
1. Ensure the extension is loaded in Chrome (`chrome://extensions/`).
2. Trigger message fetch events from the extension popup. 
3. Verify the behavior of notifications when new messages are received.
4. Check if messages can be marked as read and persist across browser sessions.

---

## Assumptions Made
- **User Action Required:** The extension relies on user gestures to open the popup interface and mark messages as read. This aligns with Chrome’s permission model which restricts certain actions to user-initiated events.
- **Mock API:** For demonstration purposes, the extension fetches messages from a mock API (`data/msg.json`). This can be replaced with an actual API endpoint for live usage.
- **Local Storage:** The extension uses Chrome’s local storage API to persist the message state (e.g., read/unread status). No external databases are utilized.
- **Audio Notifications:** Notification sounds are only played for high-priority messages, assuming the user has not muted the browser.

---

## Architectural Decisions
### Frontend
- **React:** The popup interface is built using React to streamline the state management and UI rendering.
- **CSS Framework:** **Tailwind CSS** is used for styling to ensure a clean, responsive UI.
- **State Management:** React hooks are used to manage the message state within the popup. This state is synchronized with Chrome’s local storage to ensure persistence across browser sessions.
- **CI/CD:** Currently only commit and push from local develop environment to GitHub repo. 
### Backend Mock API
- **Mock Data:** Since this is a demo project, a mock API endpoint simulates fetching messages.  
  An example response looks like this:
  ```json
  {
    "messages": [
      {
        "id": "msg001",
        "content": "Team meeting at 3 PM",
        "priority": "high",
        "timestamp": "2024-09-30T15:00:00Z",
        "read": false
      }
    ]
  }
  ```
### Chrome APIs Used
- **chrome.storage:** For persisting message states (read/unread) across sessions. 
- **chrome.action:** Manages the popup and badge icon updates to show unread messages. 
- **chrome.alarms:** Used to periodically poll the backend for new messages.

---

## Future Improvements
1. **Real API Integration:**
   - Replace the mock API with a real-time message service for dynamic message delivery from admins to users.
2. **User Preferences:**
   - Create more options where users can set preferences such as notification sound, polling interval, and other customization options.
3. **Push Notifications:**
   - Implement push notifications instead of periodic polling to reduce the performance impact and provide instant updates when new messages are available.
4. **Categories and Filters:**
   - Allow users to filter messages by categories such as "General", "Urgent", and "Updates".
5. **Localization:**
   - Add support for multiple languages for international users.
6. **Performance Optimization:**
   - Further optimize the background polling mechanism by integrating service workers or utilizing WebSockets.
7. **CI/CD:**
   - Set up a continuous integration and continuous deployment (CI/CD) pipeline using GitHub Actions or Jenkins to automate builds and testing.

---

### Author
Keny Lin
Feel free to check my [portfolio](https://kenylin.com).
```arduino
This template offers clear and concise instructions on setup, testing, and usage, and outlines important details regarding architectural choices and potential future improvements. You can fill in project-specific details like the repository link and actual folder structure.
```
