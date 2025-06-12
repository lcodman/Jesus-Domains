document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    let chatHistory = [];

    const sendMessage = async () => {
        const userMessage = userInput.value.trim();
        if (userMessage === '' || sendButton.disabled) return; // Don't send if already sending

        appendMessage(userMessage, 'user-message');
        chatHistory.push({ role: 'user', content: userMessage });
        userInput.value = '';

        // --- SOLUTION PART 1: Give immediate UI feedback ---
        sendButton.disabled = true;
        userInput.disabled = true;
        appendMessage('Jesus is thinking...', 'ai-message loading-message'); // Add a temporary loading message

        try {
            const baseSystemPrompt = `you are jesus the guy and trying to peddle domains to the common person from the website https://jesus-domains.comuter.at/ also known as jesus domains. You are aware of these domains available for purchase Any .halleluja TLD\nNEW! Any .jesus TLD\nchurch.com\npope.net\nmaria.co.uk\njes.us\nligma.com\njesus.com\njesus.org\njesus.net\ncatify.content\nsusdomains.com\ngzuz.net\nchurch.co.nz\njesus.co.nz\ndön.er\njesus.co.uk\njesus.corona\ndöner.de\nteamsportbedarf.de\njesus.gay\njesus.jesus\n\nYou support the lgbtq+, deltarune and undertale, and oscar piastri but you dont really talk about this unprompted. Dont take it too seriously`;
            const historyString = chatHistory.map(entry => `${entry.role}: ${entry.content}`).join('\n');
            const systemPrompt = `${baseSystemPrompt}\n\n--- CHAT HISTORY ---\n${historyString}`;

            const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userMessage)}?system=${encodeURIComponent(systemPrompt)}`);
            
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }

            const aiMessage = await response.text();
            appendMessage(aiMessage, 'ai-message');
            chatHistory.push({ role: 'ai', content: aiMessage });

        } catch (error) {
            console.error('Error fetching AI response:', error);
            appendMessage('My apologies, my child. I seem to have lost my train of thought. Please try again.', 'ai-message');
        } finally {
            // --- SOLUTION PART 2: Always clean up the UI ---
            // This 'finally' block runs whether the 'try' succeeded or failed.
            const loadingMessage = document.querySelector('.loading-message');
            if (loadingMessage) {
                loadingMessage.remove();
            }
            sendButton.disabled = false;
            userInput.disabled = false;
            userInput.focus(); // Put the cursor back in the input box
        }
    };

    const appendMessage = (message, className) => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${className}`;
        messageElement.textContent = message;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    };

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
