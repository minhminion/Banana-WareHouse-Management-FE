import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleMerchandiseReturnProposalDetails from "../../modules/MerchandiseReturnProposals/SingleMerchandiseReturnProposalDetails";

const root = [
  {
    link: "/merchandiseReturnProposals",
    title: "Danh sách đề nghị trả hàng",
  },
];

const EditMerchandiseReturnProposalPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa phiếu đề nghị trả hàng" root={root}/>
      <SingleMerchandiseReturnProposalDetails isEdit={true} />
    </div>
  );
};

export default EditMerchandiseReturnProposalPage;
