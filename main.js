// https://xaus.com/api/v1/history
const select = document.getElementById("currency");
const savedselect = localStorage.getItem("select")
const refresh = document.getElementById("refresh");
const golddashboard = document.getElementById("golddashboard");
const silverdashboard = document.getElementById("silverdashboard");
const lastUpdated = document.getElementById("last-updated");
const dot = document.getElementById("dot");
const calculatebtn = document.getElementById("calculate-price");
const weight = document.getElementById("metal-weight");
const weighterror = document.getElementById("weighterror");
const result = document.getElementById("calculated-price");
const calculatediv = document.getElementById("calculation-result");
const metaltype = document.getElementById("metal-type");
const welcome = document.getElementById("date");
const calculatecurrency = document.getElementById("calculator-currency");
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
    console.error(error);
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


