import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchComponent.css'

function SearchComponent({ onClose, isOpen }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const navigate = useNavigate()


  const allProducts = [
    // Vegetables
    { id: 1, name: 'Fresh Carrots', category: 'vegetables', type: 'organic', path: '/vegetables' },
    { id: 2, name: 'Fresh Brinjal', category: 'vegetables', type: 'organic', path: '/vegetables' },
    { id: 3, name: 'Organic Potatoes', category: 'vegetables', type: 'organic', path: '/vegetables' },
    { id: 4, name: 'Red Onions', category: 'vegetables', type: 'conventional', path: '/vegetables' },
    { id: 5, name: 'Tomatoes', category: 'vegetables', type: 'conventional', path: '/vegetables' },
    { id: 6, name: 'Cherry Tomatoes', category: 'vegetables', type: 'organic', path: '/vegetables' },
    
    // Fruits
    { id: 7, name: 'Organic Avocado', category: 'fruits', type: 'organic', path: '/fruits' },
    { id: 8, name: 'Fresh Bananas', category: 'fruits', type: 'conventional', path: '/fruits' },
    { id: 9, name: 'Organic Bananas', category: 'fruits', type: 'organic', path: '/fruits' },
    { id: 10, name: 'Organic Guava', category: 'fruits', type: 'organic', path: '/fruits' },
    { id: 11, name: 'Fresh Mango', category: 'fruits', type: 'conventional', path: '/fruits' },
    { id: 12, name: 'Organic Mango', category: 'fruits', type: 'organic', path: '/fruits' },
    { id: 13, name: 'Organic Papaya', category: 'fruits', type: 'organic', path: '/fruits' },
    { id: 14, name: 'Fresh Papaya', category: 'fruits', type: 'conventional', path: '/fruits' },
    { id: 15, name: 'Fresh Watermelon', category: 'fruits', type: 'conventional', path: '/fruits' },
    { id: 16, name: 'Fresh Pineapple', category: 'fruits', type: 'conventional', path: '/fruits' },
    
    
  ]

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    
    // Simulate search delay
    const searchTimeout = setTimeout(() => {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(filtered)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchTerm, allProducts]) 

  const handleResultClick = (product) => {
    if (product.category === 'pages') {
      navigate(product.path)
    } else {
      navigate(`/search?q=${encodeURIComponent(product.name)}`)
    }
    handleClose()
  }

  const handleClose = () => {
    setSearchTerm('')
    setSearchResults([])
    onClose()
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'vegetables':
        return '🥕'
      case 'fruits':
        return '🍎'
      case 'pages':
        return '📄'
      default:
        return '🔍'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'organic':
        return 'Organic'
      case 'conventional':
        return 'Conventional'
      case 'page':
        return 'Page'
      default:
        return ''
    }
  }

  if (!isOpen) return null

  return (
    <div className="search-overlay">
      <div className="search-modal">
        <div className="search-header">
          <h2>Search Govimansala</h2>
          <button className="search-close-btn" onClick={handleClose}>
            ×
          </button>
        </div>
        
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for products, pages, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            autoFocus
          />
          <div className="search-icon">🔍</div>
        </div>

        <div className="search-results-container">
          {isSearching && (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>Searching...</p>
            </div>
          )}

          {!isSearching && searchTerm && searchResults.length === 0 && (
            <div className="no-results">
              <p>No results found for "{searchTerm}"</p>
              <small>Try searching for vegetables, fruits, or page names</small>
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <div className="search-results">
              <p className="results-count">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </p>
              
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(product)}
                >
                  <div className="result-icon">
                    {getCategoryIcon(product.category)}
                  </div>
                  <div className="result-info">
                    <h4 className="result-name">{product.name}</h4>
                    <div className="result-meta">
                      <span className="result-category">{product.category}</span>
                      {product.type !== 'page' && (
                        <span className={`result-type ${product.type}`}>
                          {getTypeLabel(product.type)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="result-arrow">→</div>
                </div>
              ))}
            </div>
          )}

          {!isSearching && !searchTerm && (
            <div className="search-suggestions">
              <h3>Popular Searches</h3>
              <div className="suggestion-tags">
                <button onClick={() => setSearchTerm('organic')} className="suggestion-tag">
                  Organic Products
                </button>
                <button onClick={() => setSearchTerm('vegetables')} className="suggestion-tag">
                  Vegetables
                </button>
                <button onClick={() => setSearchTerm('fruits')} className="suggestion-tag">
                  Fruits
                </button>
                <button onClick={() => setSearchTerm('carrots')} className="suggestion-tag">
                  Carrots
                </button>
                <button onClick={() => setSearchTerm('mango')} className="suggestion-tag">
                  Mango
                </button>
                <button onClick={() => setSearchTerm('marketplace')} className="suggestion-tag">
                  Marketplace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchComponent
