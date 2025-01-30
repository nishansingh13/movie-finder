// app/page.tsx
import Home from './pages/main';

export const revalidate = 86400; // Revalidate every 24 hours

async function getTrendingMovies() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      { next: { revalidate: 86400 } }
    );
    return await res.json();
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return { results: [] };
  }
}

async function getHorrorMovies() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=27`,
      { next: { revalidate: 86400 } }
    );
    return await res.json();
  } catch (error) {
    console.error('Error fetching horror movies:', error);
    return { results: [] };
  }
}

export default async function Main() {
  const [trendingData, horrorData] = await Promise.all([
    getTrendingMovies(),
    getHorrorMovies()
  ]);

  return (
    <Home 
      initialTrending={trendingData.results} 
      initialHorror={horrorData.results}
    />
  );
}