function filterProducts(query) {
    query = query.toLowerCase();
    return products.filter(product => product.name.toLowerCase().includes(query));
}


function searchFunction() {

    const searchInput = $('#searchInput'); 
    const searchResults = $('#searchResults'); 
    const query = searchInput.val().trim();

    if (query === '') {
        searchResults.html('');
    } else {
        const filteredProducts = filterProducts(query);

        if (filteredProducts.length === 0) {
            searchResults.html('No matching products found.');
        } else {
            renderProducts(filteredProducts);
        }
    }
}

let searchInput = $('#searchInput'); 
searchInput.on('input', handleSearch);
  
 
let productNameMap = new Map();
            products.forEach(item => {
                productNameMap.set(item.title,)
            })