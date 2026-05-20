export const formatBreadcrumb = (value: string) => {
  return decodeURIComponent(value)
    .split("-") 
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(" ");
};