import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleProposalDetails from "../../modules/Proposal/SingleProposalDetails";

const EditProposalPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa phiếu đề nghị" />
      <SingleProposalDetails isEdit={true} />
    </div>
  );
};

export default EditProposalPage;
