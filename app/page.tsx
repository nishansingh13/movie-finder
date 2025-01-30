// app/page.tsx
import axios from 'axios';
import Home from './pages/main';
export const revalidate = 86400;
export default async function Main() {
  const link="";
  const data = await fetch(``)
  const posts = await data.json()
  console.log(posts);
  return (
    <>
    <Home link={link}/>
    </>
  );
  
}

