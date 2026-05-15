
const API_URL="https://fakestoreapi.com/products";

const productsGrid=document.getElementById("productsGrid");
const loader=document.getElementById("loader");
const errorMessage=document.getElementById("errorMessage");

const searchInput=document.getElementById("searchInput");
const categoryFilter=document.getElementById("categoryFilter");

const cartBtn=document.getElementById("cartBtn");
const cartSidebar=document.getElementById("cartSidebar");
const closeCart=document.getElementById("closeCart");

const cartItems=document.getElementById("cartItems");
const cartTotal=document.getElementById("cartTotal");
const cartCount=document.getElementById("cartCount");

const modal=document.getElementById("modal");
const modalContent=document.getElementById("modalContent");

const overlay=document.getElementById("overlay");

let products=[];
let cart=[];

function usdToInr(price){
return Math.round(price * 83);
}

async function fetchProducts(){

showLoader();

try{

const response=await fetch(API_URL);
const data=await response.json();

products=data;

populateCategories();
renderProducts(products);

hideLoader();

}catch(error){

hideLoader();
showError("Failed to fetch products.");

}
}

function renderProducts(data){

productsGrid.innerHTML="";

data.forEach(product=>{

const card=document.createElement("div");

card.classList.add("product-card");

card.innerHTML=`
<img src="${product.image}">

<div class="product-info">

<h3>${product.title}</h3>

<p class="price">
₹${usdToInr(product.price)}
</p>

<p>⭐ ${product.rating.rate}</p>

<div class="btn-group">

<button class="cart-btn"
onclick="addToCart(${product.id})">
Add Cart
</button>

<button class="details-btn"
onclick="openModal(${product.id})">
Details
</button>

</div>

</div>
`;

productsGrid.appendChild(card);

});
}

function populateCategories(){

const categories=[...new Set(
products.map(item=>item.category)
)];

categories.forEach(category=>{

const option=document.createElement("option");

option.value=category;
option.textContent=category;

categoryFilter.appendChild(option);

});
}

function filterProducts(){

const text=searchInput.value.toLowerCase();
const category=categoryFilter.value;

const filtered=products.filter(product=>{

const matchSearch=product.title
.toLowerCase()
.includes(text);

const matchCategory=
category==="all" ||
product.category===category;

return matchSearch && matchCategory;

});

renderProducts(filtered);

}

function addToCart(id){

const product=products.find(
item=>item.id===id
);

const existing=cart.find(
item=>item.id===id
);

if(existing){
existing.quantity++;
}else{
cart.push({...product,quantity:1});
}

updateCart();
}

function updateCart(){

cartItems.innerHTML="";

let total=0;
let count=0;

cart.forEach(item=>{

total+=usdToInr(item.price) * item.quantity;
count+=item.quantity;

const div=document.createElement("div");

div.classList.add("cart-item");

div.innerHTML=`
<h4>${item.title}</h4>

<p>
₹${usdToInr(item.price)}
x ${item.quantity}
</p>

<div class="qty-controls">

<button onclick="decreaseQty(${item.id})">
-
</button>

<button onclick="increaseQty(${item.id})">
+
</button>

<button onclick="removeItem(${item.id})">
Remove
</button>

</div>
`;

cartItems.appendChild(div);

});

cartTotal.textContent=total;
cartCount.textContent=count;

}

function increaseQty(id){

const item=cart.find(item=>item.id===id);

if(item){
item.quantity++;
}

updateCart();
}

function decreaseQty(id){

const item=cart.find(item=>item.id===id);

if(item.quantity>1){
item.quantity--;
}else{
cart=cart.filter(item=>item.id!==id);
}

updateCart();
}

function removeItem(id){

cart=cart.filter(item=>item.id!==id);

updateCart();
}

function openModal(id){

const product=products.find(
item=>item.id===id
);

modalContent.innerHTML=`
<button class="close-modal"
onclick="closeModal()">
✖
</button>

<img src="${product.image}">

<h2>${product.title}</h2>

<br>

<p>
<strong>Price:</strong>
₹${usdToInr(product.price)}
</p>

<p>
<strong>Category:</strong>
${product.category}
</p>

<p>
<strong>Rating:</strong>
⭐ ${product.rating.rate}
</p>

<br>

<p>${product.description}</p>
`;

overlay.classList.remove("hidden");
modal.classList.remove("hidden");

}

function closeModal(){

overlay.classList.add("hidden");
modal.classList.add("hidden");

}

function showLoader(){
loader.classList.remove("hidden");
}

function hideLoader(){
loader.classList.add("hidden");
}

function showError(message){
errorMessage.textContent=message;
}

searchInput.addEventListener(
"input",
filterProducts
);

categoryFilter.addEventListener(
"change",
filterProducts
);

cartBtn.addEventListener("click",()=>{

overlay.classList.remove("hidden");
cartSidebar.classList.add("active");

});

closeCart.addEventListener("click",()=>{

overlay.classList.add("hidden");
cartSidebar.classList.remove("active");

});

overlay.addEventListener("click",()=>{

closeModal();
cartSidebar.classList.remove("active");
overlay.classList.add("hidden");

});

fetchProducts();
