# Ajinkya Infotech - Frontend Application

A modern, responsive React single-page application (SPA) built with Vite that provides an intuitive interface for managing courses, enrollments, and educational content on the Ajinkya Infotech platform.

## Table of Contents

- [Frontend Overview](#frontend-overview)
- [Why This Frontend Is Useful](#why-this-frontend-is-useful)
- [Frontend Structure](#frontend-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the Frontend](#running-the-frontend)
- [Usage](#usage)
- [Help & Documentation](#help--documentation)
- [Contributing](#contributing)
- [Maintainers](#maintainers)

## Frontend Overview

The **Ajinkya Infotech Frontend** is a modern React 19 single-page application (SPA) built with Vite, delivering a fast and responsive user interface for the educational platform. It manages:

- **User Authentication**: Registration, login, and OTP verification flows
- **Course Discovery & Management**: Browse, view, and enroll in courses
- **Enrollment Tracking**: Monitor enrollment status and progress
- **Blog Content**: Read and explore educational blog posts
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS and Framer Motion animations

The frontend communicates with the Spring Boot backend via RESTful APIs, managing state with React Context and making HTTP requests through Axios.

**Application Type**: Single-Page Application (SPA) with client-side routing  
**Build Tool**: Vite (modern, fast bundler)  
**Styling**: Tailwind CSS 4 with dynamic utilities  
**HTTP Client**: Axios with configured base URL

## Why This Frontend Is Useful

### Core Responsibilities

✓ **User Authentication Flow** - Secure login, registration, and OTP verification
✓ **Course Discovery** - Browse and explore available courses
✓ **Enrollment Management** - Enroll in courses and track progress
✓ **Content Consumption** - Read blog posts and educational materials
✓ **Responsive UI** - Mobile-first design that works on all devices
✓ **State Management** - React Context for global auth and blog state
✓ **Fast Performance** - Vite for instant HMR and optimized builds
✓ **Interactive Animations** - Framer Motion for smooth user experience

### Key Features

- **Modern SPA Architecture**: Client-side routing with React Router v7
- **Real-time State Management**: React Context for auth and blog data
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **Component-Based**: Reusable, maintainable component structure
- **API Integration**: Pre-configured Axios client for backend communication
- **Form Handling**: Input validation and error handling
- **Icon Library**: React Icons for consistent UI elements
- **Smooth Animations**: Framer Motion for page transitions and interactions

### Problems It Solves

- Provides intuitive interface for course browsing and enrollment
- Eliminates friction in user authentication with OTP verification
- Enables seamless switching between courses and blog content
- Delivers responsive experience across devices (mobile, tablet, desktop)
- Manages authentication state efficiently across the application

## Frontend Structure

```
Frontend/
├── src/
│   ├── api/                     # API configuration
│   │   └── axios.js             # Axios HTTP client setup
│   │
│   ├── Components/              # Reusable UI components
│   │   ├── Navbar.jsx           # Top navigation bar
│   │   ├── Footer.jsx           # Footer component
│   │   ├── Hero.jsx             # Hero section
│   │   ├── About.jsx            # About section
│   │   ├── Achievements.jsx     # Achievements section
│   │   ├── ContactUs.jsx        # Contact form
│   │   └── MiniHeroNav.jsx      # Mini navigation hero
│   │
│   ├── Pages/                   # Page-level components (routed)
│   │   ├── Home.jsx             # Home/landing page
│   │   ├── Login.jsx            # User login page
│   │   ├── Register.jsx         # User registration page
│   │   ├── VerifyOtp.jsx        # OTP verification page
│   │   ├── Courses.jsx          # Courses listing page
│   │   ├── Blogs.jsx            # Blog listing page
│   │   └── BlogDetailsPage.jsx  # Individual blog post page
│   │
│   ├── Context/                 # Global state management
│   │   ├── AuthContext.jsx      # Authentication state & logic
│   │   └── BlogContext.jsx      # Blog data state & logic
│   │
│   ├── assets/                  # Static assets (images, icons, etc.)
│   │
│   ├── App.jsx                  # Root component with routes
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
│
├── public/                      # Static public assets
├── index.html                   # HTML template
├── vite.config.js               # Vite build configuration
├── eslint.config.js             # ESLint rules
├── package.json                 # Dependencies
└── README.md                    # This file
```

### Directory Explanations

| Folder | Purpose |
|--------|---------|
| **api/** | Axios HTTP client configuration for backend API calls |
| **Components/** | Reusable UI components (Navbar, Footer, Hero sections) |
| **Pages/** | Full page components for routing (Home, Login, Courses, etc.) |
| **Context/** | Global state management (Authentication, Blog data) |
| **assets/** | Images, icons, and other static media |
| **public/** | Static files served directly |

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js 18+** ([Download Node.js](https://nodejs.org/)) - Includes npm
- **npm 9+** (comes with Node.js) or **yarn**
- **Git** for version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

### Step 1: Clone and Navigate

```bash
git clone <repository-url>
cd Ajinkya_Infotech/Frontend
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Configure Environment (Optional)

The frontend connects to `http://localhost:8082` by default. If your backend runs on a different port/host, update the base URL in `src/api/axios.js`:

```javascript
const api = axios.create({
  baseURL: "http://your-backend-url:port/",
  // ... rest of config
});
```

### Step 4: Ensure Backend is Running

The frontend requires the backend API to be running on `http://localhost:8082`. See [Backend README](../Backend/README.md) for startup instructions.

### Step 5: Start Development Server

```bash
npm run dev
```

The application will start at **`http://localhost:5173`**

## Configuration

### Environment Variables

Currently, the frontend uses a static Axios configuration. For future environment-based configuration, create a `.env` file in the `Frontend/` directory:

```properties
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8082/

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
```

### Configuration Files

- **vite.config.js**: Build and development server configuration
  - React plugin for JSX support
  - Tailwind CSS integration
  - Dev server runs on port 5173

- **eslint.config.js**: Code quality and linting rules
  - React-specific rules
  - React Hooks validation

- **src/api/axios.js**: HTTP client configuration
  - Base URL: `http://localhost:8082/`
  - Default timeout: 10 seconds
  - Content-Type: application/json

### Backend Connection

The frontend automatically connects to the backend API at `http://localhost:8082`. All HTTP requests go through the configured Axios instance in `src/api/axios.js`.

**Important**: Ensure the backend is running before using the frontend application.

## Running the Frontend

### Development Mode

Start the Vite development server with hot module reloading:

```bash
npm run dev
```

**Access at**: `http://localhost:5173`

Features:
- Instant HMR (Hot Module Reload)
- Fast development experience
- No page refresh needed for code changes

### Production Build

Create an optimized production build:

```bash
npm run build
```

Output directory: `dist/`

Optimizations:
- Minified code
- Asset compression
- Tree-shaking
- Code splitting

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Usage

### Application Architecture

The application follows a component-based architecture with centralized state management:

```
User Access (http://localhost:5173)
    ↓
App.jsx (Routes setup)
    ↓
Pages (Routed components)
    ↓
Components (Reusable UI)
    ↓
Context (Global State)
    ↓
API (Axios → Backend)
```

### User Journey

#### 1. **First-Time User (Registration)**
```
Landing Page (Home)
    ↓
Click "Register"
    ↓
Register Page (enter email, password)
    ↓
API Call: POST /api/auth/register
    ↓
OTP Sent to Email
    ↓
VerifyOtp Page (enter OTP)
    ↓
API Call: POST /api/auth/verify-otp
    ↓
Success → Redirect to Login
```

#### 2. **Returning User (Login)**
```
Login Page
    ↓
Enter email & password
    ↓
API Call: POST /api/auth/login
    ↓
Receive JWT Token
    ↓
Store in AuthContext
    ↓
Redirect to Home/Dashboard
```

#### 3. **Browsing Courses**
```
Courses Page
    ↓
Display course list (fetched from API)
    ↓
Click on course
    ↓
View course details
    ↓
Enroll button → Send API request
    ↓
Confirm enrollment
```

#### 4. **Reading Blog**
```
Blogs Page
    ↓
Display blog list
    ↓
Click on blog
    ↓
BlogDetailsPage (full content)
    ↓
Navigate back to list
```

### Key Pages and Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home.jsx | Landing page with hero section |
| `/login` | Login.jsx | User login form |
| `/register` | Register.jsx | User registration form |
| `/verify-otp` | VerifyOtp.jsx | OTP verification |
| `/courses` | Courses.jsx | Browse and enroll in courses |
| `/blogs` | Blogs.jsx | View all blog posts |
| `/blogs/:id` | BlogDetailsPage.jsx | Read individual blog post |

### State Management (Context)

**AuthContext** (`src/Context/AuthContext.jsx`)
- Manages user authentication state
- Stores JWT token
- Handles login/logout/register logic

**BlogContext** (`src/Context/BlogContext.jsx`)
- Manages blog data state
- Caches blog posts
- Handles blog interactions

### API Requests

All API requests use the configured Axios instance from `src/api/axios.js`:

```javascript
// Example: Fetch courses
import api from './api/axios.js';

api.get('/api/courses')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

### Common Interactions

**Login and Store Token**
```javascript
const response = await api.post('/api/auth/login', {
  email: 'user@example.com',
  password: 'password'
});
// Token stored in AuthContext
```

**Fetch Courses**
```javascript
const courses = await api.get('/api/courses');
```

**Enroll in Course**
```javascript
await api.post('/api/enrollments', {
  courseId: 1
});
```

## Help & Documentation

### Getting Help

- **Dependency Issues**: Run `npm install` to ensure all packages are installed
- **Build Errors**: Clear the `node_modules` folder and reinstall: `rm -rf node_modules && npm install`
- **Port Already in Use**: Change the dev port in `vite.config.js` or kill the process using port 5173
- **Backend Connection Issues**: Verify backend is running on `http://localhost:8082`

### Documentation Resources

- **React Documentation**: [React Docs](https://react.dev)
- **Vite Guide**: [Vite Documentation](https://vitejs.dev)
- **React Router**: [React Router Docs](https://reactrouter.com)
- **Tailwind CSS**: [Tailwind Docs](https://tailwindcss.com)
- **Axios**: [Axios Guide](https://axios-http.com)
- **Framer Motion**: [Motion Documentation](https://www.framer.com/motion)

### Component Guidelines

Components follow these conventions:
- **Functional Components**: Use React Hooks (useState, useContext, useEffect)
- **Props**: Document props clearly in component comments
- **Styling**: Use Tailwind CSS classes, no inline CSS
- **State**: Use Context API for global state, useState for local component state

### Common Issues

#### Issue: `VITE_API_BASE_URL is undefined`
**Solution**: Set the base URL directly in `src/api/axios.js` or add to `.env`

#### Issue: `Port 5173 already in use`
**Solution**: Kill the process or change port in `vite.config.js`:
```javascript
export default defineConfig({
  server: { port: 3000 }
})
```

#### Issue: `Cannot GET /api/...` errors
**Solution**: Ensure backend is running on `http://localhost:8082`. Check [Backend README](../Backend/README.md)

#### Issue: `npm install` fails
**Solution**: 
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Contributing

### Frontend-Specific Guidelines

We welcome contributions to improve the frontend! Here's how to contribute:

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following the code style
4. **Run linting**: `npm run lint`
5. **Commit with clear messages**: `git commit -m "Add feature: description"`
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Open a Pull Request** describing your changes

### Coding Standards

- **Component Names**: Use PascalCase (e.g., `UserProfile.jsx`)
- **File Names**: Match component names (e.g., `UserProfile.jsx`)
- **Hooks**: Place custom hooks in a `hooks/` folder if multiple exist
- **Styling**: Use Tailwind CSS classes exclusively, no CSS files
- **Props**: Document complex props with comments
- **State**: Keep component state minimal; use Context for shared state
- **Comments**: Comment complex logic, not obvious code

### ESLint & Formatting

Before submitting a PR:
```bash
npm run lint          # Check for linting errors
npm run lint -- --fix # Auto-fix common issues
```

### Pull Request Checklist

- [ ] Code passes `npm run lint`
- [ ] Application runs without console errors
- [ ] Changes tested in browser
- [ ] Component changes are responsive (mobile-tested)
- [ ] Updated relevant documentation
- [ ] Commit messages are clear and descriptive
- [ ] No console warnings/errors left behind

## Maintainers

**Frontend Development Team**

For questions about frontend implementation, UI design decisions, or to report issues:
- Open an issue in the repository
- Check existing documentation in component files
- Contact the development team

---

## Quick Links

- [Parent Project README](../README.md)
- [Backend Documentation](../Backend/README.md)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

---

**Technology Stack**: React 19 | Vite 7 | Tailwind CSS 4 | React Router 7 | Axios | Framer Motion

**Last Updated**: February 2026
