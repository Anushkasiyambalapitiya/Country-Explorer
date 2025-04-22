import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CountryContext } from "../Context/countryContext";

const CountryDetails = () => {
  const { countries } = useContext(CountryContext);
  const { code } = useParams();

  const country = countries.find((c) => c.cca3 === code);

  if (!country) return <p>Country not found</p>;

  const {
    name,
    flags,
    coatOfArms,
    capital,
    region,
    subregion,
    population,
    area,
    timezones,
    continents,
    borders,
    languages,
    currencies,
    maps,
  } = country;

  const capitalCity = capital?.[0] || "N/A";

  return (
    <div className="p-6 bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] relative">
      <Link to="/countries" className="text-blue-500 underline">
        ← Back to List
      </Link>

      <h2 className="text-3xl font-bold mt-4 mb-8">{name.common}</h2>

      {/* Flex Container with Equal Height Columns */}
      <div className="flex flex-col md:flex-row gap-10 h-[500px]">
        {/* Left: Description */}
        <div className="md:w-1/2 h-full overflow-auto">
          <p className="text-lg leading-relaxed">
            <strong>{name.official}</strong> is a country located in{" "}
            <strong>{continents?.join(", ")}</strong>, within the region of{" "}
            <strong>{region}</strong> and the subregion{" "}
            <strong>{subregion}</strong>. Its capital city is{" "}
            <strong>{capitalCity}</strong>. The population is approximately{" "}
            <strong>{population.toLocaleString()}</strong> people, spread over
            an area of <strong>{area.toLocaleString()} km²</strong>. The country
            uses the following timezone(s):{" "}
            <strong>{timezones?.join(", ")}</strong>. The official languages
            include{" "}
            <strong>
              {languages ? Object.values(languages).join(", ") : "N/A"}
            </strong>
            , and its currencies are{" "}
            <strong>
              {currencies
                ? Object.entries(currencies)
                    .map(([code, val]) => `${val.name} (${val.symbol || code})`)
                    .join(", ")
                : "N/A"}
            </strong>
            .
            {borders && borders.length > 0 ? (
              <>
                {" "}
                It shares borders with: <strong>{borders.join(", ")}</strong>.
              </>
            ) : (
              <> It is an island or has no bordering countries.</>
            )}
            <br />
            You can also find it on the map here:{" "}
            <a
              href={maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Google Maps
            </a>
            .
          </p>
        </div>

        {/* Right: Images */}
        <div className="md:w-1/2 h-full flex flex-col gap-4 items-center justify-start overflow-auto">
          <img
            src={flags?.png || flags?.svg}
            alt="Flag"
            className="w-full max-w-xs h-48 object-contain rounded shadow"
          />
          {coatOfArms?.png && (
            <img
              src={coatOfArms.png}
              alt="Coat of Arms"
              className="w-full max-w-xs h-48 object-contain rounded shadow"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
