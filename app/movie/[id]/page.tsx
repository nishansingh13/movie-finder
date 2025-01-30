"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import fallbackImage from "@/public/imagenotfound.jpg";
import gsap from "gsap";
interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path?: string;
}
export default function MoviePage() {
  const params = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const backdropRef = useRef(null);
  const posterRef = useRef(null);
  const contentRef = useRef(null);
  const [regions, setRegions] = useState<Record<number, Record<string, { flatrate?: Provider[] }>>>({});

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        setMovie(res.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchProviders = async (movieId:number) => {
      try {
       
        const res = await axios.get<{ results: Record<string, { flatrate?: Provider[] }> }>(
          `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
       
        setRegions(prev => ({ ...prev, [movieId]: res.data.results }));
        console.log(res.data.results)
      } catch (error) {
        console.error("Error fetching providers:", error);
      } 
    };
    fetchProviders(Number(params.id));

    fetchMovie();
   

  }, [params.id]);

  useEffect(() => {
    if (!movie) return;

    // GSAP Animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(backdropRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1.5,
    })
    .from(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [movie]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-2xl text-blue-500">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-red-500">Movie not found</div>
      </div>
    );
  }
 
  

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Backdrop Image with Overlay */}
      <div 
        ref={backdropRef}
        className="fixed inset-0 z-0"
      >
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            quality={80}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 backdrop-blur-sm bg-gray-900/30 rounded-xl p-6 shadow-2xl">
          
            <div 
              ref={posterRef}
              className="w-full md:w-1/3 transform transition-all duration-300 hover:scale-105"
            >
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : fallbackImage
                }
                alt={movie.title}
                width={500}
                height={750}
                priority
                className="rounded-lg shadow-xl"
              />
            </div>
            

            {/* Movie Details */}
            <div 
              ref={contentRef}
              className="w-full md:w-2/3 space-y-6"
            >
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {movie.title}
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.overview}
              </p>

              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <p className="text-blue-400 font-semibold">Release Date</p>
                  <p className="text-gray-300">{movie.release_date || "Unknown"}</p>
                </div>
                
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <p className="text-blue-400 font-semibold">Rating</p>
                  <p className="text-gray-300">
                    {movie.vote_average?.toFixed(1)}/10
                  </p>
                </div>
                
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <p className="text-blue-400 font-semibold">Runtime</p>
                  <p className="text-gray-300">
                    {movie.runtime} minutes
                  </p>
                </div>
                
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <p className="text-blue-400 font-semibold">Genre</p>
                  <p className="text-gray-300">
                    {movie.genres?.map((g: any) => g.name).join(", ")}
                  </p>
                </div>
                <div className="text-white overflow-x-auto max-h-[5rem]">
                  Streaming on :  {regions[movie.id] &&
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
        </div>
      </div>
    </div>
  );
}