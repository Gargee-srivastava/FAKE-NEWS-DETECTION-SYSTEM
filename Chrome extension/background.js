/**
 *DISCLAIMER: Any Part or segment of the comments presented as documentation cannot be modified or removed without the proper permission from the current author. If any of the documentation in the public domain is found without proper credits and permission of the author, it will be dealt as plagiarism of the original code. However, part of the codes can be customized and used as per needs without any permission for personal use.
 *Author: GARGEE SRIVASTAVA
 *Contact details: srivastava.gargee@gmail.com
 *Developed for: Smart INdia Hackathon 2020.
 */
chrome.runtime.onMessage.addListener(receiver);

// A "global" variable to store the word selected by the user
var word;

// Get the message from the content script
function receiver(request, sender, sendResponse) {
  // Save the word
  word = request.word;
}
