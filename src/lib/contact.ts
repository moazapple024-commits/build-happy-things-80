export const WHATSAPP_URL = `https://wa.me/97474444386?text=${encodeURIComponent(
  "Hello, I'd like to book a table at Tobize Intercontinental Restaurant.",
)}`;
export const PHONE_INTL = "+97474444386";
export const PHONE_DISPLAY = "+974 7444 4386";
export const ADDRESS_EN =
  "Tobize Intercontinental Restaurant, Freej Kulaib Area, Zone/Street No: 35, Bin Twar Center Building No: 217, Shop 4, Opposite Al Jazeera Television, 232 Ahmed Bin Ali Street, Doha, Qatar";
// Backward-compat alias (older imports)
export const ADDRESS_AR = ADDRESS_EN;
export const MAP_QUERY =
  "Tobize intercontinental restaurant, Freej Kulaib Area, Bin Twar Center, Doha, Qatar";
export const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY,
)}&hl=en&z=16&output=embed`;
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  MAP_QUERY,
)}`;
