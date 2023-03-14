import { Link } from "react-router-dom";
import { AlignType } from "rc-table/lib/interface";

import SeeMoreIcon from "../../../common/assets/more.svg";

export const columns = [
  {
    title: "Название компетенции",
    key: "name",
    dataIndex: "name",
  },
  {
    title: " ",
    width: "6vh",
    key: "icon",
    align: "right" as AlignType,
    render: (text: any, record: any) => (
      <Link to={`/competencies/${record.id}/indicators`}>
        <img src={SeeMoreIcon} alt="icon" />
      </Link>
    ),
  },
];
