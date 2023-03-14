import { Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCompetenciesByDiscipline } from "../../redux/actions/disicplines.actions";
import { GetManyCompetenciesByDiscipline } from "../../types/competencies";
import { DisciplineState } from "../../types/discipline";
import Header from "../Header/Header";
import { columns } from "./constants/columns.pagination";
import NextPage from "../../common/assets/next-page.svg";
import PrevPage from "../../common/assets/prev-page.svg";
import { useLocation, useParams } from "react-router-dom";
import "./DisciplineCompetencies.css";

const DisciplineCompetencies = () => {
  const { id } = useParams();
  const { state, pathname } = useLocation();

  const { competencies, competenciesMeta } = useSelector(
    (state: DisciplineState) => state.disciplines
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  console.log({
    competencies,
    competenciesMeta: competenciesMeta?.totalItems,
    id,
    currentPage,
  });
  useEffect(() => {
    dispatch(
      getCompetenciesByDiscipline({ page: currentPage, disciplineId: id! })
    );
  }, [dispatch, id]);

  const data = competencies.map((competency) => ({
    ...competency,
    key: competency.id,
  }));
  console.log({ data });
  const getCompetenciesDispatch = (params: GetManyCompetenciesByDiscipline) => {
    dispatch(getCompetenciesByDiscipline(params));
  };

  const handleGetPage = (page: number) => {
    setCurrentPage(page);
    getCompetenciesDispatch({ page, disciplineId: id! });
  };

  return (
    <>
      <Header currentPath={pathname} />
      <div className="my-table-container">
        <div className="table-name-competency">
          Компетенции для дисциплины "
          {state?.discipline && state.discipline.name}"
        </div>
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
          total={competenciesMeta.totalItems}
          onChange={handleGetPage}
          nextIcon={<img src={NextPage} alt="icon"></img>}
          prevIcon={<img src={PrevPage} alt="icon"></img>}
        />
      </div>
    </>
  );
};
export default DisciplineCompetencies;
