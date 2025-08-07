# 🧠 PrepMentor AI

**SnapPrep | MockMate**

PrepMentor AI is an AI-powered mock interview platform that helps users prepare for technical and behavioral interviews using text. It delivers instant AI feedback, tracks performance, and sends weekly reports — making interview prep smarter and more personalized.

---

## 📸 Demo

Coming soon...

---

## 🚀 Features

- 🔐 JWT-based authentication (Spring Boot + React)
- 🎙️ Answer interview questions via text
- 💬 AI-generated feedback using OpenAI API
- 📊 Performance dashboard and analytics
- ⚙️ CI/CD pipeline using GitHub Actions + AWS CodePipeline
- 📱 Mobile responsive layout

- ☁️ Media uploads to AWS S3 [when audio & video'll be added]

---

## 🧱 Tech Stack

| Layer        | Technology                   |
| ------------ | ---------------------------- |
| Frontend     | React, Tailwind CSS or MUI   |
| Backend      | Spring Boot, Spring Security |
| Auth         | JWT                          |
| Database     | MySQL                        |
| AI Feedback  | OpenAI API                   |
| Media Upload | AWS S3                       |
| Hosting      | AWS CloudFront & Render      |

---

## 📁 Project Structure

```
prepmentor-ai/
├── client/                  # React frontend
├── server/                  # Spring Boot backend
├── README.md
└── LICENSE
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/prepmentor-ai.git
cd prepmentor-ai
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 3. Backend Setup

```bash
cd server
./mvnw spring-boot:run
```

### 4. MySQL Configuration

```sql
CREATE DATABASE prepmentor;
```

Update your Spring Boot application.properties accordingly.

---

## 🔐 Environment Variables

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_OPENAI_KEY=your_openai_key
```

### Backend (application.properties)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/prepmentor
spring.datasource.username=root
spring.datasource.password=yourpassword
jwt.secret=your_jwt_secret_key
aws.accessKey=YOUR_ACCESS_KEY
aws.secretKey=YOUR_SECRET_KEY
aws.s3.bucket=your-bucket-name
openai.api.key=sk-xxxxxx
```

---

## 🧩 Core Modules

### Authentication

- JWT-based signup/login
- Protected routes

### Question Answering

- Answer with text/audio/video [text supported initially]
- Uploads go to AWS S3

### AI Feedback

- Uses OpenAI for reviewing answers
- Returns score + coaching tips

### Dashboard

- Tracks performance, average score

---

## 🛠️ Deployment & CI/CD

- Frontend: AWS S3 + CloudFront
- Backend: Render

---

## 🙋‍♀️ Contributing

1. Fork this repo
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "feat: added new feature"`
4. Push to your fork: `git push origin feature-name`
5. Submit a PR

---

## 👥 Contributors

- [Ayesha Ghani](https://github.com/ayesha-ghani098)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
