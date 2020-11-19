import React from 'react'
import CustomBreadcrumbs from '../../common/components/Breadcrumb'
import CreateGoodsDeliveryNote from '../../modules/GoodsDeliveryNotes/CreateGoodsDeliveryNote'

const root = [
  {
    link: "/goodsDeliveryNotes",
    title: "Danh sách phiếu xuất kho",
  },
];

const AddGoodsDeliveryNotePage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Tạo phiếu xuất kho" root={root}/>
      <CreateGoodsDeliveryNote />
    </div>
  )
}

export default AddGoodsDeliveryNotePage
