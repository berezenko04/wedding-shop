import { SearchResult } from '@/api/products/products.types';

const SEARCH_HISTORY_KEY = 'searchHistory:v1';

export const getHistoryLS = (): SearchResult[] => {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SearchResult[]) : [];
  } catch {
    return [];
  }
};

export const setHistoryLS = (data: SearchResult[]): void => {
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(data));
  } catch {
    return;
  }
};
