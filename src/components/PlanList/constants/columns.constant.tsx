import { Link } from "react-router-dom";
import { AlignType } from "rc-table/lib/interface";

import SeeMoreIcon from "../../../common/assets/more.svg";

export const columns = [
  {
    title: "Наименование направления",
    key: "nameDirection",
    dataIndex: "nameDirection",
    ellipsis: true,
  },
  {
    title: "Год набора",
    key: "year",
    dataIndex: "year",
  },
  {
    title: "Уровень образования",
    key: "educationLevel",
    dataIndex: "educationLevel",
    ellipsis: true,
  },
  {
    title: " ",
    width: "6vh",
    key: "icon",
    align: "right" as AlignType,
    render: (text: any, record: any) => (
      <Link to={`/academic-plans/${record.id}`}>
        <img src={SeeMoreIcon} alt="icon" />
      </Link>
    ),
  },
];
