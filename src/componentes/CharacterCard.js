import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './CharacterCard.css';

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/');
        console.log('Resposta da API:', response.data); // Log para depuração
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Função para mudar o card automaticamente a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prevMovie) => {
        const nextMovie = (prevMovie + 1) % movies.length;
        return nextMovie;
      });
    }, 3000); // A cada 3 segundos (3000ms)

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [movies.length]);

  const handleNextMovie = () => {
    setCurrentMovie((prevMovie) => {
      const nextMovie = (prevMovie + 1) % movies.length;
      return nextMovie;
    });
  };

  const handlePrevMovie = () => {
    setCurrentMovie((prevMovie) => {
      const prevMovieIndex = (prevMovie - 1 + movies.length) % movies.length;
      return prevMovieIndex;
    });
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div>
      <div className="movie-card">
        <img
          src={movies[currentMovie]?.poster}
          alt={movies[currentMovie]?.movie}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movies[currentMovie]?.movie}</h3>
          <p className="movie-character">{movies[currentMovie]?.character}</p>
          <p className="movie-year">{movies[currentMovie]?.year}</p>
        </div>
      </div>

      {/* Se você quiser botões para navegação manual */}
     <h1>Atualize a pagina e veja outros filmes</h1>
    </div>
  );
};

export default MovieCard;
