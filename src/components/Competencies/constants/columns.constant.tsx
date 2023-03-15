import { Link } from "react-router-dom";
import { AlignType } from "rc-table/lib/interface";

import SeeMoreIcon from "../../../common/assets/more.svg";

export const columns = [
  {
    title: "Номер",
    key: "code",
    dataIndex: "code",
  },
  {
    title: "Название",
    key: "name",
    dataIndex: "name",
  },
  {
    title: " ",
    width: "6vh",
    key: "icon",
    align: "right" as AlignType,
    render: (text: any, record: any) =>
      record.id && (
        <Link
          to={`/competencies/${record.id}/indicators`}
          state={{
            planName: record.nameDirection,
          }}
        >
          <img src={SeeMoreIcon} alt="icon" />
        </Link>
      ),
  },
];
