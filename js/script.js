//array of product
let goods = [
  {
      images: "/assets/baskets.png",
      nameOfProduct: "Basket" ,
      price: 100 ,
      isLiked: false  ,
      quantity: 0,
  },
  {
      images: "/assets/socks.png",
      nameOfProduct: "Socks" ,
      price:  20,
      isLiked: false  ,
      quantity: 0,
  },
  
  {
      images: "/assets/bag.png",
      nameOfProduct:  "Bag" ,
      price:50  ,
      isLiked:  false ,
      quantity: 0,
  },
];
//container that apprend the data i'm working on
const cardContainer = document.getElementById("list-products");
//get the total div from html
const totalBody = document.querySelector (".total");
let sum = 0;

const updatePrice = () => {
  sum = goods.reduce(function (total, good) {
      return total+ good.price * good.quantity;
  }, 0);

  totalBody.textContent = sum;
};

const add = (good) => {
  good.quantity++;
  console.log("goods", good);
  cardContainer.innerHTML = "";
  updatePrice();
  updateUi();

};
const minus = (good) => {
  if(good.quantity > 0){
      good.quantity--;
      console.log("minus", good);
      updateUi();
      updatePrice();
  } else {
      console.log("Quantity is already 0, cannot minus futher", good)
  }
};

//function that upadte the Ui
function updateUi(){
  cardContainer.innerHTML = ""; // Clear the container before updating
  goods.forEach((good, index) => {
    const cardBody = document.createElement("div");
    cardBody.classList.add("card");
      
              cardBody.innerHTML = `
              <div class="card-body">
        <div class="card" style="width: 18rem">
          <img src="${good.images}" class="card-img-top" alt="${good.nameOfProduct}" />
          <div class="card-body">
            <h5 class="card-title">${good.nameOfProduct}</h5>
            <p class="card-text">This is a ${good.nameOfProduct}</p>
            <h4 class="unit-price">${good.price} $</h4>
            <div>
              <i class="fas fa-plus-circle plus" id="plus"></i>
              <span class="quantity">${good.quantity}</span>
              <i class="fas fa-minus-circle minus" id="minus"></i>
            </div>
            <div>
              <i class="fas fa-trash-alt delete" id="delete"></i>
              <i class="fas fa-heart heart" style="color: ${good.isLiked ? 'red' : 'black'};"></i>
            </div>
          </div>
        </div>
      </div>
              `;
      
                 // plus and minus bitton for each items mapped
                 cardBody.querySelector ("#plus").addEventListener("click", () => add(good)); //plus
    cardBody.querySelector ("#minus").addEventListener("click", () => minus(good)); //minus
    cardBody.querySelector ("#delete").addEventListener("click", () => remove(index)); //delete
      
    const heart = cardBody.querySelector (".heart");
    heart.addEventListener("click", () => {
      good.isLiked = !good.isLiked;
      heart.style.color = good.isLiked ? "red" : "black";
    });

    cardContainer.appendChild(cardBody);
  });
}

// Function to handle removing an item
const remove = (index) => {
  goods.splice(index, 1);
  updatePrice();
  updateUi();
};
  
//invoking the function of the update the Ui
updateUi();


