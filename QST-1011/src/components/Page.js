import { useState, useEffect } from "react";
import NavbarMenu from './NavbarMenu';
import Navbar from './Navbar';
import ContentContainer from './ContentContainer';
import SearchBar from './SearchBar'



export default function Page( {products} ) {

    const [searchInput, setSearchInput] = useState("");
    const [newProducts, setNewProducts] = useState([]);
    const [page, setPage] = useState(1);
  
    useEffect(() => {
      setNewProducts(products);
    }, [products]);
  
    const [isActive, setIsActive] = useState(false);
  
    const toggleClass = () => {
      setIsActive(!isActive);
    };
  
    useEffect(() => {
      window.addEventListener('resize', function() {setIsActive(false)});
    })

    return(
      <>
      <NavbarMenu isActive={isActive} toggleFunction={toggleClass}/>
      <div className={`page-container ${isActive ? 'blur' : ''}`}>
        <Navbar toggleFunction={toggleClass} />
        <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} products={products} setNewProducts={setNewProducts} setPage={setPage} />
        <ContentContainer products = {newProducts} page={page} setPage={setPage} />
      </div>
      </>
  
    );

}
