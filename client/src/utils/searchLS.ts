import { SearchResult } from '@/api/products/products.types';

export const getHistoryLS = (): SearchResult[] => JSON.parse(localStorage.getItem('searchHistory') || '[]');
export const setHistoryLS = (data: SearchResult[]) => localStorage.setItem('searchHistory', JSON.stringify(data));
