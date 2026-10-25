const msg = document.getElementById("detail-message");
const box = document.getElementById("food-detail");
const mealId = new URLSearchParams(location.search).get("id");

// Các nhãn do Food House tự hiển thị luôn bằng tiếng Việt.
const categoryVi = {
  Beef: "Thịt bò", Breakfast: "Món ăn sáng", Chicken: "Thịt gà",
  Dessert: "Món tráng miệng", Goat: "Thịt dê", Lamb: "Thịt cừu",
  Miscellaneous: "Món ăn khác", Pasta: "Mì Ý và món mì", Pork: "Thịt heo",
  Seafood: "Hải sản", Side: "Món ăn kèm", Starter: "Món khai vị",
  Vegan: "Món thuần chay", Vegetarian: "Món chay"
};
const areaVi = {
  American: "Mỹ", British: "Anh", Canadian: "Canada", Chinese: "Trung Quốc",
  Croatian: "Croatia", Dutch: "Hà Lan", Egyptian: "Ai Cập", Filipino: "Philippines",
  French: "Pháp", Greek: "Hy Lạp", Indian: "Ấn Độ", Irish: "Ireland",
  Italian: "Ý", Jamaican: "Jamaica", Japanese: "Nhật Bản", Kenyan: "Kenya",
  Malaysian: "Malaysia", Mexican: "Mexico", Moroccan: "Ma-rốc", Polish: "Ba Lan",
  Portuguese: "Bồ Đào Nha", Russian: "Nga", Spanish: "Tây Ban Nha",
  Thai: "Thái Lan", Tunisian: "Tunisia", Turkish: "Thổ Nhĩ Kỳ", Ukrainian: "Ukraina",
  Uruguayan: "Uruguay", Vietnamese: "Việt Nam"
};
const ingredientVi = {
  "allspice": "hạt tiêu Jamaica", "almond extract": "chiết xuất hạnh nhân",
  "almonds": "hạnh nhân", "apple cider vinegar": "giấm táo", "apples": "táo",
  "bacon": "thịt xông khói", "baking powder": "bột nở", "baking soda": "muối nở",
  "basil": "húng quế", "bay leaf": "lá nguyệt quế", "bay leaves": "lá nguyệt quế",
  "beans": "đậu", "beef": "thịt bò", "beef stock": "nước dùng bò",
  "bell pepper": "ớt chuông", "bell peppers": "ớt chuông", "breadcrumbs": "vụn bánh mì",
  "bread": "bánh mì", "brown sugar": "đường nâu", "butter": "bơ",
  "cabbage": "bắp cải", "carrot": "cà rốt", "carrots": "cà rốt",
  "cheddar cheese": "phô mai cheddar", "cheese": "phô mai", "chicken": "thịt gà",
  "chicken breast": "ức gà", "chicken broth": "nước dùng gà", "chicken stock": "nước dùng gà",
  "chilli": "ớt", "chili": "ớt", "chilli powder": "bột ớt", "chili powder": "bột ớt",
  "chives": "hẹ", "chocolate": "sô-cô-la", "cinnamon": "quế", "cloves": "đinh hương",
  "coconut cream": "kem dừa", "coconut milk": "nước cốt dừa", "coriander": "rau mùi",
  "corn": "ngô", "cornflour": "bột ngô", "cream": "kem tươi", "cumin": "thì là Ai Cập",
  "curry powder": "bột cà ri", "dark chocolate": "sô-cô-la đen", "dijon mustard": "mù tạt Dijon",
  "double cream": "kem béo", "egg": "trứng", "eggs": "trứng", "egg yolk": "lòng đỏ trứng",
  "egg yolks": "lòng đỏ trứng", "fish": "cá", "fish sauce": "nước mắm", "flour": "bột mì",
  "feta": "phô mai feta", "garlic": "tỏi", "garlic cloves": "tép tỏi", "ginger": "gừng",
  "ginger paste": "gừng xay", "green beans": "đậu que", "green pepper": "ớt chuông xanh",
  "ground beef": "thịt bò xay", "ground cumin": "bột thì là Ai Cập", "honey": "mật ong",
  "hot water": "nước nóng", "leek": "tỏi tây", "lemon": "chanh vàng", "lemon juice": "nước cốt chanh",
  "lime": "chanh xanh", "lime juice": "nước cốt chanh xanh", "mayonnaise": "sốt mayonnaise",
  "milk": "sữa", "mint": "bạc hà", "mozzarella": "phô mai mozzarella", "mushroom": "nấm",
  "mushrooms": "nấm", "mustard": "mù tạt", "noodles": "mì", "nutmeg": "nhục đậu khấu",
  "oil": "dầu ăn", "olive oil": "dầu ô liu", "onion": "hành tây", "onions": "hành tây",
  "orange juice": "nước cam", "oregano": "lá oregano", "paprika": "bột ớt paprika",
  "parsley": "mùi tây", "parmesan": "phô mai Parmesan", "pasta": "mì Ý", "peas": "đậu Hà Lan",
  "peanut butter": "bơ đậu phộng", "pepper": "tiêu", "potato": "khoai tây", "potatoes": "khoai tây",
  "prawns": "tôm", "prawn": "tôm", "rice": "gạo", "rice vinegar": "giấm gạo",
  "rosemary": "hương thảo", "salmon": "cá hồi", "salt": "muối", "sausages": "xúc xích",
  "sesame oil": "dầu mè", "sesame seeds": "mè", "shallots": "hành tím", "shrimp": "tôm",
  "soy sauce": "nước tương", "spinach": "rau bina", "spring onions": "hành lá",
  "stock": "nước dùng", "strawberries": "dâu tây", "sugar": "đường", "sweet potatoes": "khoai lang",
  "thyme": "xạ hương", "tomato": "cà chua", "tomatoes": "cà chua", "tomato paste": "tương cà cô đặc",
  "tomato puree": "cà chua nghiền", "vanilla extract": "chiết xuất vani", "vegetable oil": "dầu thực vật",
  "vegetable stock": "nước dùng rau củ", "vinegar": "giấm", "water": "nước", "white wine": "rượu vang trắng",
  "white wine vinegar": "giấm vang trắng", "yogurt": "sữa chua"
};
const unitVi = {
  tablespoon: "muỗng canh", tablespoons: "muỗng canh", tbsp: "muỗng canh",
  teaspoon: "muỗng cà phê", teaspoons: "muỗng cà phê", tsp: "muỗng cà phê",
  cup: "cốc", cups: "cốc", ounce: "ounce", ounces: "ounce", oz: "oz",
  pound: "pound", pounds: "pound", lb: "lb", lbs: "lb", gram: "g", grams: "g",
  kilogram: "kg", kilograms: "kg", kg: "kg", ml: "ml", litre: "lít", liter: "lít",
  cloves: "tép", clove: "tép", slices: "lát", slice: "lát", pieces: "miếng", piece: "miếng",
  pinch: "một nhúm", pinches: "một nhúm", handful: "một nắm", handfuls: "một nắm",
  large: "lớn", medium: "vừa", small: "nhỏ", fresh: "tươi", chopped: "đã băm", diced: "đã thái hạt lựu",
  grated: "đã bào", minced: "đã băm nhuyễn", optional: "tùy chọn", to: "để"
};

// Dịch văn bản tiếng Anh do API trả về. Nếu dịch vụ dịch không khả dụng,
// giữ nguyên bản gốc thay vì hiển thị bản dịch đoán sai.
async function translateToVietnamese(text) {
  const source = (text || "").trim();
  if (!source) return "Chưa có thông tin.";
  if (/[À-ỹ]/.test(source)) return source;
  try {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=" + encodeURIComponent(source);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Translation service unavailable");
    const data = await response.json();
    const translated = Array.isArray(data?.[0]) ? data[0].map(part => part?.[0] || "").join("").trim() : "";
    return translated || source;
  } catch (error) {
    console.warn("Không thể dịch nội dung từ API; dùng bản gốc.", error);
    return source;
  }
}

function translateIngredient(name) {
  const key = name.trim().toLowerCase();
  if (ingredientVi[key]) return ingredientVi[key];
  // Ghép bản dịch khi tên nguyên liệu có kèm mô tả phổ biến.
  const match = key.match(/^(.*?)\s*\((.*?)\)$/);
  if (match && ingredientVi[match[1]]) return `${ingredientVi[match[1]]} (${match[2]})`;
  return null;
}

function translateMeasure(measure) {
  return measure.replace(/\b(tablespoons?|tbsp|teaspoons?|tsp|cups?|ounces?|oz|pounds?|lbs?|lb|grams?|kilograms?|kg|ml|litres?|liters?|cloves?|slices?|pieces?|pinches?|handfuls?|large|medium|small|fresh|chopped|diced|grated|minced|optional)\b/gi,
    word => unitVi[word.toLowerCase()] || word);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function splitInstructions(text) {
  // Chia theo đoạn để tránh gửi một yêu cầu dịch quá dài.
  return text.split(/\n+/).map(s => s.trim()).filter(Boolean);
}

function getCustomFoods() {
  try {
    const foods = JSON.parse(localStorage.getItem("foodHouseCustomFoods") || "[]");
    return Array.isArray(foods) ? foods : [];
  } catch (error) {
    console.warn("Không đọc được danh sách món tự thêm.", error);
    return [];
  }
}

function renderCustomDetail(customId) {
  const food = getCustomFoods().find(item => String(item.id) === String(customId));
  if (!food) {
    msg.textContent = "Không tìm thấy món ăn tự thêm. Món có thể đã bị xóa hoặc được lưu trên trình duyệt khác.";
    return true;
  }
  const name = food.name || "Món ăn";
  const category = food.category || "Chưa phân loại";
  const price = Number(food.price) || 50000;
  const image = food.image || "";
  msg.textContent = "";
  box.innerHTML = `
    <article class="food-detail-card">
      <h1>${escapeHtml(name)}</h1>
      ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(name)}" loading="lazy">` : '<div class="food-placeholder" role="img" aria-label="Chưa có ảnh món ăn">🍽️</div>'}
      <p><b>Danh mục:</b> ${escapeHtml(category)}</p>
      <p><b>Xuất xứ:</b> Food House</p>
      <p class="food-price"><b>Giá bán Food House: ${window.FoodHousePricing?.format(price) || price + "đ"}/phần</b></p>
      <p class="notice">Giá do Food House tự thiết lập.</p>
      ${food.description ? `<h2>📝 Mô tả món ăn</h2><p>${escapeHtml(food.description)}</p>` : '<p>Chưa có mô tả cho món ăn này.</p>'}
      ${food.cookTime ? `<p><b>⏱️ Thời gian chế biến:</b> ${escapeHtml(food.cookTime)} phút</p>` : ''}
      ${food.servings ? `<p><b>🍽️ Khẩu phần:</b> ${escapeHtml(food.servings)} người</p>` : ''}
      <h2>🧂 Nguyên liệu</h2>
      ${Array.isArray(food.ingredients) && food.ingredients.length ? `<ul>${food.ingredients.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : '<p>Chưa có nguyên liệu được nhập cho món này.</p>'}
      <h2>👨‍🍳 Cách chế biến</h2>
      ${Array.isArray(food.instructions) && food.instructions.length ? `<ol>${food.instructions.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol>` : '<p>Chưa có cách chế biến được nhập cho món này.</p>'}
      <button class="btn" type="button" data-cart-add data-id="custom-${escapeHtml(food.id)}" data-name="${escapeHtml(name)}" data-category="${escapeHtml(category)}" data-image="${escapeHtml(image)}" data-price="${price}">🛒 Thêm vào giỏ hàng · ${window.FoodHousePricing?.format(price) || price + "đ"}</button>
    </article>`;
  return true;
}

async function loadDetail() {
  if (!mealId) {
    msg.textContent = "Không có mã món ăn. Hãy quay lại thực đơn.";
    return;
  }
  if (mealId.startsWith("custom-")) {
    renderCustomDetail(mealId.slice("custom-".length));
    return;
  }
  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + encodeURIComponent(mealId));
    if (!response.ok) throw new Error("Meal API request failed");
    const data = await response.json();
    const meal = data.meals?.[0];
    if (!meal) {
      msg.textContent = "Không tìm thấy món ăn. Vui lòng quay lại thực đơn và chọn món khác.";
      return;
    }

    msg.textContent = "Đang dịch tên món và hướng dẫn sang tiếng Việt…";
    const originalName = meal.strMeal || "Món ăn";
    const mealName = await translateToVietnamese(originalName);
    const category = categoryVi[meal.strCategory] || await translateToVietnamese(meal.strCategory || "Chưa rõ");
    const area = areaVi[meal.strArea] || await translateToVietnamese(meal.strArea || "Chưa rõ");

    const ingredients = [];
    for (let index = 1; index <= 20; index++) {
      const originalIngredient = (meal[`strIngredient${index}`] || "").trim();
      const originalMeasure = (meal[`strMeasure${index}`] || "").trim();
      if (!originalIngredient) continue;
      let ingredient = translateIngredient(originalIngredient);
      if (!ingredient) ingredient = await translateToVietnamese(originalIngredient);
      const measure = translateMeasure(originalMeasure);
      ingredients.push(`<li>${escapeHtml([measure, ingredient].filter(Boolean).join(" "))}</li>`);
    }

    const instructionParagraphs = splitInstructions(meal.strInstructions || "");
    const translatedParagraphs = [];
    for (const paragraph of instructionParagraphs) {
      translatedParagraphs.push(await translateToVietnamese(paragraph));
    }

    const salePrice = window.FoodHousePricing?.getPrice({id: meal.idMeal, name: originalName, category: meal.strCategory}) || 50000;
    msg.textContent = "";
    box.innerHTML = `
      <article class="food-detail-card">
        <h1>${escapeHtml(mealName)}</h1>
        <p class="original-name"><small>Tên gốc: ${escapeHtml(originalName)}</small></p>
        <img src="${escapeHtml(meal.strMealThumb || "")}" alt="${escapeHtml(mealName)}" loading="lazy">
        <p><b>Danh mục:</b> ${escapeHtml(category || "Chưa rõ")}</p>
        <p><b>Ẩm thực quốc gia:</b> ${escapeHtml(area || "Chưa rõ")}</p>
        <p class="food-price"><b>Giá bán Food House: ${window.FoodHousePricing?.format(salePrice) || salePrice + "đ"}/phần</b></p>
        <p class="notice">Giá do Food House tự thiết lập; không phải dữ liệu giá từ TheMealDB.</p>
        <button class="btn" type="button" data-cart-add data-id="${escapeHtml(meal.idMeal)}" data-name="${escapeHtml(mealName)}" data-category="${escapeHtml(meal.strCategory || "")}" data-image="${escapeHtml(meal.strMealThumb || "")}" data-price="${salePrice}">🛒 Thêm vào giỏ hàng · ${window.FoodHousePricing?.format(salePrice) || salePrice + "đ"}</button>
        <h2>🧂 Nguyên liệu</h2>
        <ul>${ingredients.join("") || "<li>Chưa có thông tin nguyên liệu.</li>"}</ul>
        <h2>👨‍🍳 Hướng dẫn nấu ăn</h2>
        <div class="instructions">${translatedParagraphs.length ? translatedParagraphs.map(p => `<p>${escapeHtml(p)}</p>`).join("") : "<p>Chưa có hướng dẫn nấu ăn.</p>"}</div>
        ${meal.strYoutube ? `<p style="margin-top:18px"><a class="inline-link" href="${escapeHtml(meal.strYoutube)}" target="_blank" rel="noopener noreferrer">Xem video hướng dẫn gốc</a></p>` : ""}
        <p class="notice">Bản dịch được tạo tự động để hỗ trợ đọc hiểu; tên riêng, thuật ngữ nấu ăn hoặc số đo có thể cần đối chiếu với công thức gốc.</p>
      </article>`;
  } catch (error) {
    console.error(error);
    msg.textContent = "Không tải được thông tin món ăn. Hãy kiểm tra kết nối Internet rồi thử lại.";
  }
}

loadDetail();
