export function dayMonthYearFormat(date: Date, locale = 'en-US'): string {
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
