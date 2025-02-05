import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../store/movieSlice';
import MovieCard from './MovieCard';
import { SlidersHorizontal, Search, Star, Calendar, Play } from 'lucide-react';

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector(state => state.movies);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const filteredAndSortedMovies = [...movies]
    .filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.vote_average - a.vote_average;
      }
      return b.popularity - a.popularity;
    });

  const featuredMovie = movies[0];

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      {featuredMovie && (
        <div className="relative h-[70vh] mb-8">
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80" />
          </div>
          
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-4 text-white">{featuredMovie.title}</h1>
              <div className="flex items-center gap-6 text-lg mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">{featuredMovie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{new Date(featuredMovie.release_date).getFullYear()}</span>
                </div>
              </div>
              <p className="text-lg text-gray-300 mb-8 line-clamp-3">{featuredMovie.overview}</p>
              <Link 
                to={`/movie/${featuredMovie.id}`}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 mb-8">
          <h2 className="text-3xl font-bold text-white">Popular Movies</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 sm:w-48">
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white focus:outline-none flex-1"
              >
                <option value="popularity" className="bg-gray-800">Popularity</option>
                <option value="rating" className="bg-gray-800">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {filteredAndSortedMovies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No movies found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;