const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.BASE_URL;
const sanitizedBase = (rawBaseUrl && rawBaseUrl.replace(/\/+$/, "")) || window.location.origin;

export const API_BASE_URL: string = sanitizedBase;
export const API_PREFIX: string = "/api";

// full api URL
export const API_URL = `${API_BASE_URL}${API_PREFIX}`;