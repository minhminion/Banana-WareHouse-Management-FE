import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleMerchandiseReturnProposalDetails from "../../modules/MerchandiseReturnProposals/SingleMerchandiseReturnProposalDetails";

const root = [
  {
    link: "/merchandiseReturnProposals",
    title: "Danh sách đề nghị trả hàng",
  },
];

const MerchandiseReturnProposalDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem phiếu đề nghị trả hàng" root={root}/>
      <SingleMerchandiseReturnProposalDetails />
    </div>
  );
};

export default MerchandiseReturnProposalDetailsPage;
