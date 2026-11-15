# Mizan

**A Precious Metals Price Dashboard for Al Andalous Jewelry — Nador, Morocco**

MIZAN is a web-based dashboard designed to help jewelry professionals monitor gold and silver market prices in real time.

The project aims to simplify access to precious metal prices by bringing market data into a single, clean, and easy-to-use interface, with support for multiple currencies and different metal purities.

## ✨ Features

- **Live Gold Prices** — Retrieve current gold market prices.
- **Silver Price Estimation** — Calculate silver prices using the gold-to-silver ratio.
- **Multiple Currencies** — Display prices in MAD, USD, and EUR.
- **Multiple Gold Purities** — View prices for 24K, 22K, 21K, and 18K gold.
- **Silver Purities** — Calculate prices for 999 and 925 silver.
- **Price History** — Display historical market prices and track price movements.
- **Dynamic Date** — Show the date associated with the latest market data.
- **Responsive Interface** — Designed to work across different screen sizes.

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| Tailwind CSS | Styling and responsive design |
| JavaScript (ES6+) | Application logic and calculations |
| JavaScript Fetch API | Retrieving external market data |
| Async/Await | Handling asynchronous operations |
| REST API | Accessing precious metals market data |
| Git & GitHub | Version control and deployment |

## 📊 Data Source

MIZAN uses the [XAUS API](https://xaus.com/) to retrieve precious metals market information.

The application retrieves gold prices and uses the gold-to-silver ratio to estimate silver prices.

All prices are processed and converted according to the selected currency and metal purity.

**Important:** Silver prices are estimated from the gold-to-silver ratio rather than retrieved independently from a dedicated silver price endpoint.

## 🚀 Getting Started

### Prerequisites

- A modern web browser.
- [Git](https://git-scm.com/) installed.
- A local development server (such as VS Code Live Server).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/reda711/Mizan.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Mizan
   ```

3. Open the project using your preferred code editor.

4. Start a local development server.

5. Open the application in your browser.

## 📁 Project Structure

```text
Mizan/
│
├── index.html
│
├── src/
│   ├── js/
│   │   ├── main.js
│   │   └── ...
│   │
│   └── ...
│
├── README.md
└── ...
```

*The structure above illustrates the main organization; additional files and modules may vary as development progresses.*

## 🎯 Project Objectives

MIZAN is being developed to:

- Practice advanced JavaScript concepts.
- Work with external APIs and asynchronous requests.
- Improve data validation and error handling.
- Implement financial calculations and currency conversions.
- Build a practical, user-oriented dashboard.
- Develop clean, maintainable, and reusable code.

## 🔮 Future Improvements

- Improve API error handling and recovery.
- Implement more reliable silver price data.
- Improve historical price visualization.
- Optimize API requests and data processing.
- Add more detailed market analysis.

## 👨‍💻 Author

**Reda Alaoui**

GitHub: [@reda711](https://github.com/reda711)

---