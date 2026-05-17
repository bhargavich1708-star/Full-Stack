
const fruits = [
{
id:1,
name:"Apple",
category:"Fresh",
price:120,
image:"assets/apple.png"
},
{
id:2,
name:"Banana",
category:"Tropical",
price:60,
image:"assets/banana.png"
},
{
id:3,
name:"Orange",
category:"Citrus",
price:90,
image:"assets/orange.png"
},
{
id:4,
name:"Grapes",
category:"Fresh",
price:150,
image:"assets/grapes.png"
},
{
id:5,
name:"Watermelon",
category:"Tropical",
price:200,
image:"assets/watermelon.png"
},
{
id:6,
name:"Strawberry",
category:"Berry",
price:250,
image:"assets/strawberry.png"
},
{
id:7,
name:"Pineapple",
category:"Tropical",
price:180,
image:"assets/pineapple.png"
},
{
id:8,
name:"Kiwi",
category:"Fresh",
price:300,
image:"assets/kiwi.png"
},
{
id:9,
name:"Mango",
category:"Tropical",
price:140,
image:"assets/mango.png"
},
{
id:10,
name:"Blueberry",
category:"Berry",
price:350,
image:"assets/blueberry.png"
},
{
id:11,
name:"Papaya",
category:"Tropical",
price:170,
image:"assets/papaya.png"
},
{
id:12,
name:"Cherry",
category:"Berry",
price:280,
image:"assets/cherry.png"
},
];

const products=document.getElementById("products");
const searchInput=document.getElementById("searchInput");
const categoryFilter=document.getElementById("categoryFilter");

const cartSidebar=document.getElementById("cartSidebar");
const cartBtn=document.getElementById("cartBtn");
const closeCart=document.getElementById("closeCart");

const cartItems=document.getElementById("cartItems");
const totalPrice=document.getElementById("totalPrice");
const cartCount=document.getElementById("cartCount");

let cart=[];

function renderProducts(data){
products.innerHTML="";

data.forEach(fruit=>{
const card=document.createElement("div");
card.classList.add("card");

card.innerHTML=`
<img src="${fruit.image}" alt="${fruit.name}">

<div class="card-content">
<h3>${fruit.name}</h3>
<p>Category: ${fruit.category}</p>
<p>₹${fruit.price}</p>

<button onclick="addToCart(${fruit.id})">
Add To Cart
</button>
</div>
`;

products.appendChild(card);
});
}

function addToCart(id){
const fruit=fruits.find(item=>item.id===id);

const existing=cart.find(item=>item.id===id);

if(existing){
existing.quantity++;
}
else{
cart.push({...fruit,quantity:1});
}

updateCart();
}

function updateCart(){
cartItems.innerHTML="";

let total=0;
let count=0;

cart.forEach(item=>{
total+=item.price*item.quantity;
count+=item.quantity;

const div=document.createElement("div");

div.classList.add("cart-item");

div.innerHTML=`
<h4>${item.name}</h4>
<p>₹${item.price} x ${item.quantity}</p>

<div class="qty-controls">
<button onclick="decreaseQty(${item.id})">-</button>
<button onclick="increaseQty(${item.id})">+</button>
<button onclick="removeItem(${item.id})">Remove</button>
</div>
`;

cartItems.appendChild(div);
});

totalPrice.textContent=total;
cartCount.textContent=count;
}

function increaseQty(id){
const item=cart.find(item=>item.id===id);

if(item) item.quantity++;

updateCart();
}

function decreaseQty(id){
const item=cart.find(item=>item.id===id);

if(item.quantity>1){
item.quantity--;
}
else{
cart=cart.filter(item=>item.id!==id);
}

updateCart();
}

function removeItem(id){
cart=cart.filter(item=>item.id!==id);
updateCart();
}

searchInput.addEventListener("input",filterProducts);
categoryFilter.addEventListener("change",filterProducts);

function filterProducts(){
const text=searchInput.value.toLowerCase();
const category=categoryFilter.value;

const filtered=fruits.filter(fruit=>{
const matchName=fruit.name.toLowerCase().includes(text);

const matchCategory=category==="all" || fruit.category===category;

return matchName && matchCategory;
});

renderProducts(filtered);
}

cartBtn.addEventListener("click",()=>{
cartSidebar.classList.add("active");
});

closeCart.addEventListener("click",()=>{
cartSidebar.classList.remove("active");
});

renderProducts(fruits);
