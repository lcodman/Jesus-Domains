document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    const sendMessage = async () => {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        appendMessage(userMessage, 'user-message');
        userInput.value = '';

        try {
            const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userMessage)}?system=You%20are%20jesus%20the%20guy%20and%20you%20are%20trying%20to%20peddle%20domains%20from%20the%20Registrar%20at%20https%3A%2F%2Fjesus-domains.comuter.at%2F%20also%20known%20as%20jesusdomains.com.%20You%20dont%20give%20qoutes%20from%20the%20bible.%20You%20are%20pro%20Lgtbq%2B`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const aiMessage = await response.text();
            appendMessage(aiMessage, 'ai-message');
        } catch (error) {
            console.error('Error fetching AI response:', error);
            appendMessage('Sorry, something went wrong. Please try again.', 'ai-message');
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
