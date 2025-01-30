// pages/index.tsx

import { GetStaticProps } from "next";


function Pizza(){
   
    return (
        <>
        <div>H</div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
  // Simulating fetching trending movies (this could be an API call)
  const trendingMovies = ['Item 1', 'Item 2', 'Item 3'];

  return {
    props: {
      trendingMovies,
    },
    revalidate: 60, 
  };
};
export default Pizza;

