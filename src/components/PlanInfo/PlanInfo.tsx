import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupBy } from "lodash";
import { useLocation, useParams } from "react-router-dom";

import Header from "../Header/Header";
import {
  AttestationNameMapper,
  BlocksNameMapper,
  PlanState,
  PlanWithInfo,
} from "../../types/academic-plan";
import { getOnePlan } from "../../redux/actions/academic-plan.actions";
import { columns } from "./constants/columns.constant";
import "./PlanInfo.css";

const PlanInfo = () => {
  const dispatch = useDispatch();
  const { plan, loading } = useSelector((state: PlanState) => state.plans);
  const { id } = useParams();
  const { state, pathname } = useLocation();

  useEffect(() => {
    dispatch(getOnePlan({ id: id! }));
  }, [dispatch, id]);
  const getDataFrom = (disciplines?: PlanWithInfo["disciplines"]) => {
    const prepared = disciplines?.map((discipline) => {
      return {
        ...discipline,
        key: discipline.id,
        numSemester: discipline.numSemester + 1,
        attestation: AttestationNameMapper[discipline.attestation],
      };
    });
    const groupedData = groupBy(prepared, "block");
    const sorted = Object.fromEntries(
      Object.entries(groupedData).sort((a, b) => Number(a[0]) - Number(b[0]))
    );
    let data: any[] = [];
    for (let module in sorted) {
      let moduleRow: any = {
        key: "module" + module,
        isBlock: true,
        name: `${Number(module) + 1}. ${BlocksNameMapper[module]}`,
      };
      data = [...data, moduleRow, ...groupedData[module]];
    }
    return data.map((row) => ({ ...row }));
  };
  const data = getDataFrom(plan?.disciplines);
  const rowClassName = (render: any, index: number) => {
    console.log({ render });
    if ("isBlock" in render && render["isBlock"]) return "table-row-block";
    return "table-row-default";
  };
  return (
    <>
      <Header currentPath={pathname!} />
      <div className="my-table-container">
        <div className="table-plan-name">
          Учебный план "{plan?.nameDirection || state?.planName}"
        </div>
        <Table
          className="plan-info"
          dataSource={data}
          rowClassName={rowClassName}
          columns={columns}
          pagination={false}
          loading={loading}
          scroll={{ y: "60vh" }}
          sticky={true}
        ></Table>
      </div>
    </>
  );
};

export default PlanInfo;
