import { useState } from "react";
import ExpenseList from "./components/expensetracker/ExpenseList";
import ExpenseFilter from "./components/expensetracker/ExpenseFilter";
import ExpenseForm from "./components/expensetracker/ExpenseForm";
import categories from "./components/expensetracker/data";

function App() {

  const [expenses, setExpense] = useState([
    { id: 1, description: "aa", amount: 12, category: "Utilities" },
    { id: 2, description: "aa1", amount: 22, category: "Utilities" },
    { id: 3, description: "aa2", amount: 45, category: "Utilities" },
    { id: 4, description: "aa3", amount: 54, category: "Utilities" },
    { id: 5, description: "aa4", amount: 56, category: "Utilities" },
    { id: 6, description: "aa5", amount: 66, category: "Groceries" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const visibleCategories = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      <div className="mb-5" >
        <ExpenseForm />
      </div>
    
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <ExpenseList
        expenses={visibleCategories}
        onDelete={(id) => setExpense(expenses.filter((e) => e.id !== id))}
      />
    </>
  );
}

export default App;
