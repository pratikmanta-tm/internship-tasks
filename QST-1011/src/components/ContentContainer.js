import SideNav from "./SideNav";
import PageButton from "./PageButton";
import { useEffect, useState } from "react";

export default function ContentContainer( {products, page, setPage} ) {

  let [categories, setCategories] = useState(new Map())
  let [prices, setPrices] = useState(new Map());
  let [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setTimeout(() => {
      applyFilters(products);
    }, 1000);
  }, [products, categories, prices]);

  function applyFilters(products) {
    if (categories.size > 0 || prices.size > 0) {
      let temp = products;
      if (categories.size > 0){
        temp = temp.filter(item => {return categories.has(item.category)});
      }
      if (prices.size > 0){ 
        temp = temp.filter(item => {
            const isInAnyRange =  [...prices].some(([lowerLimit, upperLimit]) => {
                  return ((item.price > lowerLimit) && (upperLimit?item.price <= upperLimit:true));
            });
            return isInAnyRange;
        })
      }
      setFilteredProducts(temp);
    } else {
      setFilteredProducts(products);
    }
  }

  return(
      <>
        <div className="content-container">
          <SideNav categories={categories} prices={prices} setCategories={setCategories} setPrices={setPrices} />
          <ContentGrid products = {filteredProducts} page={page} setPage={setPage} />
        </div>
      </>
  )
}


function ContentGrid( {products, page, setPage} ) {
    
    const [finalProducts, setFinalProducts] = useState([]);
    const [itemNos, setItemNos] = useState(10); // input in line 27

    return(
      <main id="content-main">
        <div className="grid-header">
          <div id="dis">Display: 10 items per page </div> 
          <div id="emp"></div>
          <div id="hide"> Hide Filters</div>
          {/* <div id="sort">Sort By</div> */}
        </div>
        <Grid products={finalProducts}></Grid>
        <PageButton setFinalProducts={setFinalProducts} products={products} page={page} setPage={setPage} itemNos={itemNos} />
      </main>
    );
}
  
function Grid({ products }) {
    return (
      <div className="product-grid">
        {products.map((item) => (
          <Tile key={item.index} product={item} />
        ))}
      </div>
    );
}
  
function Tile( {product} ) {
    return (
      <>
      <div className='product-container'>
        <ImageDiv image={product.image} />
        <hr></hr>
        <ProductDesc title={product.title} category={product.category} price={product.price} />
      </div>
      </>
    )
}
  
function ImageDiv( {image} ) {
    return (
      <>
      <div className='imagediv'>
        <a href='#' className='product-link'>
          <img src={image} />
        </a>
      </div>
      </>
    )
}
  
function ProductDesc( {title, category, price} ) {
    return (
      <div className='captions'>
        <a href="#" className='product-link'>
          <p className='ptitle'> {title} </p>
        </a>
        <p className='pcategory'> {category} </p>
        <p className='pprice'> {price} </p>
      </div>
    )
}
  