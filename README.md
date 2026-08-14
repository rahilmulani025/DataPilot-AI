# 🚀 DataPilot AI

**DataPilot AI** is an AI-powered data analytics platform that enables users to upload datasets, automatically understand and profile their data, generate cleaning recommendations, perform exploratory data analysis (EDA), interact with datasets using natural language, and generate professional reports — all through a modern, intuitive web interface.

Built for analysts, students, researchers, startups, and business teams, DataPilot AI simplifies the complete data analysis workflow without requiring extensive technical expertise.

---

## 🌟 Key Features

### 📂 Dataset Upload & Management

* Upload CSV datasets through an intuitive interface
* Automatic dataset registration and project creation
* Dataset metadata tracking
* Project-based workspace organization

### 🔍 Automated Dataset Profiling

* Column-wise schema detection
* Missing value analysis
* Duplicate detection
* Data type identification
* Dataset quality assessment
* Statistical summaries

### 🧹 AI-Powered Data Cleaning Recommendations

* Missing value handling suggestions
* Duplicate row detection
* Outlier identification
* Data type correction recommendations
* High-cardinality feature detection
* Reversible and auditable cleaning workflow

### 📊 Exploratory Data Analysis (EDA)

* Distribution analysis
* Correlation analysis
* Feature statistics
* Dataset health metrics
* Interactive visualizations
* AI-generated insights

### 🤖 Chat With Your Dataset

Ask questions in natural language such as:

* "Which columns contain the most missing values?"
* "What are the strongest correlations?"
* "Summarize this dataset for a business user."
* "What cleaning actions do you recommend?"

The platform uses Large Language Models (LLMs) to provide intelligent, context-aware responses based on the uploaded dataset.

### 💡 AI Insights Engine

* Dataset understanding
* Business-focused insights
* Data quality observations
* Risk identification
* Actionable recommendations

### 📄 Report Generation

Generate professional reports including:

* Executive Summary
* Technical Analysis Report
* Data Quality Audit
* AI Insights Report

Export support:

* PDF
* DOCX

### 📈 Dashboard & Project Monitoring

* Active projects overview
* Dataset processing status
* AI-generated recommendations
* Activity tracking
* Performance metrics

---

## 🏗️ System Architecture

```text
Dataset Upload
       ↓
Dataset Profiling
       ↓
Cleaning Recommendations
       ↓
EDA Generation
       ↓
AI Insights
       ↓
Dataset Chat Assistant
       ↓
Report Generation
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* TypeScript
* Vite
* TanStack Router
* Tailwind CSS
* ShadCN UI
* Lucide React Icons
* Recharts
* Sonner Toast Notifications

### Backend

* FastAPI
* Python
* Pandas
* Pydantic
* Uvicorn

### AI & Analytics

* Google Gemini API / OpenAI API
* Pandas Profiling
* Statistical Analysis
* Prompt Engineering

### Reporting

* ReportLab
* Python-Docx

### Version Control & Deployment

* Git
* GitHub
* Vercel (Frontend)
* Render / Railway (Backend)

---

## 📁 Project Structure

```text
DataPilot-AI
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── routes/
│   └── assets/
│
├── backend/
│   ├── api/
│   ├── services/
│   ├── models/
│   ├── uploads/
│   ├── reports/
│   └── utils/
│
├── docs/
├── README.md
└── .gitignore
```

---

## 🎯 Core Modules

| Module                   | Status |
| ------------------------ | ------ |
| Dataset Upload           | ✅      |
| Dataset Profiling        | ✅      |
| Dataset Understanding    | ✅      |
| Cleaning Recommendations | 🚧     |
| EDA Engine               | 🚧     |
| AI Insights              | 🚧     |
| Dataset Chat             | 🚧     |
| Report Generation        | 🚧     |
| Deployment               | 🚧     |

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/rahilmulani025/DataPilot-AI.git
cd DataPilot-AI
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Start Frontend

```bash
npm run dev
```

### 4. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 5. Start Backend

```bash
uvicorn main:app --reload
```

---

## 🔐 Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_api_key

# OR

OPENAI_API_KEY=your_api_key

BACKEND_URL=http://localhost:8000
```

---

## 🎯 Future Enhancements

* Multi-dataset analysis
* Team collaboration
* Real-time data monitoring
* Advanced visual analytics
* Automated dashboard generation
* Database connectivity (MySQL/PostgreSQL)
* Role-based access control
* Cloud storage integration

---

## 👨‍💻 Team

### Rahil Mulani

Frontend Development, Backend Integration, LLM Chat System, Report Generation, Deployment

### Khadija Jamadar

Dataset Profiling, Data Processing, Cleaning Engine, EDA Pipeline, Analytics Services

---

## 📜 License

This project is developed for educational, research, and portfolio purposes.

---

## ⭐ Why DataPilot AI?

DataPilot AI bridges the gap between raw data and actionable insights by combining modern web technologies, AI-powered analytics, and an intuitive user experience into a single unified platform.

**Upload → Understand → Analyze → Chat → Generate Insights → Export Reports**
