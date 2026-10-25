const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const messages = document.getElementById('chat-messages');

const API = 'https://www.themealdb.com/api/json/v1/1/';
const categoryMap = {
  'gà': 'Chicken', 'thịt gà': 'Chicken', 'chicken': 'Chicken',
  'bò': 'Beef', 'thịt bò': 'Beef', 'beef': 'Beef',
  'heo': 'Pork', 'thịt heo': 'Pork', 'pork': 'Pork',
  'hải sản': 'Seafood', 'seafood': 'Seafood',
  'món chay': 'Vegetarian', 'chay': 'Vegetarian', 'vegetarian': 'Vegetarian',
  'tráng miệng': 'Dessert', 'bánh ngọt': 'Dessert', 'dessert': 'Dessert',
  'mì ý': 'Pasta', 'mì': 'Pasta', 'pasta': 'Pasta',
  'khai vị': 'Starter', 'starter': 'Starter',
  'bữa sáng': 'Breakfast', 'breakfast': 'Breakfast',
  'cừu': 'Lamb', 'lamb': 'Lamb', 'cá': 'Fish', 'fish': 'Fish',
  'gà dê': 'Goat', 'dê': 'Goat', 'goat': 'Goat'
};
const ingredientMap = {
  'gà': 'chicken', 'thịt gà': 'chicken', 'chicken': 'chicken',
  'bò': 'beef', 'thịt bò': 'beef', 'beef': 'beef',
  'heo': 'pork', 'thịt heo': 'pork', 'pork': 'pork',
  'tôm': 'shrimp', 'shrimp': 'shrimp', 'cá hồi': 'salmon', 'salmon': 'salmon',
  'cá': 'fish', 'fish': 'fish', 'trứng': 'egg', 'egg': 'egg',
  'khoai tây': 'potato', 'potato': 'potato', 'cà chua': 'tomato', 'tomato': 'tomato',
  'nấm': 'mushrooms', 'mushroom': 'mushrooms', 'mushrooms': 'mushrooms',
  'gạo': 'rice', 'rice': 'rice', 'phô mai': 'cheese', 'cheese': 'cheese'
};

function addMessage(text, role) {
  const div = document.createElement('div');
  div.className = `chat-message ${role}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

async function getMeals(path) {
  const response = await fetch(API + path);
  if (!response.ok) throw new Error('Không gọi được API');
  const data = await response.json();
  return data.meals || [];
}

function showMealResults(meals) {
  const uniqueMeals = [...new Map(meals.map(meal => [meal.idMeal, meal])).values()].slice(0, 5);
  if (!uniqueMeals.length) {
    addMessage('Mình chưa tìm thấy món phù hợp. Bạn thử tên món bằng tiếng Anh hoặc nguyên liệu như thịt gà (chicken), thịt bò (beef), tôm (shrimp), cơm (rice) nhé.', 'bot');
    return;
  }
  addMessage(`Mình tìm được ${uniqueMeals.length} gợi ý cho bạn:`, 'bot');
  uniqueMeals.forEach(meal => {
    const card = document.createElement('div');
    card.className = 'chat-message bot';
    const link = document.createElement('a');
    link.className = 'inline-link';
    link.href = `detail.html?id=${encodeURIComponent(meal.idMeal)}`;
    link.textContent = `🍽️ ${window.FoodHouseLanguage?.mealName(meal.strMeal)||meal.strMeal} — Xem công thức`;
    card.appendChild(link);
    messages.appendChild(card);
  });
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) return;
  addMessage(query, 'user');
  input.value = '';
  const loading = addMessage('Đang tìm món ăn theo tên, danh mục hoặc nguyên liệu…', 'bot');
  try {
    let meals = await getMeals(`search.php?s=${encodeURIComponent(query)}`);
    if (!meals.length) {
      const normalized = query.toLocaleLowerCase('vi').trim();
      const categoryKey = Object.keys(categoryMap).find(key => normalized.includes(key));
      if (categoryKey) meals = await getMeals(`filter.php?c=${encodeURIComponent(categoryMap[categoryKey])}`);
    }
    if (!meals.length) {
      const normalized = query.toLocaleLowerCase('vi').trim();
      const ingredientKey = Object.keys(ingredientMap).find(key => normalized.includes(key));
      if (ingredientKey) meals = await getMeals(`filter.php?i=${encodeURIComponent(ingredientMap[ingredientKey])}`);
    }
    loading.remove();
    showMealResults(meals);
  } catch (error) {
    console.error(error);
    loading.textContent = 'Mình chưa kết nối được với TheMealDB. Bạn kiểm tra Internet rồi thử lại nhé.';
  }
});
