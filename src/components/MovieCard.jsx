import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus, Check, Star, Calendar } from 'lucide-react';
import { addToWatchlist } from '../store/movieSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.movies.watchlist);
  const isInWatchlist = watchlist.find(m => m.id === movie.id);

  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
      <Link to={`/movie/${movie.id}`} className="relative block">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-white font-medium">{movie.vote_average.toFixed(1)}</span>
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
            {movie.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-4 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{new Date(movie.release_date).getFullYear()}</span>
        </div>
        <button
          onClick={() => dispatch(addToWatchlist(movie))}
          className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
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
    </div>
  );
};

export default MovieCard;