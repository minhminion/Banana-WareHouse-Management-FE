import React from 'react'
import CustomBreadcrumbs from '../../common/components/Breadcrumb'
import CreateGoodsReceivingNote from '../../modules/GoodsReceivingNotes/CreateGoodsReceivingNote'

const root = [
  {
    link: "/goods-receiving-notes",
    title: "Danh sách phiếu nhập hàng",
  },
];

const AddGoodsReceivingNotePage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Tạo phiếu nhập hàng" root={root}/>
      <CreateGoodsReceivingNote />
    </div>
  )
}

export default AddGoodsReceivingNotePage
