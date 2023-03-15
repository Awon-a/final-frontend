import { Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDisciplines } from "../../redux/actions/disicplines.actions";

import { DisciplineState, GetManyDisciplines } from "../../types/discipline";
import Header from "../Header/Header";
import { columns } from "./constants/columns.pagination";
import NextPage from "../../common/assets/next-page.svg";
import PrevPage from "../../common/assets/prev-page.svg";
import "./DisciplineList.css";
import { groupBy } from "lodash";

const DisciplineList = () => {
  const { disciplines, disciplinesMeta, loading } = useSelector(
    (state: DisciplineState) => state.disciplines
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDisciplines());
  }, [dispatch]);

  const data = disciplines.map((discipline) => ({
    ...discipline,
    key: discipline.id,
  }));
  const getDisciplinesDispatch = (params: GetManyDisciplines) => {
    dispatch(getDisciplines(params));
  };

  const handleGetPage = (page: number) => {
    setCurrentPage(page);
    getDisciplinesDispatch({ page });
  };

  return (
    <>
      <Header currentPath={window.location.pathname} />
      <div className="my-table-container">
        <div className="table-name">Дисциплины</div>
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
          total={disciplinesMeta.totalItems}
          onChange={handleGetPage}
          nextIcon={<img src={NextPage} alt="icon"></img>}
          prevIcon={<img src={PrevPage} alt="icon"></img>}
        />
      </div>
    </>
  );
};
export default DisciplineList;
