

$(document).ready(function() {
    let grid = $('.product-grid');

    async function getProducts(url) {
        try {

            console.log('a');

            const resp = await fetch(url);
            let products = await resp.json();
            console.log(products);

            let searchIcon = $('#search-icon'); 
            let searchInput = $('#search-box');

            searchInput.keyup(function (event) {
                console.log('b');
                if (event.keyCode === 13) {
                    getProducts('https://fakestoreapi.com/products');
                }
            });

            searchIcon.on('click', function() {
                getProducts('https://fakestoreapi.com/products');
            });
            
            searchInput.on('input', function(){
                searchInput = $('#search-box');
                debounce(searchInput, products);
            })

            searchFunction(products);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function displayProducts(products) {
        grid = grid.html("");
        products.forEach(item => {
            
            let tile = $('<div>').addClass('product-container');
            let imagediv = $('<div>').addClass('imagediv');
            let productimg = $('<img>').attr('src', item.image);

            let linebr = $('<hr>');

            let productdesc = $('<div>').addClass('captions');
            let productTitle = $('<p>').addClass('ptitle').text(item.title);
            let productCategory = $('<p>').addClass('pcategory').text(item.category);
            let price = $('<p>').addClass('pprice').text(item.price);

            let imagelink = $('<a>').attr('href', '#').addClass('product-link');
            let titlelink = $('<a>').attr('href', '#').addClass('product-link');

            imagelink.append(productimg);
            imagediv.append(imagelink);
            tile.append(imagediv);
            tile.append(linebr);
            titlelink.append(productTitle);
            productdesc.append(titlelink);
            productdesc.append(productCategory);
            productdesc.append(price);
            tile.append(productdesc);

            grid.append(tile);
        });
    }

    function debounce(searchInput, products, timeout = 1000) {
        let timer;
        
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (searchInput.val().length > 2) {
                    searchFunction(products);
                } else 
                    displayProducts(products);
            }, timeout);
    }

    function searchFunction(products) {

        const searchInput = $('#search-box'); 
        
        let query = searchInput.val();

        if (query === '') {
            displayProducts(products);
            console.log('d');
        } else {

            query = query.toLowerCase().trim();
            const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
            displayProducts(filteredProducts);
            console.log('e');
        }

    }

    getProducts('https://fakestoreapi.com/products');


});