# WhatsApp AI Website Generator

An AI-powered WhatsApp automation system that automatically generates, customizes, deploys, and shares responsive websites from simple WhatsApp messages.




# What This Does

This project allows users to create websites simply by sending messages through WhatsApp.

The system uses AI to understand website requirements, generate professional website content, build responsive websites automatically, deploy them to Netlify, and return live website URLs back to the user — all without manual intervention.



# Features

- WhatsApp-based website generation
- AI-powered requirement extraction
- Responsive website generation
- Automatic Netlify deployment
- Voice message support
- Website editing support
- Invalid message validation
- Multiple website categories
- Dynamic responsive UI generation



# Project Architecture

```text
WhatsApp User
      ↓
WhatsApp Client
      ↓
AI Requirement Extraction
      ↓
Content Generation
      ↓
Responsive Website Builder
      ↓
Netlify Deployment
      ↓
Live Website URL
```

---

# Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime environment |
| whatsapp-web.js | WhatsApp automation using WhatsApp Web |
| Groq API (Llama 3) | AI requirement extraction and content generation |
| Tailwind CSS | Responsive and modern UI styling |
| Puppeteer | Browser automation |
| Netlify API | Automatic deployment of generated websites |
| JavaScript | Core application logic |

---

# Prerequisites

Before running the project, ensure you have:

- Node.js v18 or higher
- npm
- Google Chrome installed
- WhatsApp account
- Groq API Key
- Netlify Personal Access Token

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/sindhujareddypendyala/whatsapp-ai-website-generator.git
```

---

## 2. Navigate To Project

```bash
cd whatsapp-ai-website-generator
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Create Environment Variables File

Create a `.env` file in the root directory.

Example:

```env
GROQ_API_KEY=your_groq_api_key

NETLIFY_AUTH_TOKEN=your_netlify_personal_access_token
```

---

# Environment Variables Explanation

| Variable | Description |
|---|---|
| GROQ_API_KEY | Used for AI requirement extraction and content generation |
| NETLIFY_AUTH_TOKEN | Used for automatic Netlify deployment |

---

# How To Run The Project

Start the application using:

```bash
npm start
```

OR

```bash
node src/index.js
```

---

# WhatsApp Setup

1. Run the application
2. A QR code will appear in the terminal
3. Open WhatsApp on your phone
4. Go to:
   - Linked Devices
   - Link a Device
5. Scan the QR code

After successful authentication:

```text
✅ WhatsApp Client is ready!
```

will appear in the terminal.

---

# How To Test Manually

Send WhatsApp messages like:

```text
Build me a premium restaurant website named Bistroo
```

```text
Create a modern portfolio website for my photography business
```

```text
Build an ecommerce website for my bakery
```

The system will:
1. Extract website requirements
2. Generate website content
3. Build responsive website files
4. Deploy the website automatically
5. Return a live Netlify URL

---

# Supported Website Types

- Restaurant Websites
- Portfolio Websites
- Ecommerce Websites
- Agency Websites
- Startup Landing Pages
- Business Websites

---

# Voice Message Support

Users can send WhatsApp voice messages describing website requirements.

The system converts speech to text, extracts requirements using AI, generates websites, deploys them automatically, and returns the live URL.

---

# Website Editing Support

Users can also modify generated websites dynamically.

Example requests:

```text
Make the navbar dark
```

```text
Add testimonials section
```

```text
Change hero section color
```

---

# Validation System

The system automatically detects:
- invalid messages
- empty requests
- emoji-only messages
- meaningless prompts

Invalid inputs receive a clarification response instead of generating websites.

---

# Known Limitations 

- The project currently depends on `whatsapp-web.js`, which requires Puppeteer and an active browser session.
- Generated websites are currently single-page static websites.
- Netlify free-tier deployment limits may affect heavy usage.
- Website generation speed depends on AI API response time.
- WhatsApp sessions may disconnect if WhatsApp Web updates.

---

# Future Improvements

- AI-generated images and logos
- Multi-page website generation
- Database integration
- Analytics dashboard
- Custom domain support
- Docker deployment
- CMS integration
- Real-time progress updates
- Multi-user scalability

---

# Demo Video

https://drive.google.com/file/d/1YzdJqjsFUipLWDZRUG99E7mnKJxrv1Mh/view?usp=drivesdk


---

# Security

- Environment variables are used for secrets
- `.env` is excluded using `.gitignore`
- API keys are not hardcoded in source code
- Local WhatsApp session storage is isolated

---

# Folder Structure

```text
src/
│
├── ai/
├── deployment/
├── generator/
├── utils/
├── voice/
├── whatsapp/
│
└── index.js
```

---

# Developer

Sindhuja Pendyala
B.Tech Data Science Student  
AI-ML & Full Stack Enthusiast

---


