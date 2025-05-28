import { useState, useEffect } from 'react';
import axios from 'axios';
import { PackageType } from '../../types';

interface Location {
  country: string;
  currency: string;
}

interface Currency {
  code: string;
  symbol: string;
  rate: number;
}

export function useRegionPricing() {
  const [location, setLocation] = useState<Location | null>(null);
  const [currency, setCurrency] = useState<Currency>({
    code: 'USD',
    symbol: '$',
    rate: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationAndCurrency = async () => {
      try {
        // In a real application, use a production-ready geo-IP service like ipstack
        const geoResponse = await axios.get('http://www.geoplugin.net/json.gp');
        // console.log('Geo API Response:', geoResponse.data); // Add logging
        const country = geoResponse.data.geoplugin_countryName;
        const currencyCode = geoResponse.data.geoplugin_currencyCode || 'USD';
        const currencySymbol = geoResponse.data.geoplugin_currencySymbol || '$';
        const currencyRate = geoResponse.data.geoplugin_currencyConverter || 1;

        // console.log('Detected Currency Code:', currencyCode); // Add logging
        setLocation({ country, currency: currencyCode });
        
        setCurrency({
          code: currencyCode,
          symbol: currencyCode === 'INR' ? '₹' : currencySymbol,
          rate: currencyRate
        });
        
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch location data');
        // console.log('Currency Info Used:', { code: 'USD', symbol: '$', rate: 1 }); // Re-add logging for fallback
        setCurrency({ code: 'USD', symbol: '$', rate: 1 });
        setIsLoading(false);
      }
    };

    fetchLocationAndCurrency();
  }, []);

    const formatPrice = (packageItem: PackageType) => {
      if (!currency) return '...';

      let price;
      if (currency.code === 'INR' && packageItem.priceInr !== undefined) {
        price = packageItem.priceInr;
      } else {
        const exchangeRate = currency.rate;
        price = packageItem.priceUsd * exchangeRate;

        // Custom rounding for other currencies (to nearest X99)
        if (currency.code !== 'INR') {
           price = Math.round(price / 100) * 100 - 1;
        }
      }

      return `${currency.symbol}${price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

  return {
    location,
    currency,
    formatPrice,
    isLoading,
    error
  };
}