import React, { useContext, useState, useMemo } from 'react';
import { CountryContext } from '../Context/countryContext';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const Countries = () => {
const {
  countries,
  loading,
  searchCountriesByName,
  filterCountriesByRegion,
  filterCountriesByLanguage,
  fetchAllCountries
} = useContext(CountryContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [visibleCount, setVisibleCount] = useState(15);


  const regions = useMemo(() => {
    const regionSet = new Set(countries.map(c => c.region).filter(Boolean));
    return ['All', ...Array.from(regionSet)];
  }, [countries]);

  const languages = useMemo(() => {
    const langSet = new Set();
    countries.forEach(country => {
      if (country.languages) {
        Object.values(country.languages).forEach(lang => langSet.add(lang));
      }
    });
    return ['All', ...Array.from(langSet)];
  }, [countries]);

  const regionOptions = useMemo(() =>
    regions.map(region => ({ value: region, label: region })), [regions]);

  const languageOptions = useMemo(() =>
    languages.map(lang => ({ value: lang, label: lang })), [languages]);

  const filteredCountries = useMemo(() => {
    return countries.filter(country => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
      const matchesLanguage =
        selectedLanguage === 'All' ||
        (country.languages && Object.values(country.languages).includes(selectedLanguage));
      return matchesSearch && matchesRegion && matchesLanguage;
    });
  }, [countries, searchTerm, selectedRegion, selectedLanguage]);


  const visibleCountries = filteredCountries.slice(0, visibleCount); // 👈 Slice visible

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 15); 
  };

  if (loading) return <p>Loading countries...</p>;



  return (
    <div>
      {/* Hero Section with Background */}
      <section className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] relative">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Explore the World
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
            Filter countries by region, language or search for any country you like!
          </p>

          {/* Filter/Search Form */}
          <form onSubmit={e => e.preventDefault()} className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {/* Region Select */}
              <div className="min-w-[180px]">
                <Select
                  options={regionOptions}
                  value={regionOptions.find(opt => opt.value === selectedRegion)}
                  onChange={opt => setSelectedRegion(opt.value)}
                  isSearchable
                  className="text-sm"
                  classNames={{
                    control: () => "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg",
                    input: () => "text-gray-900 dark:text-white",
                    menu: () => "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                  }}
                />
              </div>

              {/* Language Select */}
              <div className="min-w-[180px]">
                <Select
                  options={languageOptions}
                  value={languageOptions.find(opt => opt.value === selectedLanguage)}
                  onChange={opt => setSelectedLanguage(opt.value)}
                  isSearchable
                  className="text-sm"
                  classNames={{
                    control: () => "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg",
                    input: () => "text-gray-900 dark:text-white",
                    menu: () => "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                  }}
                />
              </div>

              {/* Search Input */}
              <div className="relative flex-grow max-w-xs">
                <input
                  type="search"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg pr-10 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                <button
                  type="submit"
                  className="absolute top-0.5 right-0 p-2.5 text-sm text-white bg-gray-700 rounded-e-lg hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900 w-full h-full absolute top-0 left-0 z-0"></div>
      </section>

      {/* Country List */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Countries</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {visibleCountries.length === 0 ? (
            <p className="col-span-full">No countries match your filters.</p>
          ) : (
            visibleCountries.map((country, index) => (
              <li key={index} className="border p-4 rounded shadow-md transition hover:shadow-lg">
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="w-16 h-10 object-cover mb-2"
                />
                <h3 className="font-semibold text-lg">{country.name.common}</h3>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                <Link
                  to={`/country/${country.cca3}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Details
                </Link>
              </li>
            ))
          )}
        </ul>
        {visibleCount < filteredCountries.length && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>  
  );
};

export default Countries;
