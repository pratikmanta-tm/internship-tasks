const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navlink = document.getElementsByClassName('navlink');


toggleButton.addEventListener('click', ()=> Array.from(navlink).map(item => item.classList.toggle('active')));

const posts =[];
    
const images = [
        'photos/pic11.jpg', 'photos/pic12.jpg', 'photos/pic10.jpg', 
        'photos/pic9.jpg', 'photos/pic8.jpg', 'photos/pic7.jpg',
        'photos/pic6.jpg', 'photos/pic5.jpg', 'photos/pic3.jpg',
        'photos/pic2.jpg', 'photos/pic1.jpg', 'photos/pic4.jpg', 
];

for(let i = 0; i < images.length; i++){
    let item = {
        id: i,
        image: images[i], 
    }
    posts.push(item);
}

const container = document.querySelector('.grid-container');


function makeGrid(columns, posts){
    container.innerHTML = '';

    let gridColumn = {};

    for(let i = 0; i < columns; i++){
        gridColumn[`column${i}`] = [];
    } 

    for(let i = 0; i < posts.length; i++) {
        const column = i % columns;
        gridColumn[`column${column}`].push(posts[i]);
    }

    for(let i = 0; i < columns; i++) {
        let columnPosts = gridColumn[`column${i}`];
        let columnDiv = document.createElement('div');
        columnDiv.classList.add('column');

        columnPosts.forEach(post =>{
            let postDiv = document.createElement('div');
            postDiv.classList.add('post');
            let pic = document.createElement('img');
            pic.src = post.image; 
            postDiv.appendChild(pic);
            columnDiv.appendChild(postDiv);

            console.log(columnDiv);
        })

        container.appendChild(columnDiv);
    }
}


let w = window.innerWidth;

if(w <= 470)
  makeGrid(1, posts);
else if (w > 470 && w <= 769)
  makeGrid(2, posts);
else if (w > 769 && w <= 1200)
  makeGrid(3, posts);
else if (w > 1200)
  makeGrid(4, posts);

window.addEventListener('resize', () => {

  let w = window.innerWidth;

  if(w <= 470)
    makeGrid(1, posts);
  else if (w > 470 && w <= 769)
    makeGrid(2, posts);
  else if (w > 769 && w <= 1200)
    makeGrid(3, posts);
  else if (w > 1200)
    makeGrid(4, posts);

})

