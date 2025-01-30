// app/page.tsx
import axios from 'axios';
import Home from './pages/main';

export const revalidate = 86400; // Revalidate every 24 hours

export default async function Main() {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  try {
    const movies = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
    const link = baseUrl + movies.data.results[0].poster_path;
    console.log(link);

    return (
      <>
        <Home link={link} />
      </>
    );
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return <div>Failed to load movie data.</div>; // Graceful error handling
  }
}
