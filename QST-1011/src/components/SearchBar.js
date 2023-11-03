import searchline from '../assets/search-line.svg';
import { useEffect } from 'react';

export default function SearchBar( {searchInput, setSearchInput, products, setNewProducts, setPage} ) {

    let searchCache = new Map();

    useEffect(() => {
        if (searchInput.length > 2) {
            const timer = setTimeout(() => {
                handleSearch(searchInput);
            }, 1000);
            return () => clearTimeout(timer)
        } else {
            setNewProducts(products);
        }
        // eslint-disable-next-line
    }, [searchInput, products])
    
   function handleSearch (query) {
        if (query) {
            if (searchCache.has(query)) {
                setNewProducts(searchCache.get(query));
            } else {
                let filteredProducts = products.filter(product => product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query));
                searchCache.set(query, filteredProducts);
                setNewProducts(filteredProducts);
            }
            setPage(1);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSearch(searchInput);
        }
    };


    return(
      <div className="search-bar">
      
        <h4>What are you looking for?</h4>
    
        <span> <input type="text" id="search-box" onKeyDown={handleKeyPress} onInput={e => {
          setSearchInput(e.target.value);
          }}  /> 
          <i id="search-icon"> 
            <img src={searchline} height="20px" alt='' onClick={() => {handleSearch(searchInput)}}/> 
          </i> 
          </span>
      
      </div>
    );
  }
