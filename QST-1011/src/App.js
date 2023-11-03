import './App.css';
import { useState, useEffect } from "react";
import Page from './components/Page';




export default function App() {

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch('https://fakestoreapi.com/products');
        const products = await resp.json();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();

  }, [])

  return(
    <Page products={products} />
  )
  
}













// function Page( {products} ) {

//   const [searchInput, setSearchInput] = useState("");
//   const [newProducts, setNewProducts] = useState([]);

//   useEffect(() => {
//     setNewProducts(products);
//   }, [products]);

//   const [pages, setPages] = useState(10);

//   useEffect(() => {

//   } , [])
  

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchInput.length > 2) {
//         handleSearch(searchInput);
//       } else {
//         setNewProducts(products);
//       }
//       }, 1000);

//     return () => clearTimeout(timer)
//   }, [searchInput])



//   function handleSearch (query) {
//     if (query)
//       setNewProducts(products.filter(item => item.title.toLowerCase().includes(query)));
//   }

//   const [isActive, setIsActive] = useState(false);

//   const toggleClass = () => {
//     setIsActive(!isActive);
//   };

//   useEffect(() => {
//     window.addEventListener('resize', function() {setIsActive(false)});
//   })

//   return(
//     <>
//     <NavbarMenu isActive={isActive} toggleFunction={toggleClass}/>
//     <div className={`page-container ${isActive ? 'blur' : ''}`}>
//       <Navbar toggleFunction={toggleClass} />
//       <SearchBar setSearchInput={setSearchInput} />
//       <ContentContainer products = {newProducts} />
//     </div>
//     </>

//   );
// }



// function NavbarMenu({isActive, toggleFunction}) {

//   return(
//     <div className={`navbar-menu ${isActive ? 'active' : ''}`}>
//       <ul className="navbar-menu-list">
//           <img src={closeline} id="close-navbar" height="20px" onClick={toggleFunction} />
//           <NavItems classname=''/>
//       </ul>
//     </div>
//   );
// }

// function Navbar({toggleFunction}) {
//   return (
//     <>
      
//       <div className='navbar'>
//         <ul>
//           <li className="menu-toggle"> <img src={hamburger} id="hamburger-menu" onClick={toggleFunction} /> </li>
//           <li className="header-logo"> <img src={logo} id="logo"/> </li>
//           <div className="left-navbar">
//             <NavItems classname='left-navbar-items'/>
//           </div>
//           <li className="navbar-space"></li>
//           <div className="right-navbar">
//           <li className="right-navbar-items"><img src={mappin} height="20px"/></li>
//           <li className="right-navbar-items"><img src={user} height="20px"/></li>
//           <li className="right-navbar-items"><img src={shoppingbag} height="20px"/></li>
//           </div>
      
//         </ul>
//       </div>
//     </>
//   );
// }


// function NavItems({ classname }) {
//   return (
//     <>
//       {navdata.map((item, index) => (
//         <a key={index} href={item.href}>
//           <li className={classname}>{item.header.toUpperCase()}</li>
//         </a>
//       ))}
//     </>
//   );
// }


// function SearchBar( {setSearchInput} ) {
//   return(
//     <div className="search-bar">
    
//       <h4>What are you looking for?</h4>
  
//       <span> <input type="text" id="search-box" onInput={e => {
//         setSearchInput(e.target.value);
//         }} /> 
//         <i id="search-icon"> <img src={searchline} height="20px" /> </i> 
//         </span>
    
//     </div>
//   );
// }



// function SideNav() {

//   return(
//     <aside>
//       <div className="sidenav-container">
//         <div className="sidenav">
//           <ul className="sidenav-list">
//             {filterdata.map((item, index) => (
//               <Filters key={index} item={item} index={index}/>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </aside>
//   );

// }


// function Filters( {item, index} ) {
//   return(
//     <li key={`filterli${index}`} className='filter-items'> <span> {item.filter.toUpperCase()} <img src={addline} height="20px" id={`more-${index}`} /></span> 
//       <div key={`lidiv${index}`} className='sidenav-wrapper'>
//         <ul key={`divlist${index}`} className='category-items'>
//           {item.items.map((filteritem, index) => (
//             <FilterList key={index} item={filteritem} />
//           ))}
//         </ul>
//       </div>
//     </li>
//   )
// }

// //id={`slide-${index}`}

// function FilterList({item}) {
//   return(
//       <li> {item} <input type='checkbox'></input> </li>
//   )
// }


// function ContentContainer( {products} ) {

//   return(
//     <>
//       <div className="content-container">
//         <SideNav />
//         <ContentGrid products = {products} />
//       </div>
//     </>
//   )
// }

// function ContentGrid( {products} ) {

//   return(
//     <main id="content-main">
//       <div className="grid-header">
//         <div id="dis">Display: 10 items per page </div>
//         <div id="emp"></div>
//         <div id="hide"> Hide Filters</div>
//         <div id="sort">Sort By</div>
            
//         </div>
//         <Grid products={products}></Grid>
//         <div id="page-number-wrapper"></div>
//     </main>
//   );
// }

// function Grid({ products }) {
//   return (
//     <div className="product-grid">
//       {products.map((item) => (
//         <Tile key={item.index} product={item} />
//       ))}
//     </div>
//   );
// }

// function Tile( {product} ) {
//   return (
//     <>
//     <div className='product-container'>
//       <ImageDiv image={product.image} />
//       <hr></hr>
//       <ProductDesc title={product.title} category={product.category} price={product.price} />
//     </div>
//     </>
//   )
// }

// function ImageDiv( {image} ) {
//   return (
//     <>
//     <div className='imagediv'>
//       <a href='#' className='product-link'>
//         <img src={image} />
//       </a>
//     </div>
//     </>
//   )
// }

// function ProductDesc( {title, category, price} ) {
//   return (
//     <div className='captions'>
//       <a href="#" className='product-link'>
//         <p className='ptitle'> {title} </p>
//       </a>
//       <p className='pcategory'> {category} </p>
//       <p className='pprice'> {price} </p>
//     </div>
//   )
// }
