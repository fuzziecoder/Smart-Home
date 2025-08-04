# Smart-Home Dashboard

A modern, responsive smart home dashboard with real-time device control, voice commands, and analytics.

## ✨ Features

- **Device Control**: Toggle lights, speakers, AC, fans, and locks
- **Voice Commands**: Control devices with voice using Web Speech API
- **Real-time Weather**: Live weather data integration
- **Energy Analytics**: Dynamic energy consumption charts using Chart.js
- **Room Temperature Control**: Multi-room temperature management
- **AI Chatbot**: GPT-powered assistant with device control integration
- **State Persistence**: Device states saved using localStorage
- **Toast Notifications**: Modern notification system
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-home
   ```

2. **Open the application**
   - Simply open `index.html` in your browser
   - Or use a local server: `python -m http.server 8000`

3. **Access the dashboard**
   - Main dashboard: `index.html`
   - About page: `aboutus.html`

## 🎮 How to Use

### Voice Commands
- **Double-click anywhere** or click the microphone button
- Say commands like: "turn on light", "turn off speaker", "turn on AC"

### Device Control
- Toggle switches to control devices
- States are automatically saved and restored
- Real-time notifications for all actions

### Room Temperature
- Select different rooms from the dropdown
- Temperatures update based on real weather data
- Preferences are saved automatically

### AI Chatbot
- Click the chat button to open the AI assistant
- Ask questions or give device commands
- Try: "Turn on the living room lights"

## 🔧 Configuration

### API Keys
The project uses these APIs (optional for basic functionality):

1. **OpenWeatherMap API** (for weather data)
   - Get your key at: https://openweathermap.org/api
   - Set as environment variable: `WEATHER_API_KEY`

2. **OpenAI API** (for chatbot)
   - Get your key at: https://platform.openai.com/
   - Update in `script.js` (line with API_KEY)

### Environment Variables
```bash
WEATHER_API_KEY=your_weather_api_key_here
```

## 🏗️ Backend Integration (Advanced)

For full smart home functionality, consider setting up a backend:

### Option 1: Node.js + Express + MongoDB

1. **Install dependencies**
   ```bash
   npm init -y
   npm install express mongoose cors dotenv jsonwebtoken bcryptjs
   ```

2. **Create server structure**
   ```
   backend/
   ├── server.js
   ├── models/
   │   ├── User.js
   │   ├── Device.js
   │   └── Log.js
   ├── routes/
   │   ├── auth.js
   │   ├── devices.js
   │   └── analytics.js
   └── middleware/
       └── auth.js
   ```

3. **Basic server setup**
   ```javascript
   // server.js
   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   mongoose.connect(process.env.MONGODB_URI);
   
   app.use('/api/auth', require('./routes/auth'));
   app.use('/api/devices', require('./routes/devices'));
   app.use('/api/analytics', require('./routes/analytics'));

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

### Option 2: Deploy to Cloud Platforms

- **Vercel**: Perfect for static sites with serverless functions
- **Render**: Easy deployment with automatic scaling
- **Railway**: Simple container deployment
- **Netlify**: Great for static sites with form handling

## 📁 Project Structure

```
smart-home/
├── index.html          # Main dashboard
├── aboutus.html        # About page
├── script.js           # Main JavaScript functionality
├── styles.css          # Main stylesheet
├── aboutus.css         # About page styles
├── profile/            # Profile images and favicon
└── README.md           # This file
```

## 🔒 Security Considerations

- **API Keys**: Never commit API keys to version control
- **HTTPS**: Use HTTPS in production for secure communication
- **Input Validation**: Validate all user inputs
- **Rate Limiting**: Implement rate limiting for API endpoints
- **Authentication**: Use JWT tokens for user authentication

## 🐛 Troubleshooting

### Common Issues

1. **Voice commands not working**
   - Ensure microphone permissions are granted
   - Check browser compatibility (Chrome/Edge recommended)

2. **Weather data not loading**
   - Verify API key is correct
   - Check network connectivity

3. **Chart not displaying**
   - Ensure Chart.js CDN is loading
   - Check browser console for errors

### Browser Support
- Chrome/Edge: Full support
- Firefox: Most features supported
- Safari: Limited voice command support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Ramkumar V** - Intern @COSMIC365 AI
- GitHub: [fuzziecoder](https://github.com/fuzziecoder)
- Instagram: [fuzziecoder](https://www.instagram.com/fuzziecoder/)

---

**Design by** 😄 fuzziecoder
