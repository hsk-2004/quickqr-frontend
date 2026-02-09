# QuickQR - QR Code Generator and Manager

A full-stack QR code generation and management application built with React, Vite, and Express.

## Project Structure

```
src/
├── pages/                    # Page components (routed pages)
│   ├── Landing.jsx          # Landing/home page
│   ├── Register.jsx         # User registration page
│   ├── Login.jsx            # User login page
│   ├── Dashboard.jsx        # Main authenticated QR generator page
│   ├── History.jsx          # QR code history page
│   └── *.css                # Page-specific styles
├── components/              # Reusable components
│   ├── Navbar.jsx           # Navigation bar with auth state
│   ├── QRForm.jsx           # QR code generation form
│   ├── QRCard.jsx           # QR code display card
│   ├── ProtectedRoute.jsx   # Route protection HOC
│   └── *.css                # Component styles
├── context/
│   └── AuthContext.jsx      # Authentication context (JWT, user state)
├── services/
│   └── api.js               # Axios configuration and API endpoints
├── App.jsx                  # Main app component with routing
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## Features

✨ **Authentication**
- User registration and login with JWT tokens
- Token stored in localStorage with automatic attachment to API requests
- Automatic redirect to login on 401 errors
- Protected routes for authenticated users

🔐 **Authorization**
- Protected routes with ProtectedRoute component
- Automatic loading state while checking authentication
- Prevents unauthorized access to dashboard

🎨 **User Interface**
- Clean, minimal design with gradient theme
- Responsive layout (mobile, tablet, desktop)
- Inline form validation
- Success/error message displays

⚡ **API Integration**
- Configured Axios client with base URL
- Automatic JWT token in Authorization header
- Error handling with 401 token refresh logic
- RESTful endpoints for auth and QR operations

## Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

All required packages are already in `package.json`:
- `react` & `react-dom` - UI framework
- `react-router-dom` - Client-side routing (v7)
- `axios` - HTTP client
- `vite` - Build tool

### 2. Configure Environment

Create a `.env.local` file (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5173`

### 4. Backend Requirements

This frontend requires a backend API server at `http://localhost:5000` with these endpoints:

**Auth Endpoints:**
```
POST   /api/auth/register    { username, email, password }
POST   /api/auth/login       { email, password }
```

**QR Code Endpoints:**
```
POST   /api/qr/generate      { url, name }
GET    /api/qr/history       (protected)
DELETE /api/qr/:id           (protected)
PUT    /api/qr/:id           (protected)
```

## API Response Format

### Login/Register Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiI...",
  "user": {
    "id": "123",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### QR Generate Response
```json
{
  "id": "qr_123",
  "url": "https://example.com",
  "name": "My QR Code",
  "imageUrl": "data:image/png;base64...",
  "createdAt": "2024-02-05T10:30:00Z"
}
```

## Key Implementation Details

### Authentication Flow
1. User registers/logs in with credentials
2. Backend returns JWT token + user info
3. Token stored in localStorage
4. Axios interceptor attaches token to all requests
5. On 401 error, token cleared and user redirected to /login

### Component Communication
- **AuthContext** provides global auth state and methods (login, register, logout)
- **useAuth hook** provides authentication state to any component
- **ProtectedRoute** checks authentication before rendering protected pages
- **Navbar** displays different UI based on `isAuthenticated` state

### Styling Approach
- Global styles in `index.css` (resets, base elements)
- Component-scoped CSS files for component-specific styles
- Page-scoped CSS files for page-specific styles
- Consistent color scheme: purple gradient (#667eea to #764ba2)

### Form Validation
- **Client-side validation** in Register (password confirmation, length)
- **Error handling** displays from auth context and API responses
- **Loading states** prevent double submissions

## Development Tips

### Adding a New Protected Page
1. Create component in `pages/`
2. Import in `App.jsx`
3. Wrap route with `<ProtectedRoute>`
4. Use `useAuth()` hook to access user/auth methods

### Adding API Calls
1. Add endpoint to `api.js`
2. Export from `authAPI` or `qrAPI` objects
3. Import in component and handle with try/catch
4. Token is automatically included in requests

### Debugging Auth Issues
- Check localStorage for `token` and `user` keys (DevTools > Application)
- Verify Axios interceptors are attaching Authorization header
- Check Network tab for request headers
- Use `useAuth()` in components to inspect context values

## Common Issues

**Issue:** Token not persisting after reload
- **Solution:** Token stored in localStorage, checked on app mount in AuthContext

**Issue:** Redirected to login after successful registration
- **Solution:** Check backend response includes both `token` and `user` fields

**Issue:** API requests failing with 401
- **Solution:** Ensure token exists in localStorage and backend is running

**Issue:** CORS errors
- **Solution:** Backend should have CORS enabled for http://localhost:5173

## Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Output goes to `dist/` folder. Deploy this folder to your hosting provider.

## Tech Stack

- **Frontend**: React 19 + Vite 6
- **Routing**: React Router v7
- **HTTP**: Axios 1.13
- **Styling**: CSS3 (Flexbox, Grid, Media Queries)
- **Build Tool**: Vite
- **Environment**: Node.js

## Notes

- All components are functional components with hooks
- No external UI component libraries (minimal dependencies)
- localStorage used for JWT persistence
- Responsive design with mobile-first approach
- Comments included in code explaining key logic
