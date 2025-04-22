import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all countries
  const fetchAllCountries = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(res.data);
    } catch (error) {
      console.error('Error fetching all countries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Search countries by name
  const searchCountriesByName = async (name) => {
    if (!name) {
      console.error('Please provide a valid country name.');
      return;
    }
    
    try {
      setLoading(true);
      const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      setCountries(res.data);
    } catch (error) {
      console.error('Error searching countries by name:', error);
      setCountries([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };
  

  // Filter countries by region
  const filterCountriesByRegion = async (region) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
      setCountries(res.data);
    } catch (error) {
      console.error('Error filtering countries by region:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter countries by language
  const filterCountriesByLanguage = async (language) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://restcountries.com/v3.1/lang/${language}`);
      setCountries(res.data);
    } catch (error) {
      console.error('Error filtering countries by language:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCountries(); // Load on start
  }, []);

  return (
    <CountryContext.Provider
      value={{
        countries,
        loading,
        fetchAllCountries,
        searchCountriesByName,
        filterCountriesByRegion,
        filterCountriesByLanguage,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
