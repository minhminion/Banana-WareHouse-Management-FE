import React from 'react'
import CustomBreadcrumbs from '../../common/components/Breadcrumb'
import CreateMerchandiseReturnProposal from '../../modules/MerchandiseReturnProposals/CreateMerchandiseReturnProposal'

const root = [
  {
    link: "/merchandiseReturnProposals",
    title: "Danh sách đề nghị trả hàng",
  },
];

const AddMerchandiseReturnProposalPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Tạo phiếu đề nghị trả hàng" root={root}/>
      <CreateMerchandiseReturnProposal />
    </div>
  )
}

export default AddMerchandiseReturnProposalPage
