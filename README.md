## WhatsApp AI Website Generator

An AI-powered WhatsApp automation system that automatically generates, customizes, deploys, and shares responsive websites from simple WhatsApp messages.

This project was built as part of the ElevateBox Internship Screening Task.

## Features
- WhatsApp-based website generation
- AI-powered requirement extraction using Groq LLM
- Responsive website generation
- Automatic Netlify deployment
- Voice message support
- Website editing support
- Fast automated workflow
- Invalid message validation
- Multiple website categories
- Mobile responsive UI
- Automatic deployment pipeline


## Architecture

WhatsApp User
       ↓
WhatsApp Client
        ↓
AI Requirement Extraction
        ↓
Content Generation
        ↓
Responsive Website Generator
        ↓
Netlify Deployment
        ↓
Live Website URL


## Tech Stack

Technology	      -     Purpose
Node.js	         -     Backend runtime
whatsapp-web.js	-     WhatsApp automation
Groq API	         -     AI-powered requirement extraction
Tailwind CSS      -   	Responsive UI styling
Puppeteer         -   	Browser automation
Netlify API	      -     Automatic website deployment
JavaScript	      -     Core application logic


## Project Structure

Elevatebox_Internship_Task/
 README.md
 package.json
 .gitignore
 .env.example

  src/
       index.js
       whatsapp/
               client.js
       ai/
               prompts.js
               processor.js
        generator/
        builder.js
        deployment/
              deployer.js
        voice/
               transcriber.js
        utils/
               validator.js
               analytics.js
        docs/
               ARCHITECTURE.md
               DEMO.md
 tests/
        builder.test.js


## Supported Website Types


Restaurant Websites
Portfolio Websites
Ecommerce Websites
Agency Websites
Startup Landing Pages
Business Websites


## Voice Message Support

Users can send voice messages describing website requirements.

The system:

Converts speech to text
Extracts website requirements using AI
Generates responsive websites
Deploys automatically
Returns live website URL



## Website Editing Support

Users can also modify generated websites dynamically.

Example:

Make the navbar dark

Add testimonials section

Change hero section color


## Validation System

The system automatically detects:

Invalid messages
Emoji-only messages
Empty requests
Meaningless prompts

And responds with a clarification request.



## Deployment Pipeline

The project automatically:

Generates website files
Creates deployment package
Deploys to Netlify
Returns live website URL

No manual deployment required.


## Testing

To test manually:

Start application
Scan WhatsApp QR code
Send website request through WhatsApp
Wait for AI processing
Receive live deployed website URL


## Unique Features

Real-time WhatsApp automation
AI-based requirement understanding
Dynamic responsive website generation
Website editing through chat
Voice message support
Automated deployment pipeline
Multi-template support

## Known Limitations
Free-tier deployment limitations
WhatsApp Web session dependency
AI generation speed depends on API response time
Netlify free plan bandwidth limits

## Demo Video
https://drive.google.com/file/d/1YzdJqjsFUipLWDZRUG99E7mnKJxrv1Mh/view?usp=drivesdk

