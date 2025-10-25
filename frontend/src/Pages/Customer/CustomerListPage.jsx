import React from 'react'
import MasterLayout from '../../Component/MasterLayout/MasterLayout'
import CustomerListComponent from "../../Component/Customer/CustomerListComponent"

function CustomerListPage() {
  return (
    <MasterLayout>
        <CustomerListComponent/>
    </MasterLayout>
  )
}

export default CustomerListPage