```md
# 🏠 MboaHub Real Estate API

MboaHub is a **real estate platform backend** that allows users to **register, authenticate, manage properties, upload images, and manage their profiles**.  
It is built with **Node.js, Express, TypeScript**, uses **cookie-based authentication**, and supports **AWS Deployment**.

---

## 🚀 Features

- 🔐 Cookie-based authentication (secure, HTTP-only cookies)
- 👤 User registration, login, OTP verification
- 🔑 Password management (forgot, verify OTP, change password)
- 🏘 Property management (CRUD)
- 🖼 Multiple image uploads to AWS S3
- 📦 Multer + AWS S3 integration
- 🧾 Swagger API documentation
- ✅ Request validation using `express-validator`
- 🐳 Docker & Docker Compose support

---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **PostgreSQL**
- **Prisma / Sequelize / TypeORM** (depending on your setup)
- **AWS**
- **Multer**
- **Swagger (OpenAPI 3.0)**
- **Docker & Docker Compose**

---

## 📁 Project Structure
```

src/
├── controllers/
├── routes/
├── validators/
├── middlewares/
├── services/
├── types/
├── utils/
├── app.ts
└── server.ts

```

---

## 🔐 Authentication

- Authentication is handled using **HTTP-only cookies**
- After login, the server sets an auth cookie
- Protected routes require the `isAuthenticated` middleware

### Auth Routes

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/verify` | Verify OTP |
| POST | `/api/v1/auth/login` | Login user |

---

## 🔑 Password Management

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/v1/password/forgot` | Request password reset OTP |
| POST | `/api/v1/password/verify` | Verify OTP & reset password |
| POST | `/api/v1/password/change` | Change password (authenticated) |

---

## 👤 User

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/v1/users/me` | Get current authenticated user |

---

## 🏘 Properties

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/v1/properties` | Create property |
| PUT | `/api/v1/properties/:id` | Update property |
| GET | `/api/v1/properties/:id` | Get property by ID |
| GET | `/api/v1/properties` | Get all properties |
| GET | `/api/v1/properties/user/me` | Get user properties |
| DELETE | `/api/v1/properties/:id` | Delete property |

All property routes require authentication.

---

## 🖼 Image Uploads (AWS S3)

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/v1/upload/images` | Upload up to 10 images |
| DELETE | `/api/v1/upload/images` | Delete images by S3 keys |

- Uses `multer`
- Accepts `multipart/form-data`
- Field name: `images`

---

## 📑 Swagger Documentation

Swagger UI is available at:

```

/api-docs

````

Features:
- Cookie authentication support
- Fully documented request/response schemas
- Easy testing of protected endpoints

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
NODE_ENV=development

DATABASE_URL=postgresql://user:password@localhost:5432/mboahub

JWT_SECRET=your_secret_key
COOKIE_NAME=access_token

AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=mboahub-bucket
````

---

## 🐳 Docker Setup

### Start containers

```bash
docker-compose up -d
```

### Stop containers

```bash
docker-compose down
```

---

## ▶️ Running Locally

```bash
npm install
npm run dev
```

or

```bash
npm run build
npm start
```

---

## 🧪 Validation

- All requests are validated using `express-validator`
- Centralized error handling
- Clean and predictable API responses

---

## 🔒 Security

- HTTP-only cookies
- Input validation
- Protected routes
- CORS configured with credentials

---

## 📌 Roadmap

- 🔍 Advanced property search & filters
- 📍 Geo-based search
- 👥 Admin roles
- ❤️ Favorites & saved properties
- 💬 Messaging between users
- 📊 Analytics dashboard

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

---

## 📄 License

MIT License

---

## ✨ Author

**MboaHub Team**
Building real estate solutions for Africa 🌍
