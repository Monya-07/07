const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://api.openai.com/v1/chat/completions";
const API_KEY = ""; // 🔹 Replace with your actual API Key

async function sendMessage() {
    let userText = document.getElementById("userInput").value;
    let chatBox = document.getElementById("chat-box");

    if (userText.trim() === "") return;

    chatBox.innerHTML += `<p><b>You:</b> ${userText}</p>`;
    document.getElementById("userInput").value = "";
  
    try {
        const response = await fetch(proxyUrl + apiUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: userText }],
        max_tokens: 100
    })
});

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        let botResponse = data.choices?.[0]?.message?.content || "I couldn't understand that.";

        chatBox.innerHTML += `<p><b>CyberShield:</b> ${botResponse}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Chatbot Error:", error);
        chatBox.innerHTML += `<p><b>CyberShield:</b> Sorry, I couldn't fetch a response. Please try again.</p>`;
    }
}