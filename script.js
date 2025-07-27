//   Realtime battery percentage of system
initBattery();

function initBattery() {
    const Bpercentages = document.querySelectorAll(".Bpercentage");
    navigator.getBattery().then((battery) => {
        updateBattery = () => {
            let level = Math.floor(battery.level * 100);
            Bpercentages.forEach(element => {
                element.innerHTML = level + "%";
            });
        };
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
    });
}

//   current time in system
let timeElements = document.querySelectorAll(".current-time");
setInterval(() => {
    let d = new Date();
    timeElements.forEach(element => {
        element.innerHTML = d.toLocaleTimeString();
    });
}, 1000);

// Chatbot service with integrated chatgpt API
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

// Chatbot greeting
function initChatbot() {
    const userName = localStorage.getItem('userName') || 'Ram';
    const currentTime = new Date().getHours();
    let greeting = currentTime < 12 ? 'Good morning' : currentTime < 18 ? 'Good afternoon' : 'Good evening';
    const welcomeMessage = `${greeting}, ${userName}! 👋\nHow can I help you today?`;
    const initialChat = chatbox.querySelector('.chat.incoming p');
    if (initialChat) {
        initialChat.innerHTML = welcomeMessage;
    }
}
initChatbot();

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");
    const userMessageLower = userMessage.toLowerCase();
    if (handleDeviceCommands(userMessageLower)) {
        messageElement.textContent = "Device command executed successfully!";
        return;
    }

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        })
    };

    let dots = 0;
    const typingInterval = setInterval(() => {
        messageElement.textContent = "Thinking" + ".".repeat(dots);
        dots = (dots + 1) % 4;
    }, 500);

    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            clearInterval(typingInterval);
            messageElement.textContent = data.choices[0].message.content.trim();
        })
        .catch(() => {
            clearInterval(typingInterval);
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

function handleDeviceCommands(message) {
    const commands = {
        'turn on light': () => toggleDevice('light', true),
        'turn off light': () => toggleDevice('light', false),
        'turn on speaker': () => toggleDevice('speaker', true),
        'turn off speaker': () => toggleDevice('speaker', false),
        'turn on ac': () => toggleDevice('ac', true),
        'turn off ac': () => toggleDevice('ac', false),
        'turn on fan': () => toggleDevice('fan', true),
        'turn off fan': () => toggleDevice('fan', false),
        'lock door': () => toggleDevice('lock', true),
        'unlock door': () => toggleDevice('lock', false)
    };

    for (const [command, action] of Object.entries(commands)) {
        if (message.includes(command)) {
            action();
            return true;
        }
    }
    return false;
}

function toggleDevice(deviceType, state) {
    const selector = `.ui--card:has(.ui--card-title:contains("${deviceType}")) input[type="checkbox"]`;
    const device = document.querySelector(selector);
    if (device) {
        device.checked = state;
        device.dispatchEvent(new Event('change'));
        showToast(`Voice command: ${state ? 'Turned on' : 'Turned off'} ${deviceType}`, 'success');
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});
sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// Weather API
const apiKey = "21780f6c669edbaec49e33ebcb0b6fbe";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=bangalore ";

async function checkWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();
    document.querySelector(".ui-card--value1").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".ui-card--value2").innerHTML = data.main.humidity + "%";
    document.querySelector(".ui--detail-value1").innerHTML = Math.round(data.main.temp) + "°c";
}
checkWeather();

// Cursor Animation
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Device State Persistence
function initDeviceStatePersistence() {
    const checkboxes = document.querySelectorAll('.ui--toggle input[type="checkbox"]');
    checkboxes.forEach((box) => {
        const id = box.id || box.name || `device-${Math.random().toString(36).substr(2, 9)}`;
        box.id = id;
        const savedState = localStorage.getItem(id);
        if (savedState !== null) {
            box.checked = savedState === "true";
        }
        box.addEventListener("change", () => {
            localStorage.setItem(id, box.checked);
            const deviceName = box.closest('.ui--card')?.querySelector('.ui--card-title')?.textContent || 'device';
            showToast(`${box.checked ? 'Turned on' : 'Turned off'} ${deviceName}`, 'success');
        });
    });
}
initDeviceStatePersistence();

// Voice Commands
function initVoiceCommands() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            console.log('Voice command:', command);
            if (handleDeviceCommands(command)) {
                showToast(`Voice command executed: ${command}`, 'success');
            } else {
                showToast(`Voice command not recognized: ${command}`, 'error');
            }
        };
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            showToast('Voice recognition error. Please try again.', 'error');
        };
        document.body.addEventListener('dblclick', () => {
            recognition.start();
            showToast('Listening for voice commands...', 'info');
        });
        const voiceButton = document.createElement('button');
        voiceButton.innerHTML = '<span class="material-symbols-outlined">mic</span>';
        voiceButton.className = 'voice-command-btn';
        voiceButton.title = 'Voice Commands (Double-click to activate)';
        voiceButton.addEventListener('click', () => {
            recognition.start();
            showToast('Listening for voice commands...', 'info');
        });
        document.body.appendChild(voiceButton);
    } else {
        console.log('Speech recognition not supported');
    }
}
initVoiceCommands();

// Room-wise Temperature Setting
function initRoomTemperature() {
    const roomDropdown = document.querySelector('.ui--dropdown-menu .dropdown-toggle');
    const roomItems = document.querySelectorAll('.ui--dropdown-menu .dropdown-item li');
    const roomTemperatures = {
        'Living room': { indoor: 19, outdoor: 18 },
        'Kitchen': { indoor: 22, outdoor: 18 },
        'Dining room': { indoor: 20, outdoor: 18 },
        'Master bedroom': { indoor: 18, outdoor: 18 },
        'Office': { indoor: 21, outdoor: 18 }
    };

    function updateTemperature(roomName) {
        const temp = roomTemperatures[roomName] || roomTemperatures['Living room'];
        document.querySelector('.ui--detail-value1').innerHTML = `${temp.outdoor}<span class="suffix">°C</span>`;
        document.querySelector('.ui--detail-value2').innerHTML = `${temp.indoor}<span class="suffix">°C</span>`;
        document.querySelector('.ui--dial-value3').innerHTML = `${temp.indoor}<span class="suffix">°C</span>`;
        showToast(`Switched to ${roomName} temperature`, 'info');
    }

    roomItems.forEach(item => {
        item.addEventListener('click', () => {
            const roomName = item.textContent;
            roomDropdown.textContent = roomName;
            updateTemperature(roomName);
            localStorage.setItem('selectedRoom', roomName);
        });
    });

    const savedRoom = localStorage.getItem('selectedRoom');
    if (savedRoom && roomTemperatures[savedRoom]) {
        roomDropdown.textContent = savedRoom;
        updateTemperature(savedRoom);
    }
}
initRoomTemperature();

// Newsletter Signup → Google Sheets Integration
const scriptURL = 'https://script.google.com/macros/s/AKfycbzJBCW6M3kngtjUajDNw7Y4XpGgfTS7_vGfMnc1Bg4jSemSCh0iUE9SoLrfI9GLm1uz/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.innerHTML = "✅ Thanks for Subscribing!";
                setTimeout(() => msg.innerHTML = "", 5000);
                form.reset();
            })
            .catch(error => {
                msg.innerHTML = "❌ Error! Please try again.";
                console.error('Error!', error.message);
            });
    });
}

