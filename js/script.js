class Product {
  constructor(id, name, price, image, isLiked = false) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.isLiked = isLiked;
  }
}

class ShoppingCartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.updateCart();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.updateCart();
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  displayCart() {
    const cardContainer = document.getElementById("list-products");
    cardContainer.innerHTML = "";

    this.items.forEach((item) => {
      const cardBody = document.createElement("div");
      cardBody.classList.add("card");

      cardBody.innerHTML = `
              <div class="card-body">
                <div class="card" style="width: 18rem">
                  <img src="${item.product.image}" class="card-img-top" alt="${
        item.product.name
      }" />
                  <div class="card-body">
                    <h5 class="card-title">${item.product.name}</h5>
                    <p class="card-text">This is a ${item.product.name}</p>
                    <h4 class="unit-price">${item.product.price} $</h4>
                    <div>
                      <i class="fas fa-plus-circle plus" id="plus"></i>
                      <span class="quantity">${item.quantity}</span>
                      <i class="fas fa-minus-circle minus" id="minus"></i>
                    </div>
                    <div>
                      <i class="fas fa-trash-alt delete" id="delete"></i>
                      <i class="fas fa-heart heart" style="color: ${
                        item.product.isLiked ? "red" : "black"
                      };"></i>
                    </div>
                  </div>
                </div>
              </div>
            `;

      cardBody
        .querySelector("#plus")
        .addEventListener("click", () => this.addItem(item.product));
      cardBody
        .querySelector("#minus")
        .addEventListener("click", () =>
          this.decreaseItemQuantity(item.product)
        );
      cardBody
        .querySelector("#delete")
        .addEventListener("click", () => this.removeItem(item.product.id));

      const heart = cardBody.querySelector(".heart");
      heart.addEventListener("click", () => {
        item.product.isLiked = !item.product.isLiked;
        heart.style.color = item.product.isLiked ? "red" : "black";
      });

      cardContainer.appendChild(cardBody);
    });

    const totalBody = document.querySelector(".total");
    totalBody.textContent = this.getTotalPrice();
  }

  decreaseItemQuantity(product) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
    } else if (existingItem) {
      this.removeItem(product.id);
    }
    this.updateCart();
  }

  updateCart() {
    this.displayCart();
  }
}

const product1 = new Product(1, "Basket", 100, "/assets/baskets.png");
const product2 = new Product(2, "Socks", 20, "/assets/socks.png");
const product3 = new Product(3, "Bag", 50, "/assets/bag.png");

const shoppingCart = new ShoppingCart();

shoppingCart.addItem(product1);
shoppingCart.addItem(product2);
shoppingCart.addItem(product3);

shoppingCart.displayCart();