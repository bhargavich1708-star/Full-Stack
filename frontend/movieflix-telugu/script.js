
const movies=[
{
id:1,
title:"Inception",
year:"2010",
rating:"8.8",
category:"Hollywood",
poster:"assets/inception.png",
genre:"Action / Drama",
plot:"A visually stunning cinematic experience packed with emotion, action and entertainment."
},{
id:2,
title:"Interstellar",
year:"2014",
rating:"8.7",
category:"Hollywood",
poster:"assets/interstellar.png",
genre:"Action / Drama",
plot:"A visually stunning cinematic experience packed with emotion, action and entertainment."
},{
id:3,
title:"Avatar",
year:"2009",
rating:"7.9",
category:"Hollywood",
poster:"assets/avatar.png",
genre:"Action / Drama",
plot:"A visually stunning cinematic experience packed with emotion, action and entertainment."
},{
id:4,
title:"Joker",
year:"2019",
rating:"8.4",
category:"Hollywood",
poster:"assets/joker.png",
genre:"Action / Drama",
plot:"A visually stunning cinematic experience packed with emotion, action and entertainment."
},{
id:5,
title:"Titanic",
year:"1997",
rating:"7.9",
category:"Hollywood",
poster:"assets/titanic.png",
genre:"Action / Drama",
plot:"A visually stunning cinematic experience packed with emotion, action and entertainment."
},{
id:6,
title:"Magadheera",
year:"2009",
rating:"7.8",
category:"Telugu",
poster:"assets/magadheera.png",
genre:"Action / Drama",
plot:"A visually stunning cinematic experience packed with emotion, action and entertainment."
},{
id:7,
title:"Baahubali",
year:"2015",
rating:"8.0",
category:"Telugu",
poster:"assets/baahubali.png",
genre:"Action / Drama",
plot:"A visually stunning cinematic experience packed with emotion, action and entertainment."
},{
id:8,
title:"Pushpa",
year:"2021",
rating:"7.6",
category:"Telugu",
poster:"assets/pushpa.png",
genre:"Action / Drama",
plot:"A visually stunning cinematic experience packed with emotion, action and entertainment."
},{
id:9,
title:"RRR",
year:"2022",
rating:"7.9",
category:"Telugu",
poster:"assets/rrr.png",
genre:"Action / Drama",
plot:"A visually stunning cinematic experience packed with emotion, action and entertainment."
},{
id:10,
title:"Bharat Ane Nenu",
year:"2018",
rating:"7.7",
category:"Telugu",
poster:"assets/bharat-ane-nenu.png",
genre:"Action / Drama",
plot:"A visually stunning cinematic experience packed with emotion, action and entertainment."
}
];

const hollywoodGrid=document.getElementById("hollywoodGrid");
const teluguGrid=document.getElementById("teluguGrid");
const searchInput=document.getElementById("searchInput");
const modal=document.getElementById("modal");
const modalContent=document.getElementById("modalContent");

function renderMovies(){
hollywoodGrid.innerHTML="";
teluguGrid.innerHTML="";

const search=searchInput.value.toLowerCase();

movies
.filter(movie=>movie.title.toLowerCase().includes(search))
.forEach(movie=>{

const card=document.createElement("div");

card.classList.add("movie-card");

card.innerHTML=`
<img src="${movie.poster}" alt="${movie.title}">

<div class="movie-info">
<h3>${movie.title}</h3>

<p>Year: ${movie.year}</p>

<p>IMDb: ⭐ ${movie.rating}</p>

<button onclick="openModal(${movie.id})">
View Details
</button>
</div>
`;

if(movie.category==="Hollywood"){
hollywoodGrid.appendChild(card);
}
else{
teluguGrid.appendChild(card);
}

});
}

function openModal(id){
const movie=movies.find(item=>item.id===id);

modalContent.innerHTML=`
<button class="close-btn" onclick="closeModal()">
✖
</button>

<img src="${movie.poster}" alt="${movie.title}">

<h2>${movie.title}</h2>

<br>

<p><strong>Year:</strong> ${movie.year}</p>
<p><strong>IMDb Rating:</strong> ⭐ ${movie.rating}</p>
<p><strong>Genre:</strong> ${movie.genre}</p>

<br>

<p>${movie.plot}</p>
`;

modal.classList.remove("hidden");
}

function closeModal(){
modal.classList.add("hidden");
}

searchInput.addEventListener("input",renderMovies);

renderMovies();
