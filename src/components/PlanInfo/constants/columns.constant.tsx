import { AlignType } from "rc-table/lib/interface";

export const columns = [
  {
    title: "Дисциплина",
    key: "disciplineName",
    dataIndex: "name",
    ellipsis: true,
    className: "left-column",
    width: "85%",
  },
  {
    title: "Зачетные единицы",
    key: "lectureH",
    dataIndex: "lectureH",
    align: "center" as AlignType,
    width: "15%",
  },
  {
    title: "Аттест",
    key: "attestation",
    dataIndex: "attestation",
    align: "center" as AlignType,
    width: "7%",
  },
  {
    title: "Семестр",
    key: "semester",
    dataIndex: "numSemester",
    align: "center" as AlignType,
    width: "7%",
  },
];
