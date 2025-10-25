import React from 'react'
import MasterLayout from '../../Component/MasterLayout/MasterLayout'
import ExpenseTypeListComponent from '../../Component/ExpenseType/ExpenseTypeListComponent'

function ExpenseTypeListPage() {
  return (
    <MasterLayout>
        <ExpenseTypeListComponent/>
    </MasterLayout>
  )
}

export default ExpenseTypeListPage