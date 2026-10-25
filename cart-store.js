(function(){
  const KEY='foodHouseCart';
  function read(){try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v:[]}catch{return []}}
  function write(items){localStorage.setItem(KEY,JSON.stringify(items));}
  function add(meal){
    if(!meal||!meal.id) return;
    const items=read(), id=String(meal.id), found=items.find(x=>String(x.id)===id);
    const price=String(id).startsWith('custom-')?(Number(meal.price)||50000):(window.FoodHousePricing?.getPrice({id,name:meal.name,category:meal.category})||Number(meal.price)||50000);
    if(found){found.quantity=Math.min(99,(Number(found.quantity)||1)+1);found.price=price;found.name=String(meal.name||found.name);found.image=String(meal.image||found.image||'');found.category=String(meal.category||found.category||'');}
    else items.push({id,name:String(meal.name||'Món ăn'),image:String(meal.image||''),category:String(meal.category||''),price,quantity:1});
    write(items); alert('Đã thêm “'+(meal.name||'Món ăn')+'” vào giỏ hàng với giá '+(window.FoodHousePricing?.format(price)||price+'đ')+'.');
  }
  document.addEventListener('click',e=>{
    const btn=e.target.closest('[data-cart-add]'); if(!btn)return;
    add({id:btn.dataset.id,name:btn.dataset.name,image:btn.dataset.image,category:btn.dataset.category,price:btn.dataset.price});
  });
  window.FoodHouseCart={read,write,add,count(){return read().reduce((n,x)=>n+(Number(x.quantity)||0),0)}};
})();
