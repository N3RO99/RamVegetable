import { useState, useMemo } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  CheckCircle2,
  Receipt,
} from "lucide-react";

const colors = {
  bg: "#EFE7D8",
  surface: "#FBF7EE",
  ink: "#22201C",
  inkSoft: "#5B5646",
  primary: "#1F3D2B",
  primaryDark: "#14281C",
  accent: "#E8A33D",
  stampRed: "#C1443C",
  stampGreen: "#2E5A34",
  stampAmber: "#B4791F",
  line: "#C9BFA6",
};

const PRODUCTS = [
  { id: "toma", name: "Roma Tomatoes", unit: "case (25lb)", price: 29, stock: "in" },
  { id: "lett", name: "Plantain", unit: "box", price: 68, stock: "low", stockNote: "2 boxes" },
  { id: "onio", name: "Yellow Onions", unit: "bag (50lb)", price: 16.75, stock: "in" },
  { id: "pota", name: "Russet Potatoes", unit: "bag (50lb)", price: 18.0, stock: "out" },
  { id: "oran", name: "Navel Oranges", unit: "case (40lb)", price: 27.0, stock: "in" },
  { id: "appl", name: "Gala Apples", unit: "case (40lb)", price: 29.5, stock: "low", stockNote: "6 left" },
  { id: "bana", name: "Bananas", unit: "case (40lb)", price: 15.25, stock: "in" },
  { id: "pepp", name: "Bell Peppers", unit: "case (25lb)", price: 24.0, stock: "out" },
  { id: "carr", name: "Carrots", unit: "bag (25lb)", price: 13.5, stock: "in" },
];

function StockBadge({ stock, note }) {
  if (stock === "out") {
    return (
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          transform: "rotate(-8deg)",
          border: `2px solid ${colors.stampRed}`,
          color: colors.stampRed,
          padding: "2px 8px",
          fontFamily: "'Courier New', monospace",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.08em",
          borderRadius: 3,
          background: "rgba(193,68,60,0.06)",
        }}
      >
        SOLD OUT
      </div>
    );
  }
  if (stock === "low") {
    return (
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          color: colors.stampAmber,
          fontFamily: "'Courier New', monospace",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.06em",
        }}
      >
        LOW STOCK
      </div>
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        display: "flex",
        alignItems: "center",
        gap: 4,
        color: colors.stampGreen,
        fontFamily: "'Courier New', monospace",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "0.06em",
      }}
    >
      <CheckCircle2 size={13} strokeWidth={2.5} />
      IN STOCK
    </div>
  );
}

export default function GreenlineOrderDemo() {
  const [cart, setCart] = useState({});
  const [ticket, setTicket] = useState(null);

  const setQty = (id, qty) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  };

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }))
        .filter(Boolean),
    [cart]
  );

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    setTicket({
      number: Math.floor(1000 + Math.random() * 9000),
      items: cartItems,
      total,
      time: new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" }),
    });
    setCart({});
  };

  return (
    <div style={{ background: colors.bg, minHeight: "100%", color: colors.ink, fontFamily: "Helvetica, Arial, sans-serif" }}>
      <style>{`
        .glx-btn { transition: transform .12s ease, background .15s ease; }
        .glx-btn:active { transform: scale(0.96); }
        .glx-card { transition: box-shadow .15s ease, transform .15s ease; }
        .glx-card:hover { box-shadow: 0 4px 0 ${colors.line}; transform: translateY(-2px); }
        @keyframes glx-pop { from { opacity: 0; transform: scale(.9) translateY(6px);} to { opacity:1; transform:scale(1) translateY(0);} }
        .glx-ticket { animation: glx-pop .25s ease; }
        .glx-layout { display: grid; grid-template-columns: minmax(0,1fr) 320px; gap: 28px; }
        .glx-cart-panel { position: sticky; top: 20px; }
        @media (max-width: 760px) {
          .glx-layout { grid-template-columns: 1fr; }
          .glx-cart-panel { position: static; }
        }
      `}</style>

      {/* Header */}
      <header
        style={{
          background: colors.primary,
          color: colors.surface,
          padding: "22px 24px",
          borderBottom: `4px solid ${colors.accent}`,
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: "0.03em", textTransform: "uppercase" }}>
              Ram Vegetable
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#CFE0D2", fontFamily: "'Courier New', monospace" }}>
            DEMO — WHOLESALE ORDER BOARD
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 24px 80px", display: "grid", gridTemplateColumns: "1fr", gap: 28 }}>
        <div className="glx-layout">
          {/* Product grid */}
          <section>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: colors.inkSoft, marginBottom: 12, textTransform: "uppercase" }}>
              Today's Stock
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14 }}>
              {PRODUCTS.map((p) => {
                const inCart = cart[p.id] || 0;
                const disabled = p.stock === "out";
                return (
                  <div
                    key={p.id}
                    className="glx-card"
                    style={{
                      position: "relative",
                      background: colors.surface,
                      border: `1px solid ${colors.line}`,
                      borderRadius: 8,
                      padding: "16px 14px 14px",
                      opacity: disabled ? 0.72 : 1,
                    }}
                  >
                    <StockBadge stock={p.stock} note={p.stockNote} />
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2, paddingRight: 70 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: colors.inkSoft, marginBottom: 10 }}>{p.unit}</div>
                    <div style={{ fontFamily: "'Courier New', monospace", fontWeight: 700, color: colors.primary, fontSize: 15, marginBottom: 12 }}>
                      ${p.price.toFixed(2)}
                    </div>

                    {disabled ? (
                      <div style={{ fontSize: 12, color: colors.stampRed, fontWeight: 700 }}>Unavailable right now</div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: colors.bg, borderRadius: 6, padding: "4px 6px" }}>
                        <button
                          className="glx-btn"
                          onClick={() => setQty(p.id, Math.max(0, inCart - 1))}
                          style={{ border: "none", background: colors.primary, color: "#fff", width: 26, height: 26, borderRadius: 5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: 700, fontFamily: "'Courier New', monospace" }}>{inCart}</span>
                        <button
                          className="glx-btn"
                          onClick={() => setQty(p.id, inCart + 1)}
                          style={{ border: "none", background: colors.primary, color: "#fff", width: 26, height: 26, borderRadius: 5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Cart */}
          <aside>
            <div
              className="glx-cart-panel"
              style={{
                background: colors.surface,
                border: `1px solid ${colors.line}`,
                borderRadius: 8,
                padding: 18,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 14, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em", color: colors.primary }}>
                <ShoppingCart size={16} />
                Current order
              </div>

              {cartItems.length === 0 ? (
                <div style={{ fontSize: 13, color: colors.inkSoft, padding: "10px 0" }}>
                  No items yet — add stock from the board to build an order.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                  {cartItems.map((i) => (
                    <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{i.name}</div>
                        <div style={{ color: colors.inkSoft, fontSize: 11 }}>x{i.qty} · {i.unit}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: "'Courier New', monospace", fontWeight: 700 }}>
                          ${(i.price * i.qty).toFixed(2)}
                        </span>
                        <button
                          onClick={() => setQty(i.id, 0)}
                          style={{ border: "none", background: "none", cursor: "pointer", color: colors.inkSoft }}
                          aria-label={`Remove ${i.name}`}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ borderTop: `1px solid ${colors.line}`, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: 14 }}>
                <span>Total</span>
                <span style={{ fontFamily: "'Courier New', monospace" }}>${total.toFixed(2)}</span>
              </div>

              <button
                className="glx-btn"
                disabled={cartItems.length === 0}
                onClick={placeOrder}
                style={{
                  width: "100%",
                  background: cartItems.length === 0 ? colors.line : colors.accent,
                  color: cartItems.length === 0 ? colors.inkSoft : colors.primaryDark,
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 0",
                  fontWeight: 800,
                  fontSize: 13,
                  letterSpacing: "0.03em",
                  cursor: cartItems.length === 0 ? "default" : "pointer",
                  textTransform: "uppercase",
                }}
              >
                Place order
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Ticket modal */}
      {ticket && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(34,32,28,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            zIndex: 50,
          }}
          onClick={() => setTicket(null)}
        >
          <div
            className="glx-ticket"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: colors.surface,
              width: "100%",
              maxWidth: 340,
              padding: "22px 20px",
              borderRadius: 4,
              boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
              fontFamily: "'Courier New', monospace",
              border: `1px solid ${colors.line}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", color: colors.primary, marginBottom: 4 }}>
              <Receipt size={16} />
              <span style={{ fontWeight: 800, letterSpacing: "0.08em" }}>ORDER TICKET</span>
            </div>
            <div style={{ textAlign: "center", fontSize: 11, color: colors.inkSoft, marginBottom: 14 }}>
              #{ticket.number} · {ticket.time}
            </div>
            <div style={{ borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}`, padding: "10px 0", marginBottom: 10 }}>
              {ticket.items.map((i) => (
                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span>{i.qty}x {i.name}</span>
                  <span>${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 13, marginBottom: 16 }}>
              <span>TOTAL</span>
              <span>${ticket.total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setTicket(null)}
              style={{
                width: "100%",
                background: colors.primary,
                color: "#fff",
                border: "none",
                borderRadius: 5,
                padding: "8px 0",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
