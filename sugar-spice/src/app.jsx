
// ─────────────────────────────────────────────────────────────────────────────
// GLOBALS from CDN
// ─────────────────────────────────────────────────────────────────────────────
const { useState, useEffect, useContext, createContext, useCallback, useRef } = React;
const {
  HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation
} = ReactRouterDOM;

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const CAKES = [
  {
    id: 'classic-chocolate',
    name: 'Classic Chocolate Dream',
    tagline: 'Rich layers of dark chocolate heaven',
    price: 250,
    description: 'Three layers of moist dark chocolate sponge, kissed with espresso and filled with your choice of cream. Our most-loved signature cake — perfect for any occasion.',
    variant: 'chocolate',
    availableCreamIds: ['chocolate', 'vanilla', 'whipped', 'pistachio', 'strawberry'],
    isPopular: true,
    category: 'chocolate',
  },
  {
    id: 'vanilla-cloud',
    name: 'Vanilla Cloud',
    tagline: 'Light, fragrant & impossibly soft',
    price: 230,
    description: 'A delicate vanilla bean sponge with hints of Madagascar vanilla. Featherlight layers that melt on your tongue — the elegant choice for every celebration.',
    variant: 'vanilla',
    availableCreamIds: ['vanilla', 'whipped', 'strawberry', 'pistachio'],
    isPopular: false,
    category: 'vanilla',
  },
  {
    id: 'red-velvet-romance',
    name: 'Red Velvet Romance',
    tagline: 'A deep crimson declaration of love',
    price: 280,
    description: 'Velvety crimson layers with a subtle cocoa undertone, layered with cool cream. The most dramatic cake in our collection — ideal for love letters and celebrations.',
    variant: 'red_velvet',
    availableCreamIds: ['vanilla', 'whipped', 'chocolate', 'strawberry'],
    isPopular: true,
    category: 'chocolate',
  },
  {
    id: 'lemon-zest',
    name: 'Lemon Zest Sunshine',
    tagline: 'Bright, citrusy & irresistibly tangy',
    price: 240,
    description: 'Golden lemon sponge layers bursting with fresh zest and citrus syrup. A burst of sunshine in every bite — the perfect summer gift.',
    variant: 'lemon',
    availableCreamIds: ['vanilla', 'whipped', 'strawberry'],
    isPopular: false,
    category: 'fruit',
  },
  {
    id: 'pistachio-garden',
    name: 'Pistachio Garden',
    tagline: 'Nutty, earthy & elegantly green',
    price: 270,
    description: 'Pale green pistachio layers with crushed pistachio praline throughout. Rich, nutty and beautifully balanced — a sophisticated choice for the adventurous palate.',
    variant: 'pistachio',
    availableCreamIds: ['pistachio', 'vanilla', 'whipped', 'chocolate'],
    isPopular: false,
    category: 'nut',
  },
  {
    id: 'strawberry-fields',
    name: 'Strawberry Fields',
    tagline: 'Fresh berries, every single layer',
    price: 260,
    description: 'Vanilla sponge layered with fresh strawberry compote and light cream. Made with seasonal Israeli strawberries — a fruity, joyful gift for any occasion.',
    variant: 'strawberry',
    availableCreamIds: ['strawberry', 'vanilla', 'whipped'],
    isPopular: true,
    category: 'fruit',
  },
];

const CREAM_OPTIONS = [
  { id: 'chocolate',  label: 'Chocolate',    emoji: '🍫', dotColor: '#7C4A2A' },
  { id: 'vanilla',    label: 'Vanilla Bean',  emoji: '✨', dotColor: '#E8D09A' },
  { id: 'whipped',    label: 'Whipped Cream', emoji: '☁️', dotColor: '#F0ECE8' },
  { id: 'pistachio',  label: 'Pistachio',     emoji: '🌿', dotColor: '#7CA87A' },
  { id: 'strawberry', label: 'Strawberry',    emoji: '🍓', dotColor: '#F07090' },
];

const CONTACTS = [
  { id: 'c1', name: 'Maya Cohen',     initials: 'MC', color: '#E8709A', address: '42 Rothschild Blvd, Tel Aviv' },
  { id: 'c2', name: 'Lior Ben-David', initials: 'LB', color: '#8B6BD4', address: '15 Dizengoff St, Tel Aviv' },
  { id: 'c3', name: 'Yael Katz',      initials: 'YK', color: '#F0B840', address: '8 King George, Jerusalem' },
  { id: 'c4', name: 'Noa Shapiro',    initials: 'NS', color: '#48B07A', address: '3 HaYarkon St, Herzliya' },
];

const SAVED_CARDS = [
  { id: 'card1', last4: '7892', brand: 'Visa',       expiry: '09/27', icon: '💳' },
  { id: 'card2', last4: '1234', brand: 'Mastercard', expiry: '03/26', icon: '💳' },
];

const CAKE_COLORS = {
  chocolate:  { dark: '#3D1F0D', mid: '#6B3520', light: '#9A5535', surface: '#B06040' },
  vanilla:    { dark: '#C8A060', mid: '#D8B870', light: '#EAD090', surface: '#F5E8C0' },
  red_velvet: { dark: '#6B1010', mid: '#8C1A1A', light: '#B03535', surface: '#CC4848' },
  lemon:      { dark: '#A89008', mid: '#C8AC18', light: '#E0C828', surface: '#F5E040' },
  pistachio:  { dark: '#3A5A3A', mid: '#507250', light: '#6A9068', surface: '#85AA82' },
  strawberry: { dark: '#8B2040', mid: '#B03555', light: '#CC5070', surface: '#E07090' },
};

const CREAM_COLORS = {
  chocolate:  { fill: '#5C3010', mid: '#8B5535', highlight: '#B07850', border: '#3D200A' },
  vanilla:    { fill: '#E8D0A0', mid: '#F0DDB0', highlight: '#FAF3E0', border: '#C8B080' },
  whipped:    { fill: '#F5EEE8', mid: '#FAF6F2', highlight: '#FFFFFF',  border: '#E0D8D0' },
  pistachio:  { fill: '#7CA878', mid: '#9DC89A', highlight: '#BEDFBA', border: '#5A8A56' },
  strawberry: { fill: '#F07088', mid: '#F898A8', highlight: '#FFBBC8', border: '#D05068' },
  other:      { fill: '#C4AFEA', mid: '#D8CCFF', highlight: '#EDE6FF', border: '#A090CC' },
};

const CATEGORIES = [
  { id: 'all',       label: 'All Cakes' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'vanilla',   label: 'Vanilla' },
  { id: 'fruit',     label: 'Fruit' },
  { id: 'nut',       label: 'Nutty' },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
const CartCtx      = createContext(null);
const CheckoutCtx  = createContext(null);
const ToastCtx     = createContext(null);

function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, [key, val]);
  return [val, setVal];
}

function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('ss_cart', []);

  const addItem = useCallback((newItem) => {
    setItems(prev => {
      // If exact same cake+cream, increment quantity
      const idx = prev.findIndex(i =>
        i.cakeId === newItem.cakeId && i.selectedCream === newItem.selectedCream
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + newItem.quantity };
        return next;
      }
      return [...prev, { ...newItem, id: Date.now().toString() }];
    });
  }, [setItems]);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, [setItems]);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  }, [setItems]);

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = subtotal >= 400 ? 0 : 30;
  const total = subtotal + deliveryFee;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartCtx.Provider value={{ items, addItem, removeItem, updateQty, clearCart, subtotal, deliveryFee, total, itemCount }}>
      {children}
    </CartCtx.Provider>
  );
}

function useCart() { return useContext(CartCtx); }

function CheckoutProvider({ children }) {
  const [state, setState] = useState({
    step: 1,
    delivery: { recipientId: null, date: null, time: null },
    payment: { savedCardId: 'card1' },
  });
  const update = (patch) => setState(prev => ({ ...prev, ...patch }));
  const updateDelivery = (patch) => setState(prev => ({ ...prev, delivery: { ...prev.delivery, ...patch } }));
  const updatePayment  = (patch) => setState(prev => ({ ...prev, payment:  { ...prev.payment,  ...patch } }));
  const reset = () => setState({ step: 1, delivery: { recipientId: null, date: null, time: null }, payment: { savedCardId: 'card1' } });
  return (
    <CheckoutCtx.Provider value={{ ...state, update, updateDelivery, updatePayment, reset }}>
      {children}
    </CheckoutCtx.Provider>
  );
}
function useCheckout() { return useContext(CheckoutCtx); }

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, icon = '✓') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800);
  }, []);
  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <span className="toast__icon">{t.icon}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
function useToast() { return useContext(ToastCtx); }

// ─────────────────────────────────────────────────────────────────────────────
// CAKE ILLUSTRATION SVG
// ─────────────────────────────────────────────────────────────────────────────
function CakeIllustration({ variant = 'chocolate', creamType = 'whipped', size = 'md' }) {
  const cake  = CAKE_COLORS[variant]  || CAKE_COLORS.chocolate;
  const cream = CREAM_COLORS[creamType] || CREAM_COLORS.whipped;

  const dims = { sm: [140, 168], md: [200, 240], lg: [260, 312] };
  const [w, h] = dims[size] || dims.md;

  // sprinkle positions (deterministic)
  const sprinkles = [
    { x: 52,  y: 180, r: 3.2, c: '#F7A8C4' },
    { x: 82,  y: 168, r: 2.4, c: '#9B7FD4' },
    { x: 118, y: 175, r: 3.0, c: '#F0B840' },
    { x: 148, y: 170, r: 2.4, c: '#7EC8A0' },
    { x: 65,  y: 122, r: 2.4, c: '#F7A8C4' },
    { x: 134, y: 118, r: 2.8, c: '#F0B840' },
    { x: 105, y: 128, r: 2.0, c: '#9B7FD4' },
    { x: 70,  y: 74,  r: 2.2, c: '#F0B840', rot: -20 },
    { x: 132, y: 68,  r: 2.4, c: '#F7A8C4', rot: 15 },
    { x: 94,  y: 80,  r: 2.0, c: '#9B7FD4', rot: -8 },
  ];

  return (
    <svg viewBox="0 0 200 230" style={{ width: w, height: h }} className={`cake-svg cake-svg--${size}`}>
      {/* Drop shadow */}
      <ellipse cx="100" cy="224" rx="82" ry="8" fill="rgba(28,17,24,0.07)" />

      {/* Plate */}
      <ellipse cx="100" cy="216" rx="90" ry="13" fill="#EEE4EE" />
      <ellipse cx="100" cy="213" rx="87" ry="10" fill="#F8F0F8" />

      {/* ── LAYER 3 (bottom) ── */}
      <rect x="12" y="157" width="176" height="52" rx="13" fill={cake.dark} />
      <ellipse cx="100" cy="157" rx="88" ry="11" fill={cake.light} />
      {/* Side texture line */}
      <line x1="12" y1="175" x2="188" y2="175" stroke={cake.mid} strokeWidth="1.5" opacity="0.4" />

      {/* Cream 1 */}
      <ellipse cx="100" cy="149" rx="86" ry="9"  fill={cream.fill} />
      <ellipse cx="100" cy="145" rx="83" ry="6.5" fill={cream.highlight} />

      {/* ── LAYER 2 (middle) ── */}
      <rect x="22" y="101" width="156" height="48" rx="13" fill={cake.dark} />
      <ellipse cx="100" cy="101" rx="78" ry="10" fill={cake.light} />
      <line x1="22" y1="118" x2="178" y2="118" stroke={cake.mid} strokeWidth="1.5" opacity="0.4" />

      {/* Cream 2 */}
      <ellipse cx="100" cy="93"  rx="76" ry="8.5" fill={cream.fill} />
      <ellipse cx="100" cy="89"  rx="73" ry="6"   fill={cream.highlight} />

      {/* ── LAYER 1 (top) ── */}
      <rect x="34" y="49" width="132" height="46" rx="13" fill={cake.dark} />
      <ellipse cx="100" cy="49" rx="66" ry="9" fill={cake.light} />
      <line x1="34" y1="66" x2="166" y2="66" stroke={cake.mid} strokeWidth="1.5" opacity="0.4" />

      {/* ── CREAM TOP SWIRLS ── */}
      {/* Back swirls */}
      <ellipse cx="65"  cy="40" rx="13" ry="11" fill={cream.mid} />
      <ellipse cx="135" cy="40" rx="13" ry="11" fill={cream.mid} />
      {/* Front center swirl */}
      <ellipse cx="78"  cy="35" rx="16" ry="13" fill={cream.fill} />
      <ellipse cx="100" cy="29" rx="18" ry="15" fill={cream.fill} />
      <ellipse cx="122" cy="35" rx="16" ry="13" fill={cream.fill} />
      {/* Highlights */}
      <ellipse cx="78"  cy="30" rx="9"  ry="7"  fill={cream.highlight} />
      <ellipse cx="100" cy="22" rx="11" ry="8"  fill={cream.highlight} />
      <ellipse cx="122" cy="30" rx="9"  ry="7"  fill={cream.highlight} />
      {/* Tiny peak dot */}
      <circle cx="100" cy="17" r="4" fill={cream.highlight} />

      {/* ── CANDLE ── */}
      <rect x="94" y="6" width="7" height="20" rx="3.5" fill="#F7A8C4" />
      <rect x="94" y="6" width="7" height="6"  rx="3"   fill="#E05885" opacity="0.5"/>
      {/* Flame */}
      <ellipse cx="97.5" cy="4" rx="3.5" ry="5" fill="#F0B840" />
      <ellipse cx="97.5" cy="3" rx="2"   ry="3" fill="#FFF0A0" />

      {/* ── SPRINKLES ── */}
      {sprinkles.map((s, i) =>
        s.rot
          ? <rect key={i} x={s.x - 2.5} y={s.y - 1.5} width="5" height="3" rx="1.5"
              fill={s.c} transform={`rotate(${s.rot} ${s.x} ${s.y})`} />
          : <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.c} />
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
function NavBar() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const prevCount = useRef(itemCount);
  const [badgeKey, setBadgeKey] = useState(0);

  useEffect(() => {
    if (itemCount !== prevCount.current) {
      setBadgeKey(k => k + 1);
      prevCount.current = itemCount;
    }
  }, [itemCount]);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <div className="navbar__logo-icon">🎂</div>
        <span>Sugar & Spice</span>
      </Link>
      <div className="navbar__actions">
        <button className="navbar__cart-btn" onClick={() => navigate('/cart')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {itemCount > 0 && <span key={badgeKey} className="cart-badge">{itemCount}</span>}
        </button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
function HomePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? CAKES
    : CAKES.filter(c => c.category === activeCategory);

  return (
    <div className="page page-fade">
      <div className="page-inner">
        {/* Hero */}
        <div className="hero">
          <div className="hero__eyebrow">
            🎁 Free delivery on orders over ₪400
          </div>
          <h1 className="hero__title">
            Send love,<br />
            one <em>perfect cake</em> at a time
          </h1>
          <p className="hero__subtitle">
            Personalized cakes crafted to order. Choose your flavors, write your message, and we'll deliver the sweetest surprise.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary btn--lg" onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}>
              Browse Cakes ↓
            </button>
            <button className="btn btn--ghost btn--lg" onClick={() => navigate('/cart')}>
              My Order
            </button>
          </div>
        </div>

        {/* Catalog */}
        <div id="catalog">
          <div className="filter-bar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`filter-pill${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="cake-grid">
            {filtered.map(cake => (
              <div key={cake.id} className="cake-card" onClick={() => navigate(`/cake/${cake.id}`)}>
                <div className="cake-card__visual">
                  <CakeIllustration variant={cake.variant} creamType="whipped" size="md" />
                  <span className="cake-card__badge">{CATEGORIES.find(c => c.id === cake.category)?.label || cake.category}</span>
                  {cake.isPopular && <span className="cake-card__popular">★ Popular</span>}
                </div>
                <div className="cake-card__body">
                  <div className="cake-card__name">{cake.name}</div>
                  <div className="cake-card__tagline">{cake.tagline}</div>
                  <div className="cake-card__footer">
                    <div className="cake-card__price">
                      ₪{cake.price} <span>/ cake</span>
                    </div>
                    <button className="btn btn--primary btn--sm">Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAKE PRODUCT PAGE
// ─────────────────────────────────────────────────────────────────────────────
function CakeProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { show: showToast } = useToast();

  const cake = CAKES.find(c => c.id === id);

  const [selectedCream, setSelectedCream] = useState(
    cake ? cake.availableCreamIds[0] : 'whipped'
  );
  const [message, setMessage] = useState('');
  const [note, setNote] = useState('');
  const [qty, setQty] = useState(1);

  if (!cake) {
    return (
      <div className="page page-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="text-center">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎂</div>
          <p className="text-muted">Cake not found.</p>
          <button className="btn btn--primary" style={{ marginTop: 16 }} onClick={() => navigate('/')}>Back to catalog</button>
        </div>
      </div>
    );
  }

  const availableCreams = CREAM_OPTIONS.filter(c => cake.availableCreamIds.includes(c.id));
  const selectedCreamOption = CREAM_OPTIONS.find(c => c.id === selectedCream);

  const handleAddToCart = () => {
    addItem({
      cakeId: cake.id,
      cakeName: cake.name,
      price: cake.price,
      quantity: qty,
      selectedCream,
      creamLabel: selectedCreamOption?.label || selectedCream,
      message,
      note,
      variant: cake.variant,
    });
    showToast(`${cake.name} added to your order!`, '🎂');
  };

  return (
    <div className="product-page page-fade">
      <div className="product-layout">
        {/* Left: Visual */}
        <div className="product-visual">
          <CakeIllustration
            variant={cake.variant}
            creamType={selectedCream}
            size="lg"
          />
          <div className="product-visual__hint">
            ↑ Cream preview updates in real-time
          </div>
        </div>

        {/* Right: Customizer */}
        <div className="product-panel">
          <button className="product-panel__back" onClick={() => navigate('/')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            All Cakes
          </button>

          <h1 className="product-panel__name">{cake.name}</h1>
          <div className="product-panel__price">₪{cake.price}</div>
          <p className="product-panel__desc">{cake.description}</p>

          {/* Cream Selector */}
          <div className="field-group">
            <div className="section-label">Choose your cream</div>
            <div className="cream-grid">
              {availableCreams.map(opt => (
                <button
                  key={opt.id}
                  className={`cream-pill${selectedCream === opt.id ? ' selected' : ''}`}
                  onClick={() => setSelectedCream(opt.id)}
                >
                  <span
                    className="cream-pill__dot"
                    style={{ background: opt.dotColor, borderColor: selectedCream === opt.id ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.12)' }}
                  />
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="field-group">
            <div className="field-label">
              Add a message to the cake
              <span>{message.length}/80</span>
            </div>
            <textarea
              className="field-input"
              placeholder="e.g. Happy Birthday Maya! 🎉"
              maxLength={80}
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={2}
            />
          </div>

          {/* Note */}
          <div className="field-group">
            <div className="field-label">Special note for the baker</div>
            <textarea
              className="field-input"
              placeholder="e.g. No nuts, extra cream on top…"
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={2}
            />
          </div>

          {/* Quantity */}
          <div className="quantity-row">
            <span className="qty-label">Quantity</span>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="qty-value">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <span className="text-muted" style={{ fontSize: 14 }}>
              Total: ₪{cake.price * qty}
            </span>
          </div>

          {/* Add to cart */}
          <div className="add-to-cart-bar">
            <button className="btn btn--primary btn--lg" onClick={handleAddToCart}>
              🛒 Add to Order — ₪{cake.price * qty}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CART PAGE
// ─────────────────────────────────────────────────────────────────────────────
function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQty, subtotal, deliveryFee, total, itemCount } = useCart();
  const { show: showToast } = useToast();

  if (items.length === 0) {
    return (
      <div className="page page-fade">
        <div className="page-inner">
          <div className="cart-empty">
            <div className="cart-empty__icon">🎂</div>
            <div className="cart-empty__title">Your cart is empty</div>
            <div className="cart-empty__desc">Time to pick something delicious for someone special.</div>
            <button className="btn btn--primary btn--lg" onClick={() => navigate('/')}>Browse Cakes</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-fade">
      <div className="page-inner">
        <div className="cart-layout">
          {/* Items */}
          <div>
            <h1 className="section-title">Your Order</h1>

            {/* Promo banner */}
            {subtotal < 400 && (
              <div className="promo-banner">
                <span className="promo-banner__icon">🚚</span>
                <span className="promo-banner__text">
                  Add ₪{400 - subtotal} more for free delivery!
                </span>
              </div>
            )}
            {subtotal >= 400 && (
              <div className="promo-banner">
                <span className="promo-banner__icon">🎉</span>
                <span className="promo-banner__text">You unlocked free delivery!</span>
              </div>
            )}

            {items.map(item => {
              const cake = CAKES.find(c => c.id === item.cakeId);
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__thumb">
                    <CakeIllustration
                      variant={cake?.variant || 'chocolate'}
                      creamType={item.selectedCream}
                      size="sm"
                    />
                  </div>
                  <div className="cart-item__body">
                    <div className="cart-item__name">{item.cakeName}</div>
                    <div className="cart-item__detail">
                      {item.creamLabel} cream
                      {item.message ? ` · "${item.message.slice(0, 28)}${item.message.length > 28 ? '…' : ''}"` : ''}
                    </div>
                    <div className="cart-item__actions">
                      <div className="qty-control">
                        <button className="qty-btn" style={{ fontSize: 16 }} onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                        <span className="qty-value" style={{ fontSize: 14 }}>{item.quantity}</span>
                        <button className="qty-btn" style={{ fontSize: 16 }} onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button
                        className="cart-item__remove"
                        onClick={() => { removeItem(item.id); showToast('Item removed', '🗑️'); }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-item__price">₪{item.price * item.quantity}</div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <div className="cart-summary__title">Order Summary</div>
            <div className="summary-row">
              <span>{itemCount} {itemCount === 1 ? 'cake' : 'cakes'}</span>
              <span>₪{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? '🎉 Free' : `₪${deliveryFee}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span className="value">₪{total}</span>
            </div>
            <div style={{ marginTop: 18 }}>
              <button
                className="btn btn--primary btn--lg"
                style={{ width: '100%' }}
                onClick={() => navigate('/checkout/delivery')}
              >
                Checkout →
              </button>
              <button
                className="btn btn--ghost"
                style={{ width: '100%', marginTop: 8 }}
                onClick={() => navigate('/')}
              >
                Add more cakes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CALENDAR PICKER
// ─────────────────────────────────────────────────────────────────────────────
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function CalendarPicker({ value, onChange }) {
  const today = new Date();
  const [viewYear, setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDow    = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isPast = (d) => new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isToday = (d) => viewYear === today.getFullYear() && viewMonth === today.getMonth() && d === today.getDate();
  const isSelected = (d) => value === `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

  return (
    <div className="calendar">
      <div className="calendar__nav">
        <button className="calendar__nav-btn" onClick={prevMonth}>‹</button>
        <span className="calendar__month">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button className="calendar__nav-btn" onClick={nextMonth}>›</button>
      </div>
      <div className="calendar__grid">
        {DOW.map(d => <div key={d} className="calendar__dow">{d}</div>)}
        {cells.map((d, i) => {
          if (d === null) return <div key={`e${i}`} className="calendar__day empty" />;
          const past = isPast(d), today_ = isToday(d), sel = isSelected(d);
          const cls = ['calendar__day', past && 'disabled', today_ && !sel && 'today', sel && 'selected'].filter(Boolean).join(' ');
          return (
            <div
              key={d}
              className={cls}
              onClick={() => !past && onChange(`${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`)}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECKOUT — DELIVERY
// ─────────────────────────────────────────────────────────────────────────────
function CheckoutDeliveryPage() {
  const navigate = useNavigate();
  const { delivery, updateDelivery } = useCheckout();
  const { show: showToast } = useToast();
  const { total } = useCart();

  const canProceed = delivery.recipientId && delivery.date && delivery.time;

  const TIME_SLOTS = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];

  return (
    <div className="checkout-page page-fade">
      <div className="checkout-inner">
        {/* Progress */}
        <div className="progress-steps">
          <div className="step active">
            <div className="step__dot">1</div>
            <span>Delivery</span>
          </div>
          <div className="step-connector" />
          <div className="step">
            <div className="step__dot">2</div>
            <span>Payment</span>
          </div>
          <div className="step-connector" />
          <div className="step">
            <div className="step__dot">3</div>
            <span>Confirm</span>
          </div>
        </div>

        <h1 className="section-title">Where should we deliver?</h1>

        {/* Recipient */}
        <div className="section-card">
          <div className="section-card__header">
            <span className="icon">👤</span> Who's the lucky recipient?
          </div>
          <div className="contacts-scroll">
            {CONTACTS.map(contact => (
              <div
                key={contact.id}
                className={`contact-card${delivery.recipientId === contact.id ? ' selected' : ''}`}
                onClick={() => updateDelivery({ recipientId: contact.id })}
              >
                <div className="contact-card__avatar" style={{ background: contact.color }}>
                  {contact.initials}
                </div>
                <div className="contact-card__name">{contact.name.split(' ')[0]}</div>
                <div className="contact-card__sub">{contact.address.split(',')[0]}</div>
              </div>
            ))}
            <div className="add-contact-card" onClick={() => showToast('Add contact — coming soon!', '➕')}>
              <div className="add-contact-card__icon">+</div>
              <div className="add-contact-card__name">Add new</div>
            </div>
          </div>

          {delivery.recipientId && (() => {
            const c = CONTACTS.find(c => c.id === delivery.recipientId);
            return c ? (
              <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--blush-xlight)', borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--blush-dark)' }}>
                📍 {c.address}
              </div>
            ) : null;
          })()}
        </div>

        {/* Date */}
        <div className="section-card">
          <div className="section-card__header">
            <span className="icon">📅</span> Delivery Date
          </div>
          <CalendarPicker
            value={delivery.date}
            onChange={(date) => updateDelivery({ date })}
          />
        </div>

        {/* Time */}
        <div className="section-card">
          <div className="section-card__header">
            <span className="icon">🕐</span> Delivery Time
          </div>
          <div className="time-slots">
            {TIME_SLOTS.map(t => (
              <button
                key={t}
                className={`time-slot${delivery.time === t ? ' selected' : ''}`}
                onClick={() => updateDelivery({ time: t })}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="checkout-footer">
          <button className="btn btn--ghost" onClick={() => navigate('/cart')}>← Back</button>
          <button
            className="btn btn--primary btn--lg"
            disabled={!canProceed}
            onClick={() => navigate('/checkout/payment')}
          >
            Continue to Payment →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECKOUT — PAYMENT
// ─────────────────────────────────────────────────────────────────────────────
function CheckoutPaymentPage() {
  const navigate = useNavigate();
  const { payment, updatePayment, delivery } = useCheckout();
  const { items, total, clearCart } = useCart();
  const { show: showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const selectedCard = SAVED_CARDS.find(c => c.id === payment.savedCardId);

  const handleComplete = () => {
    navigate('/order-confirmation');
    setTimeout(clearCart, 300);
  };

  const handleSaveCard = () => {
    showToast('New card saved!', '✅');
    setShowModal(false);
  };

  return (
    <div className="checkout-page page-fade">
      <div className="checkout-inner">
        {/* Progress */}
        <div className="progress-steps">
          <div className="step done">
            <div className="step__dot">✓</div>
            <span>Delivery</span>
          </div>
          <div className="step-connector done" />
          <div className="step active">
            <div className="step__dot">2</div>
            <span>Payment</span>
          </div>
          <div className="step-connector" />
          <div className="step">
            <div className="step__dot">3</div>
            <span>Confirm</span>
          </div>
        </div>

        <h1 className="section-title">How would you like to pay?</h1>

        {/* Payment methods */}
        <div className="section-card">
          <div className="section-card__header">
            <span className="icon">💳</span> Saved Payment Methods
          </div>
          {SAVED_CARDS.map(card => (
            <div
              key={card.id}
              className={`payment-card${payment.savedCardId === card.id ? ' selected' : ''}`}
              onClick={() => updatePayment({ savedCardId: card.id })}
            >
              <div className="payment-card__icon">{card.brand === 'Visa' ? '💙' : '🟠'}</div>
              <div className="payment-card__info">
                <div className="payment-card__number">{card.brand} •••• {card.last4}</div>
                <div className="payment-card__expiry">Expires {card.expiry}</div>
              </div>
              <div className="payment-card__radio" />
            </div>
          ))}

          <button
            className="btn btn--ghost"
            style={{ width: '100%', marginTop: 8 }}
            onClick={() => setShowModal(true)}
          >
            + Add New Card
          </button>
        </div>

        {/* Order summary */}
        <div className="section-card">
          <div className="section-card__header">
            <span className="icon">🧾</span> Order Summary
          </div>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8, color: 'var(--ink-soft)' }}>
              <span>{item.cakeName} × {item.quantity}</span>
              <span style={{ fontWeight: 600 }}>₪{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="divider" style={{ margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16 }}>
            <span>Total</span>
            <span style={{ color: 'var(--blush)' }}>₪{total}</span>
          </div>
        </div>

        <div className="checkout-footer">
          <button className="btn btn--ghost" onClick={() => navigate('/checkout/delivery')}>← Back</button>
          <button
            className="btn btn--primary btn--lg"
            disabled={!payment.savedCardId}
            onClick={handleComplete}
          >
            🎉 Complete Order
          </button>
        </div>
      </div>

      {/* Add Card Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal__header">
              <span className="modal__title">Add New Card</span>
              <button className="modal__close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal__field">
              <label>Card Number</label>
              <input className="modal__input" placeholder="1234 5678 9012 3456" value={newCard.number}
                onChange={e => setNewCard(p => ({ ...p, number: e.target.value }))} maxLength={19} />
            </div>
            <div className="modal__row">
              <div className="modal__field">
                <label>Expiry</label>
                <input className="modal__input" placeholder="MM/YY" value={newCard.expiry}
                  onChange={e => setNewCard(p => ({ ...p, expiry: e.target.value }))} maxLength={5} />
              </div>
              <div className="modal__field">
                <label>CVV</label>
                <input className="modal__input" placeholder="123" value={newCard.cvv}
                  onChange={e => setNewCard(p => ({ ...p, cvv: e.target.value }))} maxLength={4} />
              </div>
            </div>
            <div className="modal__field">
              <label>Cardholder Name</label>
              <input className="modal__input" placeholder="Full name on card" value={newCard.name}
                onChange={e => setNewCard(p => ({ ...p, name: e.target.value }))} />
            </div>
            <button className="btn btn--primary" style={{ width: '100%', marginTop: 8 }} onClick={handleSaveCard}>
              Save Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORDER CONFIRMATION
// ─────────────────────────────────────────────────────────────────────────────
const CONFETTI_COLORS = ['#F7A8C4','#9B7FD4','#F0B840','#48B07A','#E8709A','#C4AFEA','#FFDBA0'];

function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: `${(i * 2.5) % 100}%`,
    delay: `${(i * 0.07) % 2}s`,
    duration: `${2.5 + (i % 6) * 0.35}s`,
    size: 8 + (i % 5) * 2,
    borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '2px' : '1px',
    rotate: `rotate(${i * 37}deg)`,
  }));

  return (
    <div className="confetti-container">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top: '-20px',
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.borderRadius,
            animationName: 'confettiFall',
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationFillMode: 'both',
            animationTimingFunction: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { delivery, reset: resetCheckout } = useCheckout();

  const recipient = CONTACTS.find(c => c.id === delivery.recipientId);

  const handleOrderAnother = () => {
    resetCheckout();
    navigate('/');
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d} ${MONTH_NAMES[parseInt(m) - 1]} ${y}`;
  };

  return (
    <div className="confirmation-page page-fade">
      <Confetti />
      <div className="confirmation-inner">
        <div className="confirmation-icon">🎂</div>

        <h1 className="confirmation-title">Order Placed!</h1>
        <p className="confirmation-subtitle">
          Your cake is being baked with love.<br />
          We'll send you a confirmation shortly.
        </p>

        <div className="confirmation-card">
          <div className="conf-row">
            <span>Recipient</span>
            <span className="val">{recipient?.name || '—'}</span>
          </div>
          <div className="conf-row">
            <span>Address</span>
            <span className="val">{recipient?.address || '—'}</span>
          </div>
          <div className="conf-row">
            <span>Delivery Date</span>
            <span className="val">{formatDate(delivery.date)}</span>
          </div>
          <div className="conf-row">
            <span>Delivery Time</span>
            <span className="val">{delivery.time || '—'}</span>
          </div>
          <div className="conf-row">
            <span>Order #</span>
            <span className="val">#SS{Math.floor(Math.random() * 9000 + 1000)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'fadeUp 0.5s ease 1s both' }}>
          <button className="btn btn--primary btn--lg" onClick={handleOrderAnother}>
            🎁 Order Another Cake
          </button>
          <button className="btn btn--ghost" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  return (
    <HashRouter>
      <CartProvider>
        <CheckoutProvider>
          <ToastProvider>
            <NavBar />
            <Routes>
              <Route path="/"                     element={<HomePage />} />
              <Route path="/cake/:id"             element={<CakeProductPage />} />
              <Route path="/cart"                 element={<CartPage />} />
              <Route path="/checkout/delivery"    element={<CheckoutDeliveryPage />} />
              <Route path="/checkout/payment"     element={<CheckoutPaymentPage />} />
              <Route path="/order-confirmation"   element={<OrderConfirmationPage />} />
            </Routes>
          </ToastProvider>
        </CheckoutProvider>
      </CartProvider>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
