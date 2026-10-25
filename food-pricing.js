/* Giá bán do Food House quản lý riêng; không lấy giá từ TheMealDB. */
(function () {
  const OVERRIDE_KEY = 'foodHousePriceOverrides';
  const DEFAULT_PRICE = 50000;
  const NAME_DEFAULTS = {
    'pizza hai san': 129000, 'pizza hải sản': 129000,
    'burger bo': 69000, 'burger bò': 69000,
    'salad tuoi': 49000, 'salad tươi': 49000,
    'mi y': 89000, 'mì ý': 89000
  };
  const CATEGORY_DEFAULTS = {
    seafood: 129000, beef: 69000, chicken: 79000,
    pasta: 89000, vegetarian: 49000, dessert: 45000,
    starter: 49000, side: 39000, breakfast: 59000
  };
  const format = value => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(value) + 'đ';
  const norm = value => String(value || '').trim().toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  function readOverrides() {
    try { const value = JSON.parse(localStorage.getItem(OVERRIDE_KEY) || '{}'); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
    catch { return {}; }
  }
  function getPrice(item = {}) {
    const overrides = readOverrides();
    const id = String(item.id || item.idMeal || '');
    const name = String(item.name || item.strMeal || '');
    if (id && Number.isFinite(Number(overrides['id:' + id]))) return Number(overrides['id:' + id]);
    const key = norm(name);
    if (key && Number.isFinite(Number(overrides['name:' + key]))) return Number(overrides['name:' + key]);
    if (key && Number.isFinite(Number(NAME_DEFAULTS[key]))) return NAME_DEFAULTS[key];
    const category = norm(item.category || item.strCategory || '');
    const categoryKey = Object.keys(CATEGORY_DEFAULTS).find(k => norm(k) === category);
    return categoryKey ? CATEGORY_DEFAULTS[categoryKey] : DEFAULT_PRICE;
  }
  function setPrice(item, price) {
    const amount = Number(price);
    if (!item || !Number.isFinite(amount) || amount < 1000 || amount > 100000000 || !Number.isInteger(amount)) throw new Error('Giá phải là số nguyên từ 1.000đ đến 100.000.000đ.');
    const overrides = readOverrides();
    const id = String(item.id || item.idMeal || '');
    const name = norm(item.name || item.strMeal || '');
    if (id) overrides['id:' + id] = amount;
    if (name) overrides['name:' + name] = amount;
    localStorage.setItem(OVERRIDE_KEY, JSON.stringify(overrides));
    return amount;
  }
  function removePrice(item) {
    const overrides = readOverrides();
    const id = String(item?.id || item?.idMeal || '');
    const name = norm(item?.name || item?.strMeal || '');
    if (id) delete overrides['id:' + id];
    if (name) delete overrides['name:' + name];
    localStorage.setItem(OVERRIDE_KEY, JSON.stringify(overrides));
  }
  window.FoodHousePricing = { getPrice, setPrice, removePrice, format, readOverrides, defaultPrice: DEFAULT_PRICE, categoryDefaults: CATEGORY_DEFAULTS };
})();
