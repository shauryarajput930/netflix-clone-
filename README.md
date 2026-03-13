# Netflix Clone

A modern Netflix clone built with React, TypeScript, and Tailwind CSS. This project replicates the core functionality and user interface of the popular streaming platform.

## 🚀 Features

- **🎬 Movie Browsing**: Browse movies by categories with beautiful carousels
- **🔍 Advanced Search**: Real-time search with suggestions for movies and genres
- **👤 User Authentication**: Complete login/signup system with profile management
- **📱 Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **🎨 Modern UI/UX**: Clean and intuitive interface inspired by Netflix's design
- **👤 Profile Management**: Avatar upload, email/password updates, account settings
- **📝 My List**: Personal watchlist with add/remove functionality
- **🌙 Dark Theme**: Built-in dark/light theme toggle
- **⚡ TypeScript**: Type-safe development with TypeScript
- **🎯 Tailwind CSS**: Utility-first CSS framework for rapid styling
- **🚀 Vite**: Fast build tool and development server

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **State Management**: React Hooks + Context
- **Authentication**: Mock Authentication System
- **Build Tool**: Vite
- **Package Manager**: npm/bun
- **Linting**: ESLint
- **Testing**: Vitest

## 🔐 Authentication

The project uses a mock authentication system for demo purposes:

### Test Credentials
- **Email**: `test@netflix.com` | **Password**: `123456`
- **Email**: `demo@netflix.com` | **Password**: `demo123`

### Features
- ✅ User registration and login
- ✅ Profile management with avatar upload
- ✅ Email and password updates
- ✅ Account deletion
- ✅ Session persistence
- ✅ Protected routes

### Production Setup
For production use, replace mock authentication with:
1. Supabase Auth
2. Firebase Auth
3. Auth0
4. JWT-based custom solution

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Netflix
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

## 🎯 Usage

### Development Server

Start the development server:
```bash
npm run dev
# or
bun dev
```

Open [http://localhost:8081](http://localhost:8081) to view it in your browser.

### Build for Production

Create a production build:
```bash
npm run build
# or
bun build
```

### Preview Production Build

Preview the production build:
```bash
npm run preview
# or
bun preview
```

## 🧪 Testing

Run the test suite:
```bash
npm run test
# or
bun test
```

## 📁 Project Structure

```
Netflix/
├── public/                 # Static assets
│   ├── netflix.png        # Favicon and logo
│   └── robots.txt         # SEO configuration
├── src/                   # Source code
│   ├── components/        # Reusable React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Navbar.tsx    # Navigation bar
│   │   ├── Footer.tsx    # Footer component
│   │   └── ...           # Other components
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Home page
│   │   ├── Login.tsx     # Login page
│   │   ├── Signup.tsx    # Signup page
│   │   ├── AccountSettings.tsx # Settings page
│   │   └── ...           # Other pages
│   ├── lib/              # Utilities and stores
│   │   ├── authStore.ts  # Authentication state
│   │   ├── mockAuthStore.ts # Mock auth implementation
│   │   └── movieData.ts  # Movie data and types
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # External integrations
│   │   └── supabase/     # Supabase client (for future use)
│   ├── assets/           # Static assets
│   │   ├── auth-bg.jpg   # Authentication background
│   │   └── hero-banner.jpg # Hero banner
│   ├── styles/           # Global styles
│   └── main.tsx          # Application entry point
├── .gitignore            # Git ignore patterns
├── package.json          # Project dependencies
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite build configuration
```

## 🎨 Customization

### Theming

The project uses Tailwind CSS for styling. You can customize the theme by modifying the `tailwind.config.ts` file.

### Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
# For production (when using real authentication)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-key

# Optional customization
VITE_APP_TITLE=Netflix Clone
VITE_API_URL=your-api-url
```

**Note**: The project currently uses mock authentication, so these variables are optional for demo purposes.

## 🚀 Deployment

### Vercel

1. Connect your repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy!

### Netlify

1. Connect your repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy!

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - The app uses port 8081 by default
   - If port is taken, Vite will automatically try the next available port

2. **Login Not Working**
   - Use test credentials provided above
   - Check browser console for errors
   - Ensure localStorage is enabled

3. **Search Not Working**
   - Try searching for "dark", "action", or "quantum"
   - Check that movie data is loading properly

4. **Avatar Not Syncing**
   - Refresh the page after uploading avatar
   - Check browser localStorage permissions

### Recent Improvements

- ✅ Enhanced search functionality with real-time suggestions
- ✅ Improved account settings UI with better text styling
- ✅ Fixed avatar sync between navbar and settings
- ✅ Added mock authentication system
- ✅ Enhanced responsive design
- ✅ Improved loading states and error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes only. All rights reserved to the original Netflix platform.

## 🙏 Acknowledgments

- Netflix for the design inspiration
- React team for the amazing framework
- Tailwind CSS team for the utility-first CSS framework

---

**Note**: This is a clone project created for educational purposes. It is not affiliated with or endorsed by Netflix, Inc.