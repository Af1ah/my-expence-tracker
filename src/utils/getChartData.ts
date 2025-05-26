import { Transaction } from "~/src/types/transaction";

type ChartPoint = {
  date: string;
  amount: number;
};

export const getWeeklyTotalsForMonth = (date: Date, transactions: Transaction[]) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  // Step 1: Group daily transactions in dayMap (expenses only)
  const dayMap: Record<number, number> = {};
  for (const tx of transactions) {
    const txDate = new Date(tx.date);
    if (txDate >= start && txDate <= end && tx.amount > 0) { // Only expenses (positive amounts)
      const day = txDate.getDate();
      dayMap[day] = (dayMap[day] || 0) + tx.amount;
    }
  }

  // Step 2: Calculate weekly totals based on actual calendar weeks
  const weekTotals: { weekNum: number; amount: number; start: number; end: number }[] = [];
  
  let currentWeekStart = 1;
  let weekNumber = 1;
  
  while (currentWeekStart <= end.getDate()) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), currentWeekStart);
    const dayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Calculate the end of this week
    let currentWeekEnd;
    if (weekNumber === 1) {
      // First week: end on the first Saturday or end of month
      const daysUntilSaturday = (6 - dayOfWeek) % 7;
      currentWeekEnd = Math.min(currentWeekStart + daysUntilSaturday, end.getDate());
    } else {
      // Subsequent weeks: full 7 days or until end of month
      currentWeekEnd = Math.min(currentWeekStart + 6, end.getDate());
    }
    
    // Sum up the amounts for this week
    let weekTotal = 0;
    for (let day = currentWeekStart; day <= currentWeekEnd; day++) {
      weekTotal += dayMap[day] || 0;
    }
    
    if (weekTotal > 0) {
      weekTotals.push({
        weekNum: weekNumber,
        amount: weekTotal,
        start: currentWeekStart,
        end: currentWeekEnd
      });
    }
    
    currentWeekStart = currentWeekEnd + 1;
    weekNumber++;
  }

  // Step 3: Format result with week labels
  return weekTotals.map(week => ({
    date: `Week ${week.weekNum} (${week.start}-${week.end})`,
    amount: week.amount,
  }));
};

// Alternative approach that groups by actual week boundaries (Sunday to Saturday)
export const getWeeklyTotalsForMonthByCalendarWeeks = (date: Date, transactions: Transaction[]) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  const weekMap: Record<string, number> = {};
  
  for (const tx of transactions) {
    const txDate = new Date(tx.date);
    if (txDate >= start && txDate <= end && tx.amount > 0) { // Only expenses (positive amounts)
      // Get the Sunday of the week containing this date
      const sunday = new Date(txDate);
      sunday.setDate(txDate.getDate() - txDate.getDay());
      
      const weekKey = sunday.toISOString().split('T')[0]; // YYYY-MM-DD format
      weekMap[weekKey] = (weekMap[weekKey] || 0) + tx.amount;
    }
  }
  
  // Sort weeks and format
  const sortedWeeks = Object.entries(weekMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([weekStart, amount], index) => {
      const startDate = new Date(weekStart);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      
      // Format the date range
      const startDay = Math.max(1, startDate.getDate());
      const endDay = Math.min(end.getDate(), endDate.getDate());
      
      return {
        date: `Week ${index + 1} (${startDay}-${endDay})`,
        amount,
      };
    });
  
  return sortedWeeks;
};

export const getDailyTotalsForWeek = (transactions: Transaction[]) => {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay()); // Sunday
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Saturday

  const dayMap: Record<string, number> = {};

  for (const tx of transactions) {
    const txDate = new Date(tx.date);
    if (txDate >= start && txDate <= end && tx.type == "expense") { // Only expenses (positive amounts)
      const key = txDate.toLocaleDateString("en-US", { weekday: "short" });
      dayMap[key] = (dayMap[key] || 0) + tx.amount;
    }
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days.map((day) => ({
    date: day,
    amount: dayMap[day] || 0,
  }));
};

export const getMonthlyTotalsForYear = (transactions: Transaction[]) => {
  const year = new Date().getFullYear();
  const monthMap: Record<number, number> = {};

  for (const tx of transactions) {
    const txDate = new Date(tx.date);
    if (txDate.getFullYear() === year && tx.type === 'expense') { // Only expenses (positive amounts)
      const month = txDate.getMonth(); // 0 - 11
      monthMap[month] = (monthMap[month] || 0) + tx.amount;
    }
  }

  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return monthLabels.map((month, index) => ({
    date: month,
    amount: monthMap[index] || 0,
  }));
};