import { useState } from "react";
import ExpenseList from "./components/expensetracker/expenseList";

function App(){

  const [expenses,setExpense]=useState([
    {id:1,discription:'aa',amount:12,category:'utilities' },
    {id:2,discription:'aa1',amount:22,category:'utilities' },
    {id:3,discription:'aa2',amount:45,category:'utilities' },
    {id:4,discription:'aa3',amount:54,category:'utilities' },
    {id:5,discription:'aa4',amount:56,category:'utilities' }
 ] )

  return (
   <ExpenseList expenses={expenses} onDelete={(id)=>setExpense(expenses.filter( (e) => e.id!==id )) } />
  )
  
}

export default App;