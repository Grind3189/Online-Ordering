import { menuArray } from '/data.js'
const menuSection = document.getElementById('menu-section')
const cartSection = document.getElementById('cart-section-container')
const totalPrice = document.getElementById('total-price')
const paymentForm = document.getElementById('payment-form')
const lastSection = document.getElementById('last-section')
let cartHtml = []
let cart = []

document.addEventListener('click', function(e){
    if(e.target.dataset.atc) {
        renderCart(e.target.dataset.atc)
    } if (e.target.dataset.remove) {
        removeCart(e.target.dataset.remove)
    } if (e.target.id === "order-btn"){
        document.getElementById('pop-up-section').style.display = 'flex'
    }if (e.target.id === "btn-close"){
        document.getElementById('pop-up-section').style.display = 'none'
    } if(e.target.id === "btn-pay") {
        renderMessage()
    }
})

function getMenuList() {
    let menuHTML = ``
    menuArray.forEach(function(menu){
        menuHTML += `
            <div class="menu-details">
                <img src="${menu.logo}">
                    <div>
                        <h2 class="menu-name">${menu.name}</h2>
                        <p class="ingredients">${menu.ingredients}</p>
                        <p class="price">$${menu.price}</p>
                    </div class="product-details">
                        <button data-atc="${menu.id}">+</button>
            </div>`
    })
   menuSection.innerHTML = menuHTML
}

function renderCart(orderId){
    let cartHtml = ``
    let total = 0
    
    menuArray.forEach(function(menu){
        if (menu.id == orderId){
            cart.push(menu)
        }
    })
    
    if (cart.length > 0){
        document.getElementById('cart-section').classList.remove('hide')
    }
    
    cart.forEach(function(item){
         cartHtml += `
            <div class="cart-section">
                    <h2>${item.name}</h2>
                    <button class="remove-btn" data-remove="${item.id}">remove</button>
                    <p>$${item.price}</p>
            </div>`
         total += item.price
    })
    totalPrice.innerHTML = ("$" + total)
    cartSection.innerHTML = cartHtml
}

function removeCart(orderId){
   for (let i = 0; i < cart.length; i++){
       if (cart[i].id == orderId) {
            cart.splice(i,1)
       }
   }
  if (cart.length === 0){
        document.getElementById('cart-section').classList.add('hide')
    }
   renderCart()
}

function renderMessage(){
    paymentForm.addEventListener('submit', function(e){
        e.preventDefault()
    })
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('fullName')
    document.getElementById('pop-up-section').style.display = 'none'
    document.getElementById('cart-section').classList.add('hide')
    lastSection.innerHTML = `
    <h2 class="ty-message">Thanks,${name}! Your order is on its way!</h2>`
}


getMenuList()