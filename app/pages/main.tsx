"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import fallbackImage from "@/public/imagenotfound.jpg";
import { Loader2 } from "lucide-react";
import Pizza from ".";
interface Movie {
  title: string;
  id: number;
  overview: string;
  release_date: string;
  poster_path: string;
}


  
  
export default function Home({link}:{link:string}) {
  // const[movie,setMovie]=useState<Movie[]>(trendingMovies);
  
  const [data, setData] = useState<Movie[]>([]);
  const [regions, setRegion] = useState<any>({});
  // const [ip,setIp]=useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading,setLoading]=useState(false);
  const handleSearch = (query:string)=>{
    fetchData(query);
  }

  const fetchData = async (query:string) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&language=en-US`
      );
      if (res.status === 200) {
        setData(res.data.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally{
      setLoading(false);
    }
  };
// const getUserRegion = async()=>{
//       const res = await axios.get("https://ipinfo.io/json?token=4a3b916a095420");
//       if(res.status==200){
//           console.log(res.data.country);
//       }
// }

  const handleRegion = async (query: number) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${query}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (res.status === 200) {
        setRegion(res.data.results); // Set the entire result object to regions
      }
    } catch (error) {
      console.error("Error fetching region data:", error);
    }
  };
  
  return (
    <div style={
        {backgroundImage:`url(${link})`, backgroundRepeat:'no-repeat', width:'full'}
        }>
   
    {loading?<Loader2 className="animate-spin"/>:(
 <div className="p-2 gap-2 flex " 
>
  <Pizza/>
    <input className="bg-gray-300 px-1" type="text" placeholder="Search Movie here" value={inputValue} onKeyDown={(e)=>{e.key=="Enter" && handleSearch((e.target as HTMLInputElement).value)}}  onChange={(e) => setInputValue(e.target.value)} />
    <button className="rounded-sm bg-black text-white px-2 py-1" onClick={(e)=>{handleSearch(inputValue);console.log(e)}}>Search</button>
    </div>)}
      <div className="grid grid-cols-4">
        {data.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <Image
              onClick={() => handleRegion(movie.id)} 
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : fallbackImage
              }
              alt="Image not found"
              width={200}
              height={200}
            />
          </div>
        ))}

        {Object.keys(regions).map((regionKey, index) => {
          
          const region = regions[regionKey]; 
       
          return (
            <div key={index}>
              <h3>{regionKey}:
            
             {region.flatrate?.map((item:{provider_name:string},index:number)=>{
             
              
              const add = index==region.flatrate.length-1?"":", ";
                return item.provider_name+add;
             })}
             </h3>
             
            </div>
          );
        })}
      </div>
    </div>
  );
}
