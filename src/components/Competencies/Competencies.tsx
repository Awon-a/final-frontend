import { Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NextPage from "../../common/assets/next-page.svg";
import PrevPage from "../../common/assets/prev-page.svg";
import { getCompetencies } from "../../redux/actions/competencies.actions";
import { CompetencyState, GetManyCompetencies } from "../../types/competencies";
import Header from "../Header/Header";
import { columns } from "./constants/columns.constant";

const Competencies = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { competencies, competenciesMeta, loading } = useSelector(
    (state: CompetencyState) => state.competencies
  );
  console.log({
    competencies,
    competenciesMeta: competenciesMeta?.totalItems,
    currentPage,
  });
  useEffect(() => {
    dispatch(getCompetencies({ page: currentPage }));
  }, [dispatch]);

  const data = competencies?.map((competency) => {
    return {
      ...competency,
      key: competency.id,
    };
  });

  const getPlansDispatch = (params?: GetManyCompetencies) => {
    dispatch(getCompetencies(params));
  };

  const handleGetPage = (page: number) => {
    setCurrentPage(page);
    getPlansDispatch({ page });
  };
  return (
    <>
      <Header currentPath={window.location.pathname} />
      <div className="my-table-container">
        <div className="table-name">Компетенции</div>
        <Table
          className="my"
          dataSource={data}
          columns={columns}
          pagination={false}
          loading={loading}
        ></Table>
      </div>
      <div className="pagination-table">
        <Pagination
          key="pagination"
          current={currentPage}
          total={competenciesMeta.totalItems}
          onChange={handleGetPage}
          nextIcon={<img src={NextPage} alt="icon"></img>}
          prevIcon={<img src={PrevPage} alt="icon"></img>}
        />
      </div>
    </>
  );
};
export default Competencies;
