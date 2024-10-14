/*global chrome*/
chrome.alarms.create('checkMessages', { periodInMinutes: 1 });

function showNotification(message) {
  /*chrome.notifications.create({
    type: 'basic',
    iconUrl: 'assets/icon48.png',
    title: 'New Urgent Message',
    message: message.content,
    priority: 2,
    requireInteraction: true,
  });*/
  playNotificationSound();
}

function playNotificationSound() {
  /*const audio = new Audio('assets/notification.wav');
  audio.play();*/
}

chrome.alarms.onAlarm.addListener(() => {
  fetch('data/msg.json')
    .then(response => response.json())
    .then(data => {
      chrome.storage.local.get('messages', (result) => {
        const storedMessages = result.messages || [];

        const mergedMessages = data.messages.map((newMsg) => {
          const existingMsg = storedMessages.find((msg) => msg.id === newMsg.id);
          return existingMsg ? { ...newMsg, read: existingMsg.read } : newMsg;
        });
        chrome.storage.local.set({ messages: mergedMessages });

        const unreadCount = mergedMessages.filter(msg => !msg.read).length;
        chrome.action.setBadgeText({ text: unreadCount.toString() });

        // Check for any new high-priority unread messages and show notification
        const unreadHighPriority = mergedMessages.filter(msg => !msg.read && msg.priority === 'high');
        if (unreadHighPriority.length > 0) {
          showNotification(unreadHighPriority[0]);
        }
      });
    })
    .catch(err => console.error('Error fetching messages:', err));
});