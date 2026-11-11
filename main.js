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

async function getgoldprice(currency) {
    const res2 = await fetch(
        `https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`,
    );
    if (!res2.ok) {
        lastUpdated.textContent = "Failed to fetch data";
        dot.classList.add("bg-red-500");
        throw new Error("Failed to fetch data from API");
    }
    dot.classList.add("bg-green-500");
    const Gram = await res2.json();
    return Gram.xau.price;
}
