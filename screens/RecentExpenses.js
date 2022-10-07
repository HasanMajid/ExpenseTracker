import { useContext, useEffect, useState, useLayoutEffect } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  let recentExpenses = [];

  // console.log(fetchedExpenses.expenses);

  recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    // console.log(today);
    const date7DaysAgo = getDateMinusDays(today, 300);

    return expense.date > date7DaysAgo && expense.date <= today; // compares the dates, if greater then newer
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
