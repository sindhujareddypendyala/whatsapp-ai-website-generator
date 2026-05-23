## System Architecture

The WhatsApp AI Website Generator is an automated system that accepts website requests through WhatsApp, processes them using AI, generates responsive websites, deploys them automatically, and returns a live website URL to the user.

The complete workflow is fully automated without manual intervention.

## High-Level Workflow

WhatsApp User
      ↓
WhatsApp Client
      ↓
Message Validation
      ↓
AI Requirement Extraction
      ↓
AI Content Generation
      ↓
Responsive Website Builder
      ↓
Website Packaging
      ↓
Netlify Deployment
      ↓
Live Website URL
      ↓
Response Sent Back To WhatsApp


## Core Components

## 1. WhatsApp Client
File:
src/whatsapp/client.js

Responsibilities:
-Connects to WhatsApp Web
-Receives user messages
-Sends deployment URLs
-Handles authentication and sessions
-Supports text and voice messages

Technologies:
-whatsapp-web.js
-Puppeteer
-qrcode-terminal


## 2. AI Processing Layer
Files:
src/ai/prompts.js
src/ai/processor.js

Responsibilities:
-Extracts website requirements
-Identifies website category
-Generates professional website content
-Validates invalid or emoji-only messages

AI Capabilities:
-Requirement extraction
-Content generation
-Language understanding
-Website section generation

Technologies:
-Groq API
-Llama 3 Model


## 3. Website Generator
File:
src/generator/builder.js

Responsibilities:
-Generates responsive HTML
-Applies dynamic themes
-Builds Tailwind-based UI
-Creates modern layouts
-Generates reusable sections

Features:
-Responsive design
-Dynamic sections
-AI-generated content
-Tailwind CSS styling
-Multiple templates


## 4. Deployment System
File:
src/deployment/deployer.js

Responsibilities:
-Packages website files
-Uploads generated websites
-Creates live deployment URLs
-Handles deployment errors

Technologies:
-Netlify Drop API


## 5. Validation Layer
File:
src/utils/validator.js

Responsibilities:
-Detect invalid messages
-Reject emoji-only input
-Validate user requests
-Prevent meaningless website generation


## 6. Voice Processing
File:
src/voice/transcriber.js

Responsibilities:
-Accept voice notes
-Convert speech to text
-Forward extracted text to AI processor


## Folder Structure:
src/
│
├── ai/
│   ├── prompts.js
│   └── processor.js
│
├── deployment/
│   └── deployer.js
│
├── generator/
│   └── builder.js
│
├── utils/
│   ├── validator.js
│   └── helpers.js
│
├── voice/
│   └── transcriber.js
│
├── whatsapp/
│   └── client.js
│
└── index.js


## Request Processing Flow
Step 1 — User Sends Message

Example:

Build me a modern restaurant website named Bistroo

Step 2 — Message Validation

The validator checks:

empty messages
emoji-only messages
meaningless requests

Invalid messages receive a clarification response.

Step 3 — AI Requirement Extraction

The AI extracts:

website type
business name
sections
color schemes
layout style

Example output:

{
  "type": "restaurant",
  "businessName": "Bistroo",
  "sections": [
    "hero",
    "menu",
    "gallery",
    "contact"
  ]
}
Step 4 — AI Content Generation

The AI generates:

headlines
descriptions
CTA text
section content
testimonials
Step 5 — Website Generation

The builder:

creates HTML
applies Tailwind CSS
injects AI content
generates responsive UI
Step 6 — Deployment

The deployment module:

uploads website files
deploys to Netlify
generates live URL

Example:

https://bistroo-demo.netlify.app

Step 7 — Response Delivery

The live website URL is automatically sent back through WhatsApp.

## Key Features
-AI-powered requirement extraction
-Responsive website generation
-Automatic deployment
-whatsApp automation
-Voice support
-Dynamic editing support
-Invalid input handling
-Multiple website categories


## Security Considerations
-Environment variables used for secrets
-API keys excluded using .gitignore
-No credentials hardcoded
-Session handling isolated locally
-Scalability Possibilities

## Future improvements can include

-Database integration
-Multi-user queue system
-Docker deployment
-Cloud hosting
-Multi-page websites
-Custom domain support

## Conclusion

This system demonstrates a complete AI-powered automation pipeline combining:

-WhatsApp automation
-AI processing
-Responsive web generation
-Automated deployment

The project is designed to minimize manual work and generate professional websites within minutes.