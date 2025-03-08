# Movie Finder - Global Streaming Availability Platform

A modern web application built with Next.js 13+ that helps users discover movies and find their streaming availability worldwide.


## 🚀 Features

- **Global Streaming Search**: Find where movies are available to stream across different countries
- **Real-time Movie Search**: Dynamic search functionality with instant results
- **Trending Movies**: Daily updated list of trending movies
- **Genre Categories**: Browse movies by genres (including Horror showcase)
- **Detailed Movie Pages**: 
  - High-quality backdrop images
  - Comprehensive movie information
  - Streaming availability by country
  - Animated transitions using GSAP
- **Responsive Design**: Optimized for all device sizes
- **Performance Optimized**: Server-side rendering and image optimization

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+, React 19
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **API Integration**: TMDB API
- **Type Safety**: TypeScript
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/nishansingh13/movie-finder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add your TMDB API key to .env.local
NEXT_PUBLIC_API_KEY=your_tmdb_api_key

# Run development server
npm run dev
```

## 🔑 Environment Variables

```env
NEXT_PUBLIC_API_KEY=your_tmdb_api_key
```

## 📁 Project Structure

```
movie_finder/
├── app/
│   ├── api/
│   │   └── movies/
│   ├── movie/
│   │   └── [id]/
│   ├── pages/
│   │   └── main.tsx
│   ├── components/
│   │   └── Sidebar.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
└── package.json
```

## 🔄 API Routes

- `GET /api/movies`: Fetches trending movies
- `GET /movie/[id]`: Fetches detailed movie information
- `GET /api/providers`: Fetches streaming availability

## 🎨 Features in Detail

### Home Page
- Trending movies section
- Horror movies showcase
- Real-time search functionality
- Responsive movie grid layout

### Movie Details Page
- High-resolution backdrop images
- Movie information display
- Streaming availability by country
- GSAP animations for smooth transitions

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👥 Developer

- Developer Name: Nishan
- Project Status: Active