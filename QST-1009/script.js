

$(document).ready(function() {
    let grid = $('.product-grid');
    let pageNoWrapper = $('#page-number-wrapper');
    let searchCache = new Map();

    let pageData = {
        page: 1,
        itemNos: 10
    }

    for (let i = 1; i <= $('.filter-items').length; i++) {
        $(`#more-${i}`).click(function(){
            $(`#slide-${i}`).slideToggle("slow");
         })
    }
    

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

    function pagination(products){
        let pageStart = (pageData.page - 1) * pageData.itemNos;
        let pageEnd = pageStart + pageData.itemNos;
        return products.slice(pageStart, pageEnd);
    }

    function pageButtons(n, products){
        pageNoWrapper.html("")



        let pageNos = Math.ceil(n/pageData.itemNos);
        for (let i = 1; i <= pageNos ; i++) {
            console.log('heheheh')
            let pageButton = $('<button>').attr('value', i).addClass('page-button').text(i);
            pageNoWrapper.append(pageButton);
            if(i == pageData.page)
                pageButton.css("color", "red");
        }

        $('.page-button').click(function(){
            grid = grid.html("");
            pageData.page = $(this).val();
            displayProducts(products);
        })
    }

    function displayProducts(products) {

       let finalproducts = pagination(products) 

        grid = grid.html("");
        finalproducts.forEach(item => {
            
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

        pageButtons(products.length, products);

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
        
        let query = searchInput.val().toLowerCase().trim();


        if (query === '') {
            displayProducts(products);
        } else {

            if (searchCache.has(query)) {
                displayProducts(searchCache.get(query));
            } else {

                const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
                searchCache.set(query, filteredProducts);
                displayProducts(filteredProducts);
            }
        }

    }

    getProducts('https://fakestoreapi.com/products');


});