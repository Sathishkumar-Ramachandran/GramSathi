# GramSathi (ग्रामसाथी) - AI Super-App for Rural India

GramSathi is a centralized, AI-powered platform designed to empower farmers and rural citizens across India. It provides personalized, hyper-local information regarding farming advisories, government schemes, local market prices, water status, and panchayat announcements in 5 regional languages (Hindi, Tamil, Telugu, Marathi, Bengali).

## Features

- **Multilingual Voice Interface:** Speak to the app in your native language. The app translates, processes the intent, and responds back with voice using Amazon Bedrock (Claude 3 Haiku / 3.5 Sonnet) and the Web Speech API.
- **Mitti Credit Score:** A unique 0-850 credit score system for farmers based on land size, crop choices, government scheme compliance, and weather resilience. 
- **Fasal Salah (Agriculture):** Real-time crop disease alerts and fertilizer recommendations.
- **Sarkaari Yojnayen (Welfare):** A customized feed of eligible government schemes (PM-KISAN, PMFBY, etc.) based on the user's profile.
- **Mandi Bhav (Market Prices):** Live APMC market prices and trends with distance tracking for nearby mandis.
- **Local Jobs & MGNREGA:** Discover local labor jobs and demand guaranteed work under MGNREGA.
- **Panchayat Hub:** Read local village notices or submit grievances directly to the Gram Panchayat.

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand, TanStack React Query
- **Icons:** Lucide React
- **Voice:** Native Web Speech API (Offline SpeechRecognition & SpeechSynthesis)

### Backend
- **Framework:** FastAPI (Python 3.11)
- **Serverless Adapter:** Mangum (for AWS Lambda / App Runner compatibility)
- **AI/LLM:** Amazon Bedrock (`anthropic.claude-3-haiku-20240307-v1:0` / `anthropic.claude-3-5-sonnet-20241022-v2:0`)
- **Cloud AWS SDK:** Boto3
- **Infrastructure:** Terraform

---

## Local Development Setup

### 1. Backend (FastAPI) Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **AWS Credentials:**
   Ensure your AWS CLI is configured with credentials that have access to Amazon Bedrock in the `ap-south-1` region.
   ```bash
   aws configure
   ```
4. **Run the server:**
   ```bash
   uvicorn app:app --reload --port 8000
   ```
   The API will be available at `http://localhost:8000`.

### 2. Frontend (Next.js) Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd gramsathi
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## Production Deployment (AWS App Runner)

This repository includes a Terraform configuration to instantly deploy the FastAPI backend to AWS App Runner.

1. **Push your code to GitHub.**
2. Go to **AWS App Runner** in your AWS Console and create a GitHub connection. Copy the Connection ARN you receive.
3. **Navigate to the Terraform folder:**
   ```bash
   cd terraform
   ```
4. **Rename the variables file:**
   Rename `terraform.auto.tfvars.example` to `terraform.auto.tfvars` and add your GitHub Repository URL and AWS Connection ARN.
5. **Deploy:**
   ```bash
   terraform init
   terraform apply
   ```
6. **Update Frontend:** 
   Once the backend is deployed, update the base URL in the frontend `lib/api.ts` to point to your new App Runner URL, build the Next.js app (`npm run build`), and deploy the frontend to Vercel or AWS Amplify.

## License
MIT License
