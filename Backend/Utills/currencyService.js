import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load API keys from .env file

const API_KEY = process.env.EXCHANGE_RATE_API_KEY; // Store API key in .env file

export const getExchangeRate = async (baseCurrency, targetCurrency) => {
    try {

       const trimmedBaseCurrency = baseCurrency.trim();
    
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${trimmedBaseCurrency}`);
        const rates = response.data.conversion_rates;
        console.log("Available keys in conversion rates:", Object.keys(rates));
        const trimmedTargetCurrency = targetCurrency.trim();

        // Access the exchange rate for the target currency
        const exchangeRate = rates[trimmedTargetCurrency];

        // Check if the exchange rate exists
        if (exchangeRate === undefined) {
            return { success: false, message: `Exchange rate not available for ${trimmedTargetCurrency}` };
        }

        return { success: true, rate: exchangeRate };

    } catch (error) {
        console.error("Error fetching exchange rate:", error.message);
        return { success: false, message: "Unable to fetch exchange rate" };
    }
};
