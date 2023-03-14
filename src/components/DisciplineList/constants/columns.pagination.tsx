import { Link } from "react-router-dom";
import { AlignType } from "rc-table/lib/interface";

import SeeMoreIcon from "../../../common/assets/more.svg";

export const columns = [
  {
    title: "Название дисциплины",
    key: "name",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "Код подразделения",
    key: "codeDepartment",
    dataIndex: "codeDepartment",
  },
  {
    title: " ",
    width: "6vh",
    key: "icon",
    align: "right" as AlignType,
    render: (text: any, record: any) => (
      <Link to={`/disciplines/${record.id}/competencies`}>
        <img src={SeeMoreIcon} alt="icon" />
      </Link>
    ),
  },
];
