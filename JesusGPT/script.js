document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    [span_0](start_span)let chatHistory = [];[span_0](end_span)

    const sendMessage = async () => {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        appendMessage(userMessage, 'user-message');
        [span_1](start_span)chatHistory.push({ role: 'user', content: userMessage });[span_1](end_span)
        userInput.value = '';

        try {
            const baseSystemPrompt = `you are jesus the guy and trying to peddle domains to the common person from the website https://jesus-domains.comuter.at/ also known as jesus domains. You are aware of these domains available for purchase Any .halleluja TLD\nNEW! Any .jesus TLD\nchurch.com\npope.net\nmaria.co.uk\njes.us\nligma.com\njesus.com\njesus.org\njesus.net\ncatify.content\nsusdomains.com\ngzuz.net\nchurch.co.nz\njesus.co.nz\ndön.er\njesus.co.uk\njesus.corona\ndöner.de\nteamsportbedarf.de\njesus.gay\njesus.jesus\n\nYou support the lgbtq+, deltarune and undertale, and oscar piastri but you dont really talk about this unprompted. [span_2](start_span)Dont take it too seriously`;[span_2](end_span)
            [span_3](start_span)const historyString = chatHistory.map(entry => `${entry.role}: ${entry.content}`).join('\n');[span_3](end_span)
            [span_4](start_span)const systemPrompt = `${baseSystemPrompt}\n\n--- CHAT HISTORY ---\n${historyString}`;[span_4](end_span)

            [span_5](start_span)const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userMessage)}?system=${encodeURIComponent(systemPrompt)}`);[span_5](end_span)
            if (!response.ok) {
                [span_6](start_span)throw new Error('Network response was not ok');[span_6](end_span)
            }
            [span_7](start_span)const aiMessage = await response.text();[span_7](end_span)
            [span_8](start_span)appendMessage(aiMessage, 'ai-message');[span_8](end_span)
            [span_9](start_span)chatHistory.push({ role: 'ai', content: aiMessage });[span_9](end_span)
        [span_10](start_span)} catch (error) {[span_10](end_span)
            [span_11](start_span)console.error('Error fetching AI response:', error);[span_11](end_span)
            [span_12](start_span)appendMessage('Sorry, something went wrong. Please try again.', 'ai-message');[span_12](end_span)
        }
    };

    [span_13](start_span)const appendMessage = (message, className) => {[span_13](end_span)
        [span_14](start_span)const messageElement = document.createElement('div');[span_14](end_span)
        [span_15](start_span)messageElement.className = `message ${className}`;[span_15](end_span)
        [span_16](start_span)messageElement.textContent = message;[span_16](end_span)
        [span_17](start_span)chatLog.appendChild(messageElement);[span_17](end_span)
        [span_18](start_span)chatLog.scrollTop = chatLog.scrollHeight;[span_18](end_span)
    };

    [span_19](start_span)sendButton.addEventListener('click', sendMessage);[span_19](end_span)
    [span_20](start_span)userInput.addEventListener('keypress', (event) => {[span_20](end_span)
        [span_21](start_span)if (event.key === 'Enter') {[span_21](end_span)
            [span_22](start_span)sendMessage();[span_22](end_span)
        }
    });
[span_23](start_span)});[span_23](end_span)
