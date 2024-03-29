import React, { useEffect, useState } from 'react'
import axios from './axios';
import "./Row.css";
import YouTube  from "react-youtube";
import movieTrailer from "movie-trailer"

const base_Url = "https://image.tmdb.org/t/p/original/"; //base url for images

function Row({title , fetchUrl , isLargeRow }) {

    const [movies , setmovie] = useState([]);
    const [tarilerUrl,setTarilerUrl]= useState("");


    useEffect(() =>{
        // if [] , run once when the row load and don't run again 
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setmovie(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    console.log(movies);

    const opts = {
        height:  "390",
        width:  "100%",
        playerVars: {
            autoplay: 1
        },
    };

    // const handleClick = (movie) => {
    //     if (tarilerUrl) {
    //         setTarilerUrl(""); // Clear the current trailer URL
    //     } else {
    //         movieTrailer(movie?.name || "")
    //         .then((url) => {
    //             // Check if the URL is valid
    //             if (url && typeof url === 'string') {
    //                 try {
    //                     // Attempt to create a URL object
    //                     const urlObj = new URL(url);
    //                     // Extract the search parameters
    //                     const urlParams = new URLSearchParams(urlObj.search);
    //                     // Extract the video ID
    //                     const videoId = urlParams.get("v");
    //                     if (videoId) {
    //                         setTarilerUrl(videoId); // Set the new trailer URL
    //                     } else {
    //                         console.log('Video ID not found in URL parameters');
    //                     }
    //                 } catch (error) {
    //                     console.error('Failed to construct URL:', error);
    //                 }
    //             } else {
    //                 console.log('Invalid URL:', url);
    //             }
    //         })
    //         .catch(error => console.log('Error fetching trailer URL:', error)); // Log any errors
    //     }
    // }; 

    const handleClick = (movie) => {
        if (tarilerUrl) {
            setTarilerUrl("");
        } else {
            movieTrailer(null ,{ tmdbId: movie.id })
            .then((url)=>{
              console.log("url is "+url);
              const urlParams=new URLSearchParams(new URL(url).search);
              console.log("urlParamsn"+urlParams);
              setTarilerUrl(urlParams.get("v"));
            })
            .catch((error)=> console.log(error));
        }
    }

  return (
    <div>
        <h2 className="row">{title}</h2>

        <div className="row_posters">
            {movies.map(movie => (
                <img className={`row_poster ${isLargeRow && "row_posterLarge"}`} onClick={() => handleClick(movie)} key={movie.id}
                src={`${base_Url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
            ) )}
        </div>
        {/* only show video if it exists */}
        {tarilerUrl && <YouTube videoId={tarilerUrl} opts={opts} />}
    </div>
  )
};

export default Row;
