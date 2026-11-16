const select = document.getElementById("currency");
const refresh = document.getElementById("refresh");
const golddashboard = document.getElementById("golddashboard");
const silverdashboard = document.getElementById("silverdashboard");
const lastUpdated = document.getElementById("last-updated");
const dot = document.getElementById("dot");
const calculatebtn = document.getElementById("calculate-price");
const weight = document.getElementById("metal-weight");
const weighterror = document.getElementById("weighterror");
const chart = document.getElementById("history-chart")
const result = document.getElementById("calculated-price");
const calculatediv = document.getElementById("calculation-result");
const metaltype = document.getElementById("metal-type");
const welcome = document.getElementById("date");
const calculatecurrency = document.getElementById("calculator-currency");
const lowest = document.getElementById("history-lowest")
const highest = document.getElementById("history-highest")
const today = new Date();
const formattedDate = today.toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
welcome.textContent = formattedDate;

async function getgoldprice(currency) {
  try {
    const res2 = await fetch(
      `https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`,
    );

    if (!res2.ok) {
      throw new Error("Failed to fetch gold price");
    }

    const gram = await res2.json();
    const price = gram.xau?.price;

    if (typeof price !== "number" || !Number.isFinite(price)) {
      throw new Error("Invalid gold price");
    }

    return price;
  } catch (error) {
    throw error;
  }
}

async function getsilverprice(currency) {
  try {
    const response = await fetch(
      `https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }
    const data = await response.json();
    const goldPricePergram = data.xau.price;
    const goldSilverRatio = data.gold_silver_ratio;
    if (typeof goldSilverRatio !== "number" || !Number.isFinite(goldSilverRatio)) {
      throw new Error("Invalid gold price");
    }
    
    const silverPricePergram = goldPricePergram / goldSilverRatio;
    return silverPricePergram;
  } catch (error) {
    throw new Error(error);
  }
}

async function getdate() {
  try {
    const res2 = await fetch(
      `https://xaus.com/api/v1/spot?currency=USD&unit=gram`,
    );
    const data = await res2.json();
    return data.data_state.as_of;
  } catch (error) {
    throw new Error(error);
  }
}

async function getgoldhistory(){
  try{
  const res2 = await fetch("https://xaus.com/api/v1/history")
  if(!res2.ok){
    throw new Error("fetching wasn't successful")
  }
  const result = await res2.json()
}
  catch(error){
    throw new Error(error)
  }
}

refresh.addEventListener("click", async () => {
  refresh.textContent = "↻ Refresh";
  let goldresult;
  let silverresult;
  let currency = "";
  if (select.value === "MAD") {
    goldresult = await getgoldprice("MAD");
    currency = "DH";
    golddashboard.innerHTML = `
        <p class="text-xl"> Current gold price is : <span class="text-[#FFD700]">${goldresult.toFixed(2)} ${currency}</span> per Gram </p>
        `;
    silverresult = await getsilverprice("MAD");

    silverdashboard.innerHTML = `
        <p class="text-xl"> Current silver price is : <span class="text-[#C0C0C0]">${silverresult.toFixed(2)} ${currency}</span> per Gram </p>
        `;
  } else if (select.value === "USD") {
    currency = "$";
    goldresult = await getgoldprice("USD");
    golddashboard.innerHTML = `
        <p class="text-xl"> Current gold price is : <span class="text-[#FFD700]">${goldresult.toFixed(2)} ${currency}</span> per Gram </p>
        `;
    silverresult = await getsilverprice("USD");
    silverdashboard.innerHTML = `
        <p class="text-xl"> Current silver price is : <span class="text-[#C0C0C0]">${silverresult.toFixed(2)} ${currency}</span> per Gram </p>
        `;
  } else if (select.value === "EUR") {
    currency = "€";
    goldresult = await getgoldprice("EUR");
    golddashboard.innerHTML = `
        <p class="text-xl"> Current gold price is : <span class="text-[#FFD700]">${goldresult.toFixed(2)} ${currency}</span> per Gram </p>
        `;
    silverresult = await getsilverprice("EUR");
    silverdashboard.innerHTML = `
        <p class="text-xl"> Current silver price is : <span class="text-[#C0C0C0]">${silverresult.toFixed(2)} ${currency}</span> per Gram </p>
        `;
  }
  if (goldresult && silverresult) {
    let date = await getdate();
    date = date.slice(0, 16).replace("T", " ");
    lastUpdated.textContent = `Last Updated on : ${date} GMT`;
  }
  getgoldhistory()
});

calculatebtn.addEventListener("click", async () => {
  let total = 0;
  if (!weight.value.trim() || weight.value == 0) {
    weighterror.textContent = "Enter a valid amount";
    weighterror.style.display = "block";
    calculatediv.style.display = "none";
  } else {
    if (metaltype.value === "gold") {
      if (calculatecurrency.value === "MAD") {
        weighterror.style.display = "none";
        calculatediv.style.display = "block";
        total = await getgoldprice("MAD");
        result.textContent = `${(Number(total) * weight.value).toFixed(2)} DH`;
      } else if (calculatecurrency.value === "USD") {
        weighterror.style.display = "none";
        calculatediv.style.display = "block";
        total = await getgoldprice("USD");
        result.textContent = `${(Number(total) * weight.value).toFixed(2)} $`;
      } else if (calculatecurrency.value === "EUR") {
        weighterror.style.display = "none";
        calculatediv.style.display = "block";
        total = await getgoldprice("EUR");
        result.textContent = `${(Number(total) * weight.value).toFixed(2)} €`;
      }
    } else if (metaltype.value === "silver") {
      if (calculatecurrency.value === "EUR") {
        weighterror.style.display = "none";
        calculatediv.style.display = "block";
        total = await getsilverprice("EUR");
        result.textContent = `${(Number(total) * weight.value).toFixed(2)} €`;
      } else if (calculatecurrency.value === "USD") {
        weighterror.style.display = "none";
        calculatediv.style.display = "block";
        total = await getsilverprice("USD");
        result.textContent = `${(Number(total) * weight.value).toFixed(2)} $`;
      } else if (calculatecurrency.value === "MAD") {
        weighterror.style.display = "none";
        calculatediv.style.display = "block";
        total = await getsilverprice("MAD");
        result.textContent = `${(Number(total) * weight.value).toFixed(2)} DH`;
      }
    }
  }
});


  const historyMetal = document.getElementById("history-metal");
const historyPeriod = document.getElementById("history-period");
const historyTitle = document.getElementById("history-chart-title");
const historyCurrency = document.getElementById("history-currency");

let historyChart;

const TROY_OUNCE_IN_GRAMS = 31.1034768;

async function updatePriceHistory() {
  const currency = select.value;
  const metal = historyMetal.value;
  const days = Number(historyPeriod.value);

  historyCurrency.textContent = currency;
  historyTitle.textContent =
    `${metal === "gold" ? "Gold" : "Silver"} Price History`;

  try {
    const [historyResponse, spotResponse] = await Promise.all([
      fetch("https://xaus.com/api/v1/history"),
      fetch(
        `https://xaus.com/api/v1/spot?currency=${encodeURIComponent(currency)}&unit=gram`,
      ),
    ]);

    if (!historyResponse.ok || !spotResponse.ok) {
      throw new Error("The price-history service returned an error.");
    }

    const [history, spot] = await Promise.all([
      historyResponse.json(),
      spotResponse.json(),
    ]);

    if (
      !Array.isArray(history.points) ||
      !Number.isFinite(spot.fx_rate) ||
      (metal === "silver" &&
        (!Number.isFinite(spot.gold_silver_ratio) || spot.gold_silver_ratio <= 0))
    ) {
      throw new Error("The API returned incomplete or invalid history data.");
    }

    const points = history.points
      .filter(
        (point) =>
          typeof point.d === "string" &&
          Number.isFinite(point.c) &&
          Number.isFinite(Date.parse(point.d)),
      )
      .slice(-days);

    if (points.length === 0) {
      throw new Error("There are no valid history points for this period.");
    }

    // History is USD per troy ounce. Convert to the selected currency per gram.
    const goldPrices = points.map(
      (point) => (point.c / TROY_OUNCE_IN_GRAMS) * spot.fx_rate,
    );
    // XAUS provides gold history but only the current gold/silver ratio.
    // This estimates silver history by applying today's ratio to each gold close.
    const prices = metal === "silver"
      ? goldPrices.map((goldPricePergram) =>
          goldPricePergram / spot.gold_silver_ratio,
        )
      : goldPrices;

    if (!prices.every(Number.isFinite)) {
      throw new Error("The API returned invalid prices for the chart.");
    }

    highest.textContent = formatHistoryPrice(Math.max(...prices), currency);
    lowest.textContent = formatHistoryPrice(Math.min(...prices), currency);

    const context = chart.getContext("2d");
    if (!context) throw new Error("The history canvas is unavailable.");

    if (historyChart) historyChart.destroy();

    historyChart = new Chart(context, {
      type: "line",
      data: {
        labels: points.map((point) => point.d),
        datasets: [{
          label: metal === "silver"
            ? `Estimated silver (${currency} / gram)`
            : `Gold (${currency} / gram)`,
          data: prices,
          borderColor: "#d97706",
          backgroundColor: "rgba(217, 119, 6, 0.12)",
          fill: true,
          tension: 0.25,
          pointRadius: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: false },
        },
      },
    });
  } catch (error) {
    if (historyChart) historyChart.destroy();
    highest.textContent = "--";
    lowest.textContent = "--";
    historyTitle.textContent = "Price history could not be loaded";
    console.error("Price history error:", error);
  }
}

function formatHistoryPrice(value, currency) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

historyMetal.addEventListener("change", updatePriceHistory);
historyPeriod.addEventListener("change", updatePriceHistory);
select.addEventListener("change", updatePriceHistory);

updatePriceHistory();
