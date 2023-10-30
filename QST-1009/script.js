

 $(document).ready(function() {
        let grid = $('.product-grid');
        let pageNoWrapper = $('#page-number-wrapper');
        let searchCache = new Map();
        let categoryFilter = new Map();
        let priceFilter = new Map();


        let pageData = {
            page: 1,
            itemNos: 10
        }

        buildNav();
        buildSideNav();

        function hideNav(){
            $('.navbar-menu').hide("slide", { direction: "left" }, 500);
            $('.page-container').removeClass('blur');
        }

        $(document).on('click', function(event) {
            if (!$(event.target).closest('.navbar-menu').length && $('.navbar-menu').is(':visible')) 
                hideNav();
        });

        $(window).on('resize', function(event) {
            if (!$(event.target).closest('.navbar-menu').length && $('.navbar-menu').is(':visible')) 
                hideNav();
        });
        
        $('#hamburger-menu').on('click', function(event) {
            $('.navbar-menu').show("slide", { direction: "left" }, 500);
            $('.page-container').toggleClass('blur');
            event.stopPropagation();
        });
        
        $('#close-navbar').on('click', function() {
            hideNav();
        });
        
        $('.navbar-menu').on('click', function(event) {
            event.stopPropagation();
        });
        

        async function getProducts(url) {
            try {
                const resp = await fetch(url);
                let products = await resp.json();

                let searchIcon = $('#search-icon'); 
                let searchInput = $('#search-box');

                searchInput.keyup(function (event) {

                    if (event.keyCode === 13) {
                        getProducts(url);
                    }

                });

                searchIcon.on('click', function() {
                    getProducts(url);
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
            pageNoWrapper.html("");

            if(n > pageData.itemNos) {

                let pageNos = Math.ceil(n/pageData.itemNos);
                for (let i = 1; i <= pageNos ; i++) {
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
        }



        function displayProducts(products) {

            products = applyFilters(products);

            let finalproducts = pagination(products);

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
            pageData.page = 1;

            if (query === '') {
                displayProducts(products);
            } else {

                if (searchCache.has(query)) {
                    displayProducts(searchCache.get(query));
                } else {

                    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query));
                    searchCache.set(query, filteredProducts);
                    displayProducts(filteredProducts);
                }
            }

        }

        function applyFilters(products) {
                
            if (categoryFilter.size > 0){
                products = products.filter(item => {
                    return categoryFilter.has(item.category)
                })
            }
                
            if (priceFilter.size > 0){ 
                products = products.filter(item => {
                    const isInAnyRange =  [...priceFilter].some(([lowerLimit, upperLimit]) => {
                        return ((item.price > lowerLimit) && (upperLimit?item.price <= upperLimit:true));
                    });
                    return isInAnyRange;
                })
                console.log(products);
            }
            
            return products;
        }
        

        function buildNav(){
            $.getJSON("navbar.json", function(json) {
                let navitems = json;

                navitems.map((item)=> {
                    let navheader = $('<li>').addClass('left-navbar-items').text(item.header.toUpperCase());
                    let navlink = $('<a>').attr('href', item.href);
                    navlink.append(navheader);
                    $('.left-navbar').append(navlink);
                    let navheader2 = $('<li>').text(item.header.toUpperCase());
                    let navlink2 = $('<a>').attr('href', item.href);
                    navlink2.append(navheader2);
                    $('.navbar-menu-list').append(navlink2);
                })
            });
        }

        function buildSideNav(){
            $.getJSON("filters.json", function(json) {
                let filters = json;

                filters.map((item)=> {
                    let filterli = $('<li>').addClass('filter-items').html(`<span>${item.filter.toUpperCase()} <img src="assets/add-line.svg" height=20px id="more-${filters.indexOf(item)}"></span>`);
                    let lidiv = $('<div>').addClass('sidenav-wrapper').attr('id', `slide-${filters.indexOf(item)}`);
                    let divlist = $('<ul>').addClass('category-items');

                    item.items.map((catitem) => {
                        let i = item.items.indexOf(catitem);
                        let check = $('<input>').attr('type', 'checkbox');
                        let cli = $('<li>').html(`${catitem}`).append(check);
                        check.change(function(){    

                            switch (item.filter) {
                                case "Category":
                                    if (this.checked){
                                        categoryFilter.set(catitem.toLowerCase(), null); 
                                    }
                                    else {
                                        categoryFilter.delete(catitem.toLowerCase());
                                    }
                                    break;
                                case "Price":
                                    if (this.checked){
                                        priceFilter.set(item.ranges[i][0], item.ranges[i][1]);
                                    }
                                    else {
                                        priceFilter.delete(item.ranges[i][0], item.ranges[i][1]);
                                    }
                                    break;
                            
                                default:
                                    break;
                            }
                            setTimeout(() => {
                                getProducts('https://fakestoreapi.com/products');
                            }, 1000);
                                
                        })
                        divlist.append(cli);
                    })
                    lidiv.append(divlist);
                    filterli.append(lidiv);
                    $('.sidenav-list').append(filterli);

                    $(`#more-${filters.indexOf(item)}`).click(function(){
                        $(`#slide-${filters.indexOf(item)}`).slideToggle("slow");
                    })
                })``

                
            });
        }

        getProducts('https://fakestoreapi.com/products');


    });