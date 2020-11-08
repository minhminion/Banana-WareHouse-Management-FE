import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleProposalDetails from "../../modules/Proposal/SingleProposalDetails";

const root = [
  {
    link: "/proposal",
    title: "Danh sách phiếu đề nghị",
  },
];

const ProposalDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem phiếu đề nghị" root={root} />
      <SingleProposalDetails />
    </div>
  );
};

export default ProposalDetailsPage;
