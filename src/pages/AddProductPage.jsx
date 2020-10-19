import React from 'react'
import CustomBreadcrumbs from '../common/components/Breadcrumb'
import AddProduct from '../modules/Products/AddProduct'

const AddProductPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Tạo sản phẩm" />
      <AddProduct />
    </div>
  )
}

export default AddProductPage
