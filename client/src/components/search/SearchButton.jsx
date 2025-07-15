import React, { useState } from 'react'
import SearchComponent from './SearchComponent'
import './SearchButton.css'

function SearchButton({ style = 'default' }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const openSearch = () => setIsSearchOpen(true)
  const closeSearch = () => setIsSearchOpen(false)

  // Handle keyboard shortcut (Ctrl/Cmd + K)
  React.useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch()
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [isSearchOpen])

  if (style === 'header') {
    return (
      <>
        <div className="search-trigger-header" onClick={openSearch}>
          <span className="search-icon">🔍</span>
          <span className="search-placeholder">Search...</span>
          <span className="search-shortcut">⌘K</span>
        </div>
        <SearchComponent isOpen={isSearchOpen} onClose={closeSearch} />
      </>
    )
  }

  if (style === 'floating') {
    return (
      <>
        <button className="search-floating-btn" onClick={openSearch} title="Search (Ctrl+K)">
          🔍
        </button>
        <SearchComponent isOpen={isSearchOpen} onClose={closeSearch} />
      </>
    )
  }

  return (
    <>
      <button className="search-btn-default" onClick={openSearch}>
        <span className="search-icon">🔍</span>
        <span>Search</span>
      </button>
      <SearchComponent isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  )
}

export default SearchButton
