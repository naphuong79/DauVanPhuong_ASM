////////////////RENDER PRODUCTS///////////////////////////
function renderProducts (){
    fetch("http://localhost:5500/products")
    .then((response) => response.json())
    .then((products) => {
        var htmlPr = "";
        products.map(value => {
        htmlPr += `
        <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                        <div class="product__item">
                            <div class="product__item__pic set-bg">
                            <img src="img/product/${value.img}" alt="">
                                <span class="label">New</span>
                                <ul class="product__hover">
                                    <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                                    <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Compare</span></a></li>
                                    <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>${value.name}</h6>
                                <a onclick="addToCart(${value.id})" class="add-cart">+ Add To Cart</a>
                                <div class="rating">
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                </div>
                                <h5>$${value.price}</h5>
                                <div class="product__color__select">
                                    <label for="pc-1">
                                        <input type="radio" id="pc-1">
                                    </label>
                                    <label class="active black" for="pc-2">
                                        <input type="radio" id="pc-2">
                                    </label>
                                    <label class="grey" for="pc-3">
                                        <input type="radio" id="pc-3">
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        })
        document.getElementById("renderProduct").innerHTML = htmlPr;
    });
}


    
    

    ///////////////////////////CART///////////////////////////////////////////////

    let productInCart = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []

    function saveToLCS(){
        localStorage.setItem("products", JSON.stringify(productInCart));
    }

    function quantityItem(){
        document.getElementById("total").innerHTML = productInCart.length
    }


    function loadPage(){
        quantityItem();
        renderProducts ();
        renderItemCart()
    }

    function addToCart(id) {
        // console.log(id);
        fetch("http://localhost:5500/products")
        .then((response) => response.json())
        .then((products) => {
            let checkProduct = productInCart.some(value => value.id === id);
            // console.log(checkProduct);
            if(!checkProduct) {
            let product = products.find(value => value.id === id)
            console.log(product);
            productInCart.unshift({
                ...product,
                quantity: 1
            })
            saveToLCS()
            quantityItem()
            } else{
                let getIndex = productInCart.findIndex(value => value.id === id)
                let product = productInCart.find(value => value.id === id)
                productInCart[getIndex] = {
                    ...product,
                    quantity: ++product.quantity
                }
            saveToLCS()
            quantityItem()
            }
        })
    }

    function renderItemCart(){
        let htmlItemCart = "";
    productInCart.map((value, index) => {
        htmlItemCart += `<tr>
        <td class="product__cart__item">
            <div class="product__cart__item__pic">
                <img src="img/product/${value.img}" width="100px" alt="">
            </div>
            <div class="product__cart__item__text">
                <h6>${value.name}</h6>
                <h5>$${value.price}</h5>
            </div>
        </td>
        <td class="quantity__item">
            <div class="quantity mx-auto">
                <button onclick="decreaseItem(${index}, ${value.quantity})" class="btn btn-light">-</button>
                <span class="mx-1">${value.quantity}</span>
                <button onclick="increaseItem(${index})" class="btn btn-light">+</button>
            </div>
        </td>
        <td class="cart__price">$${(value.quantity * value.price)}</td>
        <td class="cart__close">
            <button onclick="deleteItem(${index})"<i class="fa fa-close"></i></button>
        </td>
    </tr>`;
    });
    document.getElementById("renderItem").innerHTML = htmlItemCart;
    }

    
    /////////////////////Giảm Số Lượng SP//////////////
    function decreaseItem(index, quantity){
        // console.log(index);
        if (quantity > 1) {
                productInCart[index] = {
                ...productInCart[index],
                quantity: --productInCart[index].quantity   
                };
                saveToLCS();
                renderItemCart();
                quantityItem();
                }else{
                    alert("Sản phẩm đã đạt số lượng tối thiểu!")
                }
            } 


    /////////////////////Tăng Số Lượng SP//////////////
    function increaseItem(index){
        // console.log(index);
                productInCart[index] = {
                ...productInCart[index],
                quantity: ++productInCart[index].quantity   
                };
                saveToLCS();
                renderItemCart();
                quantityItem();
            } 
        

    /////////////////Xóa SP//////////////
    function deleteItem(index){
        productInCart.splice(index, 1)
        saveToLCS();
        renderItemCart();
        quantityItem();
    }


    
    // function totalMoney(){
    //     if (productInCart !== []) {
    //         let total = 0;
    //         for (let i = 0; i < productInCart.length; i++) {
    //             total += productInCart[i].quantity * productInCart[i].price
    //         }
    //         document.getElementById("total-money").innerHTML = total;
    //     }
    //     return `<li><span>{Total} $ ${total}</span></li>`
    // }















    