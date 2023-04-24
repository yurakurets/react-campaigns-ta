export const isWithinInterval = (start: string, end: string): boolean => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const currentDate = new Date();
  return startDate <= currentDate && currentDate <= endDate;
};
