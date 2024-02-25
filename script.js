let iconcart = document.querySelector('.icon-card');
let closrcart = document.querySelector(".close");
let ckecoytcart = document.querySelector(".ckeckout");
let listproduct = document.querySelector(".listproduct");
let body = document.querySelector('body');
 



iconcart.addEventListener('click',()=>{
   body.classList.toggle("showcart") 
})

closrcart.addEventListener("click",()=>{
   body.classList.toggle("showcart") 

})
let listproducts= [];
let AddTocart = () =>{
   listproduct.innerHTML = '';
   
   if(listproducts.length > 0){
      listproducts.forEach(product =>{

         let newproduct = document.createElement('div');
         newproduct.classList.add("items");
         newproduct.dataset.id= product.id;
         newproduct.innerHTML =
         `<img src="${product.img}" alt="" id="photo">
         <h2 >${product.Name}</h2 >
         <div class="pric" > $${product.Price} </div>
         <button class="addcart">Add TO Cart</button>`;
      listproduct.appendChild(newproduct);})
   }
   
}



listproduct.addEventListener("click",(even)=>{
   let thebutton = even.target;
   if(thebutton.classList.contains("addcart")){
      let product_id = thebutton.parentElement.dataset.id;
      addtoshoppinglist(product_id);
    // alert(product_id)
   }
})

let thelistcart = document.querySelector(".listcart");
// console.log(thelistcart);
let theiconspan = document.getElementById("total");
// console.log(theiconspan);

let carts =[]

let addtoshoppinglist = (product_id)=>{
   let productindex = carts.findIndex(value=> value.product_id == product_id);
//   if(carts.length <= 0){
//    carts =  [{
//       pid: product_id,
//       quntaty: 1
//        }] 
   if(productindex < 0) {
   carts.push({product_id: product_id,
      quntaty: 1})
  }else{
   carts[productindex].quntaty = carts[productindex].quntaty + 1;
  }
 // console.log(carts);
  addcarttohtml();
  addCarttolocalstorag();
}

 let addCarttolocalstorag = () => {
  localStorage.setItem('carts',JSON.stringify(carts));


}
const addcarttohtml = () => {
   thelistcart.innerHTML = '';  
   let totalQuantity = 0;
   if(carts.length > 0){
     carts.forEach(prouduct=>{
 
     totalQuantity= totalQuantity + prouduct.quntaty;
      let newcart = document.createElement('div');
      newcart.classList.add("item");
      newcart.dataset.id= prouduct.product_id;
      let prouductIndex = listproducts.findIndex( value => value.id == prouduct.product_id) ; 
      //console.log(prouductIndex)
      let info = listproducts[prouductIndex] ;
      //console.log(info);
       newcart.innerHTML= `
      <div class="img">
      <img src="${info.img}" alt="">
     </div>
  <div class="name">
      ${info.Name}
  </div>
  <div class="totalprice">
    $${info.Price * prouduct.quntaty}  </div>
  <div class='quantaty'>
      <span class="minus"><</span>
      <span>${prouduct.quntaty}</span>
      <span class="plus">></span>
  </div>`;
  thelistcart.appendChild(newcart);
   

     }) 
   }
   theiconspan.innerHTML = totalQuantity;
}

const changeQuantity =(product_id,type)=>{
   let itempositionincart = carts.findIndex((value)=>value.product_id == product_id);
   if(itempositionincart >= 0){
      switch(type){
         case 'plus':
            carts[itempositionincart].quntaty = carts[itempositionincart].quntaty + 1;
            break;
            default:
            let valuechange = carts[itempositionincart].quntaty -1;
            if(valuechange > 0){
               carts[itempositionincart].quntaty = valuechange  
            }else{
            carts.splice(itempositionincart,1)
            }

      }
   }
   addcarttohtml();
  addCarttolocalstorag();
 }

thelistcart.addEventListener("click" ,(even)=>{
   let positionclick = even.target;
   if(positionclick.classList.contains("minus") || positionclick.classList.contains("plus") ){
      let product_id =positionclick.parentElement.parentElement.dataset.id;
   //console.log(product_id);
   let type = "minus";
   if(positionclick.classList.contains("plus")){
      type = "plus";
   }

   changeQuantity(product_id,type);
}
  
})

 



const getData =()=>{
   fetch("productdata.json")
   .then(response => response.json())
   .then(data =>{
      listproducts = data;
      AddTocart();

      //get cart from memory
       if(localStorage.getItem('carts')){
         carts = JSON.parse(localStorage.getItem('carts'));
         addcarttohtml();
     }
      
   })
   .catch(error => console.error('Error fetching users:', error));


   
}
getData();


// creat genrator


function* generationArray() {
   let tips = [
      ` <h2>TALENTED CRAFTSMEN</h2>
      <p>
          Our manufacturing team consists of exceptional craftsmen who take care of
           the smallest of details while handcrafting your furniture. 
           They transform your vision into reality with their keen eye for perfection. 
           We also have a furniture designer who can guide you in the process of choosing 
           the right models and come up with a design that fits the measurement and 
           finishing that you are looking for.
          </p>`,
          `<h2>FAST & FREE SHIPPING</h2>
                     <p>
                       Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                       Rerum provident quae qui molestiae blanditiis exercitationem voluptatum tempore cumque asperiores error.
                        Fuga eligendi, 
                       officiis qui sint placeat cupiditate consequuntur illum asperiores.  
                         </p>`,
     `<h2>ECONOMICAL SOLUTIONS</h2>
     <p>
         The ‘Factory to Home’ approach that we follow, helps in cutting down designing expenses 
         by more than 30%. Our interior decor solutions cover everything 
         from furniture to handmade rugs, 
         home decor accessories to upholstery at highly competitive prices.
         </p>`,

         `<h2>EASY TO SHOP</h2>
         <p>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
           Rerum provident quae qui molestiae blanditiis exercitationem voluptatum tempore cumque asperiores error.
            Fuga eligendi, 
           officiis qui sint placeat cupiditate consequuntur illum asperiores.  
             </p>`,


         `<h2>CUSTOMIZED DESIGNS</h2>
         <p>
             We give you the chance to customize the design for your furniture 
             exactly the way you want. You can come to us with the designs
              that you like or you can choose a design from the wide range of 
              models that we provide online. We combine your preferences with the models you select to 
             create unique furnishings which add value to your property.  
             </p>`,
             `<h2>HASSLE FREE RETURNS</h2>
             <p>
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
               Rerum provident quae qui molestiae blanditiis exercitationem voluptatum tempore cumque asperiores error.
                Fuga eligendi, 
               officiis qui sint placeat cupiditate consequuntur illum asperiores.  
                 </p>`
                 

   ];

   for (let tip of tips) {
       yield tip;
   }
}

let tipGenerator = generationArray();
        let displayTipsElement = document.querySelector(".internaltext");
        let intervalId = setInterval(() => {
            let nextTip = tipGenerator.next();
            
            if (!nextTip.done) {
                displayTipsElement.innerHTML = nextTip.value;
            } else {
                clearInterval(intervalId);
            }
        }, 3000);


