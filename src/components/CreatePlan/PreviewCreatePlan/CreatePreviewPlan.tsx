import { DisciplineForPlan } from "../types/plan-discipline";
import "./CreatePreviewPlan.css";

interface CreatePreviewPlanProps {
  data: {
    disciplines: DisciplineForPlan[];
    titleRow: string;
    shortcut: string;
  }[];
  courses: number;
}

const CreatePreviewPlan = ({ data, courses }: any) => {
  data = data.map((block: CreatePreviewPlanProps["data"][number]) => {
    const totalCredits = block.disciplines.reduce(
      (sum: number, curDisc: DisciplineForPlan) => sum + curDisc.totalCredits,
      0
    );
    const totalHours = block.disciplines.reduce(
      (sum: number, curDisc: DisciplineForPlan) => sum + curDisc.totalHours,
      0
    );
    const totalExamH = block.disciplines.reduce(
      (sum: number, curDisc: DisciplineForPlan) => sum + curDisc.totalExamH,
      0
    );
    const totalAudH = block.disciplines.reduce(
      (sum: number, curDisc: DisciplineForPlan) => sum + curDisc.totalAudH,
      0
    );
    const totalLectureH = block.disciplines.reduce(
      (sum: number, curDisc: DisciplineForPlan) => sum + curDisc.totalLectureH,
      0
    );
    const totalPracticeH = block.disciplines.reduce(
      (sum: number, curDisc: DisciplineForPlan) => sum + curDisc.totalPracticeH,
      0
    );
    const totalLabH = block.disciplines.reduce(
      (sum: number, curDisc: DisciplineForPlan) => sum + curDisc.totalLabH,
      0
    );
    const totalIwsH = block.disciplines.reduce(
      (sum: number, curDisc: DisciplineForPlan) => sum + curDisc.totalIwsH,
      0
    );
    const totalExamPrepH = block.disciplines.reduce(
      (sum: number, curDisc: DisciplineForPlan) => sum + curDisc.totalExamPrepH,
      0
    );
    return {
      ...block,
      totalCredits,
      totalHours,
      totalExamH,
      totalAudH,
      totalLectureH,
      totalPracticeH,
      totalLabH,
      totalIwsH,
      totalExamPrepH,
    };
  });
  return (
    <>
      <div className="preview-container">
        <div className={"preview-table-table-container"}>
          <table className="preview-table-table">
            <thead className="preview-table-table-thead">
              <tr className="preview-table-table-header-line">
                <th
                  rowSpan={2}
                  className="preview-table-table-thead-line-td-shortcut"
                >
                  Аббр.
                </th>
                <th rowSpan={2} className="preview-table-table-thead-line-td">
                  Дисциплина
                </th>
                <th
                  colSpan={3}
                  className="preview-table-table-header-line-th-attest"
                >
                  Аттест.
                </th>
                <th
                  colSpan={3}
                  className="preview-table-table-header-line-th-common-hours"
                >
                  Всего объем
                </th>
                <th
                  colSpan={4}
                  className="preview-table-table-header-line-th-aud-in-hours"
                >
                  Ауд., час
                </th>
                <th
                  colSpan={2}
                  className="preview-table-table-header-line-th-iws"
                >
                  СРС
                </th>
                {[...new Array(+courses || 0)].map((el: any, index: number) => (
                  <>
                    <th
                      rowSpan={2}
                      className="preview-table-table-header-line-th-sub"
                    >
                      {index * 2 + 1}c.
                    </th>
                    <th
                      rowSpan={2}
                      className="preview-table-table-header-line-th-sub"
                    >
                      {index * 2 + 2}c.
                    </th>
                  </>
                ))}
                <th
                  rowSpan={2}
                  className="preview-table-table-thead-line-td-department-code"
                >
                  Кафедра
                </th>
              </tr>
              <tr className="ppreview-table-table-header-line">
                <th className="preview-table-table-header-line-th-sub-attest">
                  Экз.
                </th>
                <th className="preview-table-table-header-line-th-sub-attest">
                  Зач., дз(*)
                </th>
                <th className="preview-table-table-header-line-th-sub-attest">
                  КР(р), КП(п)
                </th>
                <th
                  className="preview-table-table-header-line-th-sub-common-amount-credits"
                  style={{
                    fontWeight: "bolder",
                  }}
                >
                  ЗЕ
                </th>
                <th className="preview-table-table-header-line-th-sub-common-amount-hours">
                  Час.
                </th>
                <th className="preview-table-table-header-line-th-sub-common-amount-hours-exam">
                  Час/Экз.
                </th>
                <th className="preview-table-table-header-line-th-sub-aud-in-hours-total">
                  Всего
                </th>
                <th className="preview-table-table-header-line-th-sub-aud-in-hours">
                  лек.
                </th>
                <th className="preview-table-table-header-line-th-sub-aud-in-hours">
                  пр.
                </th>
                <th className="preview-table-table-header-line-th-sub-aud-in-hours">
                  лаб.
                </th>
                <th className="preview-table-table-header-line-th-sub-iws-total">
                  Всего
                </th>
                <th className="preview-table-table-header-line-th-sub-iws-control">
                  КСР
                </th>
              </tr>
              <div className="plan-disciplines-table-thead-separator"></div>
            </thead>
            <tbody className="preview-table-table-tbody">
              {data.map(
                (
                  block: CreatePreviewPlanProps["data"][number] & {
                    totalCredits: number;
                    totalHours: number;
                    totalExamH: number;
                    totalAudH: number;
                    totalLectureH: number;
                    totalPracticeH: number;
                    totalLabH: number;
                    totalIwsH: number;
                    totalExamPrepH: number;
                  }
                ) => (
                  <>
                    <tr className="preview-table-table-tr">
                      <td className="preview-table-table-tr-td-shortcut">
                        {block.shortcut}
                      </td>
                      <td
                        className="preview-table-table-tr-td"
                        style={{ fontWeight: "bold" }}
                      >
                        {block.titleRow}
                      </td>
                      <td className="preview-table-table-tr-td"></td>
                      <td className="preview-table-table-tr-td"></td>
                      <td className="preview-table-table-tr-td"></td>
                      <td className="preview-table-table-tr-td">
                        {block.totalCredits || ""}
                      </td>
                      <td className="preview-table-table-tr-td">
                        {block.totalHours || ""}
                      </td>
                      <td className="preview-table-table-tr-td">
                        {block.totalExamH || ""}
                      </td>
                      <td className="preview-table-table-tr-td">
                        {block.totalAudH || ""}
                      </td>
                      <td className="preview-table-table-tr-td">
                        {block.totalLectureH || ""}
                      </td>
                      <td className="preview-table-table-tr-td">
                        {block.totalPracticeH || ""}
                      </td>
                      <td className="preview-table-table-tr-td">
                        {block.totalLabH || ""}
                      </td>
                      <td className="preview-table-table-tr-td">
                        {block.totalIwsH || ""}
                      </td>
                      <td className="preview-table-table-tr-td">
                        {block.totalExamPrepH || ""}
                      </td>
                      {/* <td className="preview-table-table-tr-td"></td> */}
                      {[...new Array(+courses * 2 || 0)].map(
                        (el: any, index: number) => (
                          <td
                            className="preview-table-table-tr-td"
                            style={{ padding: "0" }}
                          ></td>
                        )
                      )}
                    </tr>
                    {block.disciplines.map(
                      (discipline: DisciplineForPlan, index: number) => (
                        <tr
                          key={discipline.id}
                          className="preview-table-table-tr"
                        >
                          <td className="preview-table-table-tr-td-shortcut">
                            {block.shortcut + "." + (index + 1)}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.name}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.examSemestersNums}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.creditsSemestersNums}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.coursesSemestersNums}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.totalCredits || ""}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.totalHours || ""}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.totalExamH || ""}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.totalAudH || ""}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.totalLectureH || ""}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.totalPracticeH || ""}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.totalLabH || ""}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.totalIwsH || ""}
                          </td>
                          <td className="preview-table-table-tr-td">
                            {discipline.totalExamPrepH || ""}
                          </td>
                          {[...new Array(+courses * 2 || 0)].map(
                            (el: any, index: number) => (
                              <td
                                className="preview-table-table-tr-td"
                                style={{ padding: "0" }}
                              >
                                <div className="preview-table-table-tr-td-aud-hours">
                                  <div className="preview-table-table-tr-td-aud-hours-cell">
                                    {discipline.semesters[index].lectureH || ""}
                                  </div>
                                  <div className="preview-table-table-tr-td-aud-hours-cell">
                                    {discipline.semesters[index].practiceH ||
                                      ""}
                                  </div>
                                  <div className="preview-table-table-tr-td-aud-hours-cell">
                                    {discipline.semesters[index].labH || ""}
                                  </div>
                                </div>
                                <div className="preview-table-table-tr-td-iws-hours">
                                  <div className="preview-table-table-tr-td-iws-hours-cell">
                                    {discipline.semesters[index].iwsH || ""}
                                  </div>
                                  <div className="preview-table-table-tr-td-iws-hours-cell">
                                    {discipline.semesters[index].examPrepSumH ||
                                      ""}
                                  </div>
                                </div>
                              </td>
                            )
                          )}
                          <td className="preview-table-table-tr-td-department-code">
                            {discipline.codeDepartment}
                          </td>
                        </tr>
                      )
                    )}
                  </>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default CreatePreviewPlan;
