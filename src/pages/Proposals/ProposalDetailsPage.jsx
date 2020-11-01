import React from 'react'
import CustomBreadcrumbs from '../../common/components/Breadcrumb'
import SingleProposalDetails from '../../modules/Proposal/SingleProposalDetails'

const ProposalDetailsPage = () => {

  return (
    <div>
      <CustomBreadcrumbs title="Xem phiếu đề nghị" />
      <SingleProposalDetails />
    </div>
  )
}

export default ProposalDetailsPage
