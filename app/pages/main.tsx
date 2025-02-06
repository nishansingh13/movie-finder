// app/components/Home.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import fallbackImage from "@/public/imagenotfound.jpg";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path?: string;
}

interface HomeProps {
  initialTrending: Movie[];
  initialHorror: Movie[];
}

export default function Home({ initialTrending, initialHorror }: HomeProps) {
  const router = useRouter();
  const [data, setData] = useState<Movie[]>([]);
  const [trendingMovies] = useState<Movie[]>(initialTrending);
  const [horrorMovies] = useState<Movie[]>(initialHorror);
  const [regions, setRegions] = useState<Record<number, Record<string, { flatrate?: Provider[] }>>>({});
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [regionLoading, setRegionLoading] = useState<number | null>(null);
  useEffect(() => {

    if (typeof window !== "undefined" )
      {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setData([]);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get<{ results: Movie[] }>(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&include_adult=false`
      );
      setData(res.data.results);
    } catch (error) {
      console.error("Search failed:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProviders = async (movieId: number) => {
    try {
      setRegionLoading(movieId);
      const res = await axios.get<{ results: Record<string, { flatrate?: Provider[] }> }>(
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setRegions(prev => ({ ...prev, [movieId]: res.data.results }));
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setRegionLoading(null);
    }
  };

  const renderMovieCard = (movie: Movie) => (
    <div key={movie.id} className="group relative bg-gray-900 rounded-lg overflow-hidden">
      <div className="relative aspect-[2/3]">
        <Image
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : fallbackImage}
          alt={movie.title}
          fill
          className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => router.push(`/movie/${movie.id}`)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm mt-1">
          {movie.release_date?.split("-")[0] || "Unknown year"}
        </p>
        <div className="mt-3">
          <button
            className="text-blue-500 text-sm hover:text-blue-400 flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              fetchProviders(movie.id);
            }}
            disabled={regionLoading === movie.id}
          >
            {regionLoading === movie.id ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Loading...
              </>
            ) : (
              "Show streaming options"
            )}
          </button>
          <div className="overflow-y-auto max-h-[200px]">
  {regions[movie.id] &&
    Object.entries(regions[movie.id]).map(([country, { flatrate }]) =>
      flatrate && flatrate.length > 0 ? (
        <div key={country} className="mt-2 text-sm text-gray-300">
          <span className="font-medium">{country}:</span>{" "}
          {flatrate.map((p) => p.provider_name).join(", ")}
        </div>
      ) : null
    )}
</div>


        </div>
      </div>
    </div>
  );

  return (
    <>
    <div className="min-h-screen bg-black">
      <div className="p-4 fixed top-0 w-full bg-black/95 backdrop-blur z-50">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white rounded-lg
              border border-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Search movies..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(inputValue)}
          />
        </div>
      </div>

      <div className="pt-24 pb-8 px-4">
        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map(renderMovieCard)}
          </div>
        ) : (
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {trendingMovies.slice(0, 5).map(renderMovieCard)}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Horror Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {horrorMovies.slice(0, 5).map(renderMovieCard)}
              </div>
            </div>
          </div>
        )}
      </div>
    
    </div>
        
         <div className="adsense-container">
     <ins className="adsbygoogle"
       style={{ display: "block" }}
       data-ad-client="ca-pub-2845318690222180"
       data-ad-slot="8766507804" 
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
       
   </div>
    </>
  );
}