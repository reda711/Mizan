const select = document.getElementById("currency");
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
const calculatecurrency = document.getElementById("calculator-currency")
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
        lastUpdated.textContent = "Failed to fetch data";
        dot.classList.add("bg-red-500");
        throw new Error("Failed to fetch data from API");
    }}
    catch (error){
        console.error(error);
        
    }
    dot.classList.add("bg-green-500");
    const Gram = await res2.json();
    return Gram.xau.price;
}

async function getsilverprice(currency) {
    const response = await fetch(
        `https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`,
    );
    if(!response.ok){
        throw new Error("Failed to fetch data from API")
    }
    const data = await response.json();
    
    const goldPricePerGram = data.xau.price;
    const goldSilverRatio = data.gold_silver_ratio;
    
    const silverPricePerGram = goldPricePerGram / goldSilverRatio;
    
    return silverPricePerGram;
}

async function getdate() {
    const res2 = await fetch(
        `https://xaus.com/api/v1/spot?currency=USD&unit=gram`,
    );
    const data = await res2.json();
    return data.data_state.as_of;
}


refresh.addEventListener("click", async () => {
    refresh.textContent = "↻ Refresh";
    let goldresult = 0;
    let silverresult = 0;
    let date = await getdate();
    date = date.slice(0, 16).replace("T", " ");
    lastUpdated.textContent = `Last Updated on : ${date} GMT`;
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
});
