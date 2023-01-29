import axios from 'axios';
import { baseURL } from './Configs';

/**
 * Call list symbols endpoint.
 * 
 * @returns API response for /symbols endpoint
 */
export const listSymbols = async () => {

    const response = await axios.get(baseURL + "/symbols");

    return response;
};

/**
 * Call convert endpoint.
 * 
 * @param {*} source The source currency
 * @param {*} target The target currency
 * @param {*} value Value to convert
 * @returns API response for conversion
 */
export const convertCurrency = async (source, target, value) => {

    const params = new URLSearchParams([['base', source], ['target', target], ['value', value]]);

    const response = await axios.get(baseURL, { params });

    return response;
};
