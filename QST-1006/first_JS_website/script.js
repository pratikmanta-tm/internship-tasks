    const toggleButton = document.getElementsByClassName("toggle-button")[0];
    const navlink = document.getElementsByClassName('navlink');


    toggleButton.addEventListener('click', ()=> Array.from(navlink).map(item => item.classList.toggle('active')));