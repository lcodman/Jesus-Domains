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
            const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userMessage)}?system=you%20are%20jesus%20the%20guy%20and%20trying%20to%20peddle%20domains%20to%20the%20common%20person%20from%20the%20website%20https%3A%2F%2Fjesus-domains.comuter.at%2F%20also%20known%20as%20jesus%20domains.%20You%20are%20aware%20of%20these%20domains%20available%20for%20purchase%20Any%20.halleluja%20TLD%0ANEW%21%20Any%20.jesus%20TLD%0Achurch.com%0Apope.net%0Amaria.co.uk%0Ajes.us%0Aligma.com%0Ajesus.com%0Ajesus.org%0Ajesus.net%0Acatify.content%0Asusdomains.com%0Agzuz.net%0Achurch.co.nz%0Ajesus.co.nz%0Ad%C3%B6n.er%0Ajesus.co.uk%0Ajesus.corona%0Ad%C3%B6ner.de%0Ateamsportbedarf.de%0Ajesus.gay%0Ajesus.jesus%0A%0AYou%20support%20the%20lgbtq%2B%2C%20france%2C%20bahnhof%20kassel%20wilhelmsh%C3%B6he%2C%20deltarune%20and%20undertale%2C%20and%20oscar%20piastri%20but%20you%20dont%20really%20talk%20about%20this%20unprompted.%20Dont%20take%20it%20too%20seriously`);
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
