# Airbnb Clone – Full-Stack Web Application

A full-stack accommodation listing platform inspired by Airbnb, developed using **Node.js, Express.js, MongoDB, and EJS**. The application allows users to explore properties, create and manage listings, search for accommodations, and interact through reviews and ratings.

## 🌐 Live Demo

**Live Application:** [View Airbnb Clone](https://airbnb-clone-b54u.vercel.app/)

**GitHub Repository:** [View Source Code](https://github.com/Ayanansari35679/airbnb-clone)

---

## ✨ Key Features

- **User Authentication:** Secure registration, login, and logout functionality using Passport.js.
- **Listing Management:** Create, view, edit, and delete property listings.
- **Search & Filtering:** Search properties by title and location.
- **Category-Based Browsing:** Explore properties through multiple categories.
- **Reviews & Ratings:** Users can submit and manage property reviews.
- **Image Management:** Upload and store listing images using Cloudinary.
- **Price Sorting:** Sort listings based on price.
- **GST Calculation:** Toggle between original prices and GST-inclusive prices.
- **Authorization:** Restrict listing and review management to authorized users.
- **Session Management:** Persistent user sessions using MongoDB.
- **Responsive Interface:** User-friendly interface designed with EJS, CSS, JavaScript, and Bootstrap.

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, EJS, Bootstrap |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Passport.js, Passport Local |
| Session Management | Express Session, Connect-Mongo |
| Validation | Joi |
| Image Storage | Cloudinary, Multer |
| Maps & Location | Mapbox |
| Deployment | Vercel |
| Version Control | Git, GitHub |

## 📂 Project Structure

```text
airbnb-clone/
│
├── models/             # Database schemas and models
├── routes/             # Application routes
├── views/              # EJS templates
├── public/             # Static assets (CSS, JS, images)
├── utils/              # Utility functions
├── middlewares.js      # Custom middleware functions
├── schema.js           # Joi validation schemas
├── app.js              # Main application entry point
├── package.json        # Project dependencies
└── .env                # Environment configuration
```

## ⚙️ Installation and Setup

Follow these instructions to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Ayanansari35679/airbnb-clone.git
```

### 2. Navigate to the Project Directory

```bash
cd airbnb-clone
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure the required credentials:

```env
ATLAS_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

Configure any additional Cloudinary and Mapbox credentials required by your application.

### 5. Start the Development Server

```bash
node app.js
```

### 6. Open the Application

Visit the following URL in your browser:

```text
http://localhost:8080
```

Use the port configured in your application if it differs.

## 🔐 Environment Configuration

The application requires:

- MongoDB Atlas connection string
- Session secret
- Cloudinary credentials for image uploads
- Mapbox access token if map functionality is enabled

**Important:** Never commit your `.env` file or expose private API keys and credentials in a public repository.

## 🚀 Deployment

The application is deployed using **Vercel** and connected to GitHub for source code management.

Updates pushed to the configured GitHub branch can automatically trigger new deployments through Vercel.

## 🎯 Project Objectives

This project was developed to gain practical experience in full-stack web development and understand how real-world web applications work.

Key learning areas include:

- Building RESTful APIs and server-side applications.
- Implementing authentication and authorization.
- Designing and managing MongoDB databases.
- Handling file uploads and cloud-based image storage.
- Implementing search, filtering, and sorting.
- Managing user sessions and application security.
- Deploying a full-stack application.

## 👨‍💻 Author

**Mohd Ayan**

GitHub: [Ayanansari35679](https://github.com/Ayanansari35679)

---

If you find this project interesting, feel free to explore the source code and give the repository a ⭐.
