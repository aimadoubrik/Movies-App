import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWatchlist } from '../store/movieSlice';
import { Trash2, Star, Calendar } from 'lucide-react';

const Watchlist = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.movies.watchlist);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-white">My Watchlist</h2>
      {watchlist.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-4">Your watchlist is empty</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchlist.map(movie => (
            <div key={movie.id} className="group bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromWatchlist(movie.id))}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Remove from watchlist"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;