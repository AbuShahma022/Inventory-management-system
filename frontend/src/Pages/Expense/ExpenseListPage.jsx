import React from 'react'
import MasterLayout from '../../Component/MasterLayout/MasterLayout'
import ExpenseListComponent from '../../Component/Expense/ExpenseListComponent'

function ExpenseListPage() {
  return (
    <MasterLayout>
      <ExpenseListComponent />
      </MasterLayout>
  )
}

export default ExpenseListPage