import { Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPlans } from "../../redux/actions/academic-plan.actions";
import { GetManyPlans, PlanState } from "../../types/academic-plan";
import { columns } from "./constants/columns.constant";
import "./PlansList.css";
import NextPage from "../../common/assets/next-page.svg";
import PrevPage from "../../common/assets/prev-page.svg";
import Header from "../Header/Header";

const PlansList = () => {
  const { plans, plansMeta } = useSelector((state: PlanState) => state.plans);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  console.log({ plans, plansMeta: plansMeta?.totalItems, currentPage });
  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

  const data = plans.map((plan) => ({ ...plan, key: plan.id }));

  const getPlansDispatch = (params: GetManyPlans) => {
    dispatch(getPlans(params));
  };

  const handleGetPage = (page: number) => {
    setCurrentPage(page);
    getPlansDispatch({ page });
  };

  return (
    <>
      <Header currentPath={window.location.pathname} />
      <div className="my-table-container">
        <div className="table-name">Учебные планы</div>
        <Table
          className="my"
          dataSource={data}
          columns={columns}
          pagination={false}
        ></Table>
      </div>
      <div className="pagination-table">
        <Pagination
          key="pagination"
          current={currentPage}
          total={plansMeta.totalItems}
          onChange={handleGetPage}
          nextIcon={<img src={NextPage} alt="icon"></img>}
          prevIcon={<img src={PrevPage} alt="icon"></img>}
        />
      </div>
    </>
  );
};

export default PlansList;
