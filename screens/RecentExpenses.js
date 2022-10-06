import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const RecentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 300);

    return expense.date > date7DaysAgo && expense.date <= today; // compares the dates, if greater then newer
  });

  return (
    <ExpensesOutput
      expenses={RecentExpenses}
      expensesPeriod="last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
