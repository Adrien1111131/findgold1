import React, { useState, useRef } from 'react';
import { searchGoldLocations, GoldSearchResult } from '../services/openai/search/goldLocations';
import { fetchCitySuggestions } from '../services/cityAutocomplete';
import styles from '../pages/FindGoldNearby/FindGoldNearby.module.css';

interface SearchFormProps {
  onSearch: (results: GoldSearchResult) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(50); // Valeur par défaut: 50 km
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.length >= 2) {
      setIsLoadingSuggestions(true);
      debounceTimer.current = setTimeout(async () => {
        try {
          const cities = await fetchCitySuggestions(value);
          setSuggestions(cities);
          setShowSuggestions(true);
        } finally {
          setIsLoadingSuggestions(false);
        }
      }, 250);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseInt(e.target.value));
  };

  const handleSuggestionClick = (city: string) => {
    setLocation(city);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || isSearching) return;

    setShowSuggestions(false);
    setIsSearching(true);

    try {
      const results = await searchGoldLocations(location, radius);
      onSearch(results);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={{ position: 'relative' }}>
      <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={location}
            onChange={handleInputChange}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setTimeout(() => setInputFocused(false), 200)}
            placeholder="Entrez le nom d'une ville"
            disabled={isSearching}
            autoComplete="off"
            style={{ paddingRight: '40px' }}
          />
          {isLoadingSuggestions && (
            <div style={{
              position: 'absolute',
              right: '12px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              borderTop: '2px solid #ffd700',
              animation: 'spin 1s linear infinite'
            }} />
          )}
        </div>
        {showSuggestions && inputFocused && suggestions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              right: 0,
              background: '#222',
              color: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 10,
              maxHeight: 200,
              overflowY: 'auto'
            }}
          >
            {suggestions.map((city, idx) => (
              <div
                key={idx}
                className={styles.suggestionItem}
                onMouseDown={() => handleSuggestionClick(city)}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        width: '100%', 
        maxWidth: 400, 
        margin: '1rem auto', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          marginBottom: '0.5rem',
          color: '#fff'
        }}>
          <span>Rayon de recherche: {radius} km</span>
        </div>
        <input
          type="range"
          min="0"
          max="300"
          step="10"
          value={radius}
          onChange={handleRadiusChange}
          style={{ width: '100%' }}
          disabled={isSearching}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%',
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <span>0 km</span>
          <span>150 km</span>
          <span>300 km</span>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSearching || !location.trim()}
        style={{
          position: 'relative',
          minWidth: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        {isSearching && (
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: '2px solid rgba(0, 0, 0, 0.3)',
            borderTop: '2px solid #000',
            animation: 'spin 1s linear infinite'
          }} />
        )}
        {isSearching ? 'Recherche...' : 'Rechercher'}
      </button>
    </form>
  );
};

export default SearchForm;
