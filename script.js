const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API Key

const addMessage = (text, className) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
};

const fetchBotResponse = async (userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        return "Sorry, I couldn't fetch a response.";
    }
};

const handleUserMessage = async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, "user");
    userInput.value = "";

    setTimeout(() => addMessage("Thinking...", "bot"), 500);

    const botResponse = await fetchBotResponse(userMessage);
    document.querySelector(".bot:last-child").innerText = botResponse;
};

sendBtn.addEventListener("click", handleUserMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        handleUserMessage();
    }
});