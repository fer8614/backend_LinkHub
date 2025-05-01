# LinkHub Backend API

![LinkHub Logo](https://via.placeholder.com/150) <!-- Replace with actual logo URL -->

LinkHub Backend is a RESTful API service built with Node.js, Express and MongoDB, designed to power the LinkHub link management application.
Discover your personalized digital space! Centralize all your social media accounts in a single link:

- **Custom profile:** Choose your perfect photo and write a description that reflects your essence.
- **Unlimited links:** Add and organize all your social profiles so your followers can easily find you.
- **Modern and fast design:** Intuitive interface created with React, React Router, and Vite.
- **Robust backend:** Server built with Node.js, Express, and a MongoDB database.
- **Image optimization:** Fast storage and delivery thanks to Cloudinary.
- **Safe typing:** Developed in TypeScript for more reliable and maintainable code.

Take your online presence to the next level with our complete and scalable solution!

## 🚀 Key Features

- **User authentication** with JWT and bcrypt
- **CRUD operations** for link management
- **File uploads** to Cloudinary
- **Input validation** with express-validator
- **CORS enabled** for frontend integration
- **Slug generation** for SEO-friendly URLs
- **Error handling** with custom middleware

## 🛠 Technologies Used

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT, bcrypt
- **File Storage**: Cloudinary
- **Validation**: express-validator
- **Development**: TypeScript, nodemon

## 📦 Main Dependencies

```json
"dependencies": {
  "bcrypt": "^5.1.1",
  "cloudinary": "^2.6.0",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.11.0",
  "uuid": "^11.1.0"
}
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/fer8614/backend_LinkHub.git
cd backend_LinkHub
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file based on `.env.example` with your:
- MongoDB connection string
- JWT secret key
- Cloudinary credentials

4. **Run in development mode**
```bash
npm run dev
```

5. **Build and run for production**
```bash
npm run build
npm start
```

## 📂 Project Structure

```
backend_LinkHub/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── interfaces/   # TypeScript interfaces
│   ├── middlewares/  # Express middlewares
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── utils/        # Utility functions
│   └── index.ts      # Application entry point
├── .env              # Environment variables
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## 📚 API Documentation

### Authentication

| Endpoint         | Method | Description                     | Requires Auth |
|------------------|--------|---------------------------------|---------------|
| `/api/auth/register` | POST   | Register new user               | No            |
| `/api/auth/login`    | POST   | Login user                      | No            |
| `/api/auth/me`       | GET    | Get current user profile        | Yes           |

### Links

| Endpoint              | Method | Description                     | Requires Auth |
|-----------------------|--------|---------------------------------|---------------|
| `/api/links`          | GET    | Get all user links              | Yes           |
| `/api/links`          | POST   | Create new link                 | Yes           |
| `/api/links/:id`      | GET    | Get single link                 | Yes           |
| `/api/links/:id`      | PUT    | Update link                     | Yes           |
| `/api/links/:id`      | DELETE | Delete link                     | Yes           |
| `/api/links/reorder`  | POST   | Reorder links (drag & drop)     | Yes           |

### Request Examples

**User Registration**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Create Link**
```json
POST /api/links
Authorization: Bearer <token>
{
  "title": "My Portfolio",
  "url": "https://example.com",
  "description": "Personal portfolio website"
}
```

### Response Examples

**Successful Login**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response**
```json
{
  "errors": [
    {
      "msg": "Invalid credentials",
      "param": "email"
    }
  ]
}
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

MIT © Yesid Fernando Cepeda B. 2025

## 🔗 Related Links

- [LinkHub Frontend](https://github.com/fer8614/backend_LinkHub)


---

💻 Developed by Yesid Fernando Cepeda B.
