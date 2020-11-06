import React from 'react'
import CustomBreadcrumbs from '../../common/components/Breadcrumb'
import CreateGoodsReceivingNote from '../../modules/GoodsReceivingNotes/CreateGoodsReceivingNote'

const AddGoodsReceivingNotePage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Tạo phiếu nhập hàng" />
      <CreateGoodsReceivingNote />
    </div>
  )
}

export default AddGoodsReceivingNotePage
