"use client";
import { Order } from "@/types";

export function printReceipt(order: Order, shopName = "ZUZZAT Coffee Shop") {
  const w = window.open("", "_blank", "width=400,height=600");
  if (!w) {
    alert("Unable to open print window. Please allow popups for this site and try again.");
    return;
  }
  const date = new Date(order.createdAt).toLocaleString("en-EG");
  const html = `
    <!DOCTYPE html><html><head>
    <meta charset="UTF-8">
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Courier New',monospace;font-size:12px;padding:20px;max-width:300px;margin:auto}
      .center{text-align:center}
      .line{border-top:1px dashed #000;margin:8px 0}
      .row{display:flex;justify-content:space-between;margin:3px 0}
      .bold{font-weight:bold}
      .logo{font-size:22px;font-weight:900;letter-spacing:-1px}
      .big{font-size:16px;font-weight:bold;margin:4px 0}
    </style></head><body>
    <div class="center">
      <div class="logo">ZUZZAT</div>
      <div style="font-size:10px">Stay Cool, Drink Better</div>
      <div style="font-size:10px">☕ ${shopName}</div>
      <div style="font-size:10px">123 Tahrir Square, Cairo</div>
    </div>
    <div class="line"></div>
    <div class="row"><span>Order:</span><span class="bold">#${order.orderNumber}</span></div>
    <div class="row"><span>Date:</span><span>${date}</span></div>
    <div class="row"><span>Type:</span><span class="bold">${order.type}</span></div>
    ${order.tableId ? `<div class="row"><span>Table:</span><span>${order.tableId}</span></div>` : ""}
    ${order.cashier ? `<div class="row"><span>Cashier:</span><span>${order.cashier}</span></div>` : ""}
    <div class="line"></div>
    <div class="bold" style="margin-bottom:6px">ITEMS</div>
    ${order.items.map(i => `
      <div class="row"><span>${i.emoji} ${i.name}</span><span></span></div>
      <div class="row" style="padding-left:10px"><span>×${i.qty} @ ${i.price} EGP</span><span>${i.price * i.qty} EGP</span></div>
    `).join("")}
    <div class="line"></div>
    <div class="row"><span>Subtotal</span><span>${order.subtotal} EGP</span></div>
    ${order.discount > 0 ? `<div class="row"><span>Discount ${order.promoCode ? `(${order.promoCode})` : ""}</span><span>-${order.discount} EGP</span></div>` : ""}
    <div class="line"></div>
    <div class="row big"><span>TOTAL</span><span>${order.total} EGP</span></div>
    <div class="row" style="margin-top:4px"><span>Payment:</span><span class="bold">${order.paymentMethod}</span></div>
    <div class="line"></div>
    <div class="center" style="margin-top:8px">
      <div>Thank you for visiting ZUZZAT! ☕</div>
      <div style="font-size:10px;margin-top:4px">Earn points with every order — zuzzat.com</div>
      <div style="font-size:10px">📞 010-ZUZZAT-01</div>
    </div>
    <script>window.onload=()=>{window.print();setTimeout(()=>window.close(),1000)}<\/script>
    </body></html>`;
  w.document.write(html);
  w.document.close();
}

interface Props { order: Order; }
export default function PrintReceiptButton({ order }: Props) {
  return (
    <button onClick={() => printReceipt(order)}
      className="flex items-center gap-2 text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
      🖨 Print Receipt
    </button>
  );
}
