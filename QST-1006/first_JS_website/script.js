    const toggleButton = document.getElementsByClassName("toggle-button")[0];

    toggleButton.addEventListener('click', () => {
        for(let i of document.getElementsByClassName('navlink') ){
            i.classList.toggle('active'); 
        }
    })
