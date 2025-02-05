import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Plus, Check, Calendar, Clock, Users, ArrowLeft } from 'lucide-react';
import { addToWatchlist } from '../store/movieSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const watchlist = useSelector(state => state.movies.watchlist);
  const isInWatchlist = watchlist.find(m => m.id === Number(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=194291fb71772fdfacec2f6703a07ffa`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center text-white py-8">Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900" />
        </div>
        
        <div className="relative container mx-auto px-4 pt-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Movies
          </Link>
          
          <div className="grid md:grid-cols-[300px,1fr] gap-8 py-8">
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl shadow-black/50"
              />
              <button
                onClick={() => dispatch(addToWatchlist(movie))}
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 mt-6 font-medium transition-all duration-300 ${
                  isInWatchlist
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                }`}
              >
                {isInWatchlist ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" /> Add to Watchlist
                  </>
                )}
              </button>
            </div>
            
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-lg mb-8">
                <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                  <Star className="w-5 h-5" />
                  <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>{movie.release_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{movie.runtime} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span>{movie.vote_count.toLocaleString()} votes</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map(genre => (
                      <span
                        key={genre.id}
                        className="bg-gray-800/80 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-lg text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;