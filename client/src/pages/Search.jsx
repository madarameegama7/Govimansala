import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './styles/Search.css'

// Sample data for search - you can expand this with real data
const allProducts = [
    // Vegetables
    { id: 1, name: 'Fresh Carrots', description: 'Organic fresh carrots from local farms', category: 'vegetables', type: 'organic', path: '/vegetables', price: 250, rating: 4.8, farmer: 'Rajesh Farm' },
    { id: 2, name: 'Fresh Brinjal', description: 'Purple brinjal grown without pesticides', category: 'vegetables', type: 'organic', path: '/vegetables', price: 180, rating: 4.6, farmer: 'Green Valley Farm' },
    { id: 3, name: 'Organic Potatoes', description: 'Premium quality organic potatoes', category: 'vegetables', type: 'organic', path: '/vegetables', price: 120, rating: 4.7, farmer: 'Mountain View Farm' },
    { id: 4, name: 'Red Onions', description: 'Fresh red onions for cooking', category: 'vegetables', type: 'conventional', path: '/vegetables', price: 80, rating: 4.5, farmer: 'Sunrise Farm' },
    { id: 5, name: 'Tomatoes', description: 'Juicy fresh tomatoes', category: 'vegetables', type: 'conventional', path: '/vegetables', price: 150, rating: 4.4, farmer: 'Valley Farm' },
    { id: 6, name: 'Cherry Tomatoes', description: 'Sweet organic cherry tomatoes', category: 'vegetables', type: 'organic', path: '/vegetables', price: 320, rating: 4.9, farmer: 'Organic Hills' },
    
    // Fruits
    { id: 7, name: 'Organic Avocado', description: 'Creamy organic avocados rich in nutrients', category: 'fruits', type: 'organic', path: '/fruits', price: 450, rating: 4.8, farmer: 'Tropical Farm' },
    { id: 8, name: 'Fresh Bananas', description: 'Sweet and ripe bananas', category: 'fruits', type: 'conventional', path: '/fruits', price: 60, rating: 4.3, farmer: 'Banana Grove' },
    { id: 9, name: 'Organic Bananas', description: 'Pesticide-free organic bananas', category: 'fruits', type: 'organic', path: '/fruits', price: 90, rating: 4.6, farmer: 'Eco Banana Farm' },
    { id: 10, name: 'Organic Guava', description: 'Fresh organic guava with natural sweetness', category: 'fruits', type: 'organic', path: '/fruits', price: 200, rating: 4.7, farmer: 'Paradise Farm' },
    { id: 11, name: 'Fresh Mango', description: 'Juicy mangoes from tropical farms', category: 'fruits', type: 'conventional', path: '/fruits', price: 180, rating: 4.5, farmer: 'Mango Grove' },
    { id: 12, name: 'Organic Mango', description: 'Premium organic mangoes', category: 'fruits', type: 'organic', path: '/fruits', price: 280, rating: 4.9, farmer: 'Royal Mango Farm' },
    { id: 13, name: 'Organic Papaya', description: 'Sweet organic papaya rich in vitamins', category: 'fruits', type: 'organic', path: '/fruits', price: 160, rating: 4.6, farmer: 'Green Garden' },
    { id: 14, name: 'Fresh Papaya', description: 'Fresh papaya for healthy eating', category: 'fruits', type: 'conventional', path: '/fruits', price: 120, rating: 4.4, farmer: 'Tropical Valley' },
    { id: 15, name: 'Fresh Watermelon', description: 'Refreshing watermelons for summer', category: 'fruits', type: 'conventional', path: '/fruits', price: 80, rating: 4.3, farmer: 'Summer Farm' },
    { id: 16, name: 'Fresh Pineapple', description: 'Sweet and tangy pineapples', category: 'fruits', type: 'conventional', path: '/fruits', price: 150, rating: 4.5, farmer: 'Pineapple Hills' },
    
    // Pages
    { id: 17, name: 'Marketplace', description: 'Browse all our fresh products', category: 'pages', type: 'page', path: '/marketplace', rating: 5.0 },
    { id: 18, name: 'About Us', description: 'Learn about our mission and values', category: 'pages', type: 'page', path: '/about', rating: 5.0 },
    { id: 19, name: 'Contact', description: 'Get in touch with us', category: 'pages', type: 'page', path: '/contact', rating: 5.0 },
    { id: 20, name: 'Login', description: 'Access your account', category: 'pages', type: 'page', path: '/login', rating: 5.0 },
    { id: 21, name: 'Sign Up', description: 'Create a new account', category: 'pages', type: 'page', path: '/signup', rating: 5.0 },
]

function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')
  const navigate = useNavigate()
  const location = useLocation()

  // Get search term from URL params on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const queryParam = urlParams.get('q')
    if (queryParam) {
      setSearchTerm(queryParam)
    }
  }, [location.search])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    
    // Simulate search delay
    const searchTimeout = setTimeout(() => {
      let filtered = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.farmer?.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesFilter = filter === 'all' || product.category === filter
        
        return matchesSearch && matchesFilter
      })

      // Sort results
      if (sortBy === 'price-low') {
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
      } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
      } else if (sortBy === 'rating') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name))
      }

      setSearchResults(filtered)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchTerm, filter, sortBy])

  const handleResultClick = (product) => {
    navigate(product.path)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Update URL with search term
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
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

  const formatPrice = (price) => {
    return price ? `Rs. ${price}/kg` : ''
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐')
    }
    if (hasHalfStar) {
      stars.push('✨')
    }
    
    return stars.join('')
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="container">
          <h1>Search</h1>
          <p>Find the freshest products from local farmers</p>
        </div>
      </div>

      <div className="search-content">
        <div className="container">
          {/* Search Form */}
          <div className="search-form-section">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-input-group">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for fruits, vegetables, or pages..."
                  className="search-input"
                  autoFocus
                />
                <button type="submit" className="search-submit-btn">
                  🔍
                </button>
              </div>
            </form>

            {/* Filters and Sort */}
            <div className="search-filters">
              <div className="filter-group">
                <label>Category:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">All Categories</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="pages">Pages</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="relevance">Relevance</option>
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="search-results-section">
            {isSearching && (
              <div className="search-loading">
                <div className="loading-spinner"></div>
                <p>Searching...</p>
              </div>
            )}

            {!isSearching && searchTerm && (
              <div className="search-results-header">
                <h2>
                  {searchResults.length > 0 
                    ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchTerm}"`
                    : `No results found for "${searchTerm}"`
                  }
                </h2>
              </div>
            )}

            {!isSearching && searchTerm === '' && (
              <div className="search-empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3>Start searching</h3>
                <p>Enter a search term to find products and pages</p>
                <div className="search-suggestions">
                  <h4>Popular searches:</h4>
                  <div className="suggestion-tags">
                    <span onClick={() => setSearchTerm('organic')} className="suggestion-tag">Organic</span>
                    <span onClick={() => setSearchTerm('mango')} className="suggestion-tag">Mango</span>
                    <span onClick={() => setSearchTerm('vegetables')} className="suggestion-tag">Vegetables</span>
                    <span onClick={() => setSearchTerm('carrots')} className="suggestion-tag">Carrots</span>
                  </div>
                </div>
              </div>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="search-results-grid">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="search-result-card"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="result-header">
                      <span className="result-icon">{getCategoryIcon(result.category)}</span>
                      <div className="result-info">
                        <h3 className="result-title">{result.name}</h3>
                        <p className="result-description">{result.description}</p>
                      </div>
                    </div>

                    <div className="result-meta">
                      <div className="result-tags">
                        <span className="category-tag">{result.category}</span>
                        {getTypeLabel(result.type) && (
                          <span className="type-tag">{getTypeLabel(result.type)}</span>
                        )}
                      </div>

                      {result.price && (
                        <div className="result-price">
                          {formatPrice(result.price)}
                        </div>
                      )}

                      {result.rating && (
                        <div className="result-rating">
                          <span className="stars">{renderStars(result.rating)}</span>
                          <span className="rating-text">{result.rating}</span>
                        </div>
                      )}

                      {result.farmer && (
                        <div className="result-farmer">
                          by {result.farmer}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isSearching && searchTerm && searchResults.length === 0 && (
              <div className="search-no-results">
                <div className="no-results-icon">😔</div>
                <h3>No results found</h3>
                <p>Try adjusting your search terms or filters</p>
                <div className="search-tips">
                  <h4>Search tips:</h4>
                  <ul>
                    <li>Check your spelling</li>
                    <li>Try more general terms</li>
                    <li>Use different keywords</li>
                    <li>Remove filters to see more results</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
