import React from 'react'
import CustomBreadcrumbs from '../../common/components/Breadcrumb'
import ListMerchandiseReturnProposals from '../../modules/MerchandiseReturnProposals/ListMerchandiseReturnProposals'

const ListMerchandiseReturnProposalsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Danh sách đề nghị trả hàng" />
      <ListMerchandiseReturnProposals />
    </div>
  )
}

export default ListMerchandiseReturnProposalsPage
