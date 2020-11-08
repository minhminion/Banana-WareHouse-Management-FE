import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleProposalDetails from "../../modules/Proposal/SingleProposalDetails";

const root = [
  {
    link: "/proposal",
    title: "Danh sách phiếu đề nghị",
  },
];

const EditProposalPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa phiếu đề nghị" root={root}/>
      <SingleProposalDetails isEdit={true} />
    </div>
  );
};

export default EditProposalPage;
