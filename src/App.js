import React, { useState } from 'react';
import Expenses from './components/Expenses';
import NewExpense from './components/NewExpense';
import ExpensesFilter from './components/ExpensesFilter';
import Chart from './components/Chart';
import './App.css';

const App = () => {

  const [expenses, setExpenses] = useState([
    { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
    { id: 'e3', title: 'Car Insurance', amount: 294.67, date: new Date(2021, 2, 28) },
    { id: 'e4', title: 'New Desk (Wooden)', amount: 450, date: new Date(2021, 5, 12) },
  ]);
  const [filteredYear, setFilteredYear] = useState('2021');
  const [showForm, setShowForm] = useState(false);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    },
      setShowForm(false));
  };

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const toggleFormHandler = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };
  const filteredExpenses = expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  const cancelButtonHandler = () => {
    setShowForm(false);
  };
  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ];

  for (const expense of filteredExpenses) {
    const expenseMonth = expense.date.getMonth();
    chartDataPoints[expenseMonth].value += expense.amount;
  }

  return (
    <div className="App">

      {showForm ? (
        <NewExpense onAddExpense={addExpenseHandler} onCancel={cancelButtonHandler} />
      ) : (
        <button onClick={toggleFormHandler} className="btn">
          Add Expense
        </button>
      )}
      <Expenses items={filteredExpenses}>
        <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        <Chart dataPoints={chartDataPoints} />
      </Expenses>

    </div>
  );
};

export default App;
