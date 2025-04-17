import React, { useState } from 'react';
import SearchForm from '../../components/SearchForm';
import RiverCard from '../../components/RiverCard';
import RiverDetails from '../../components/RiverDetails';
import { GoldLocation, GoldSearchResult } from '../../services/openai/search/goldLocations';
import styles from './FindGoldNearby.module.css';

export const FindGoldNearby = () => {
  const [searchResult, setSearchResult] = useState<GoldSearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedRiver, setSelectedRiver] = useState<GoldLocation | null>(null);
  const [activeTab, setActiveTab] = useState<'main' | 'secondary'>('main');

  const handleSearch = (results: GoldSearchResult) => {
    try {
      setSearchResult(results);
      setActiveTab('main');
      setError(null);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setError("Une erreur s'est produite lors de la recherche. Veuillez réessayer.");
      setSearchResult(null);
    }
  };

  const handleRiverDetailsClick = (river: GoldLocation) => {
    setSelectedRiver(river);
  };

  const handleCloseDetails = () => {
    setSelectedRiver(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <h1 className={styles.title}>Trouve de l'or proche de chez toi</h1>
        <SearchForm onSearch={handleSearch} />
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
      </div>

      {searchResult && (
        <div className={styles.resultsContainer}>
          <div className={styles.tabsContainer}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'main' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('main')}
            >
              Spots principaux
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'secondary' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('secondary')}
            >
              Autres cours d'eau
            </button>
          </div>

          <div className={styles.riversList}>
            {activeTab === 'main' ? (
              searchResult.mainSpots.length > 0 ? (
                searchResult.mainSpots.map((river, index) => (
                  <RiverCard 
                    key={index} 
                    river={river} 
                    onDetailsClick={handleRiverDetailsClick} 
                  />
                ))
              ) : (
                <div className={styles.noResults}>
                  Aucun spot principal trouvé dans cette zone.
                </div>
              )
            ) : (
              searchResult.secondarySpots.length > 0 ? (
                searchResult.secondarySpots.map((river, index) => (
                  <RiverCard 
                    key={index} 
                    river={river} 
                    onDetailsClick={handleRiverDetailsClick} 
                  />
                ))
              ) : (
                <div className={styles.noResults}>
                  Aucun spot secondaire trouvé dans cette zone.
                </div>
              )
            )}
          </div>
        </div>
      )}

      {selectedRiver && (
        <RiverDetails river={selectedRiver} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default FindGoldNearby;
