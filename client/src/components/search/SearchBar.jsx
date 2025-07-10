import React, { useState } from 'react'
import './SearchBar.css'

function SimpleSearchBar({ placeholder = "Search products...", onSearch, data = [] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.trim() === '') {
      setSuggestions([])
      setShowSuggestions(false)
      if (onSearch) onSearch('')
      return
    }

    // Filter suggestions from data
    const filtered = data.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 5) // Show max 5 suggestions

    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
    
    // Call parent search function
    if (onSearch) onSearch(value)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion)
    setShowSuggestions(false)
    if (onSearch) onSearch(suggestion)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuggestions(false)
    if (onSearch) onSearch(searchTerm)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSuggestions([])
    setShowSuggestions(false)
    if (onSearch) onSearch('')
  }

  return (
    <div className="simple-search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="search-input"
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true)
            }}
            onBlur={() => {
              // Delay hiding to allow suggestion clicks
              setTimeout(() => setShowSuggestions(false), 200)
            }}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-btn"
              onClick={clearSearch}
            >
              ×
            </button>
          )}
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  )
}

export default SimpleSearchBar
