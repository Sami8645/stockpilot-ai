const base = [
  { name: "NVIDIA", pct: 30 },
  { name: "Microsoft", pct: 25 },
  { name: "Alphabet", pct: 20 },
  { name: "Apple", pct: 15 },
  { name: "USDC Reserve", pct: 10 }
];

function money(n) {
  return "$" + Math.round(n).toLocaleString();
}

function getAmount(text) {
  const m = text.match(/\$?\s?(\d[\d,]*)/);
  return m ? Number(m[1].replace(/,/g, "")) : 500;
}

function strategy(text) {
  text = text.toLowerCase();
  let amount = getAmount(text);
  let assets = [...base];
  let risk = "BALANCED";
  let score = 86;

  if (text.includes("low") || text.includes("conservative")) {
    assets = [
      { name: "Microsoft", pct: 25 },
      { name: "Apple", pct: 25 },
      { name: "Alphabet", pct: 15 },
      { name: "Healthcare Basket", pct: 15 },
      { name: "USDC Reserve", pct: 20 }
    ];
    risk = "LOW RISK";
    score = 91;
  }

  if (text.includes("aggressive") || text.includes("growth")) {
    assets = [
      { name: "NVIDIA", pct: 40 },
      { name: "AI Infrastructure", pct: 25 },
      { name: "Alphabet", pct: 20 },
      { name: "Apple", pct: 10 },
      { name: "USDC Reserve", pct: 5 }
    ];
    risk = "HIGH GROWTH";
    score = 78;
  }

  return { amount, assets, risk, score };
}

function render(data) {
  const allocation = document.getElementById("allocation");

  allocation.innerHTML = data.assets.map(a => `
    <div class="asset">
      <div class="assetTop">
        <span>${a.name}</span>
        <b>${a.pct}% · ${money(data.amount * a.pct / 100)}</b>
      </div>
      <div class="bar">
        <div class="fill" style="width:${a.pct}%"></div>
      </div>
    </div>
  `).join("");

  document.getElementById("totalAmount").textContent = money(data.amount);
  document.getElementById("risk").textContent = data.risk;
  document.getElementById("score").textContent = data.score;
}

let current = strategy(
  document.getElementById("goalInput").value
);

render(current);

document.getElementById("generateBtn").onclick = () => {
  current = strategy(
    document.getElementById("goalInput").value
  );

  render(current);

  document.getElementById("status").textContent =
    "✨ New AI strategy generated!";
};

document.getElementById("walletBtn").onclick = function () {
  this.textContent = "Demo Wallet Connected ✓";
};

document.getElementById("investBtn").onclick = () => {
  document.getElementById("status").textContent =
    "✓ Demo transaction prepared for " + money(current.amount);
};

document.getElementById("autoBtn").onclick = () => {
  document.getElementById("autoStatus").textContent =
    "✓ Autopilot demo enabled!";
};
