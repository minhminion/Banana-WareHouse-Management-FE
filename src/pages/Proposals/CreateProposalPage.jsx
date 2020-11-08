import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import CreateProposal from "../../modules/Proposal/CreateProposal";

const root = [
  {
    link: "/proposal",
    title: "Danh sách phiếu đề nghị",
  },
];

const ListProposalPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Tạo phiếu đề nghị" root={root}/>
      <CreateProposal />
    </div>
  );
};

export default ListProposalPage;