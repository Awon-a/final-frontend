import { Card, Table } from 'antd';

import { DeletePlan, GetOnePlan, Plan } from "../../types/academic-plan";

export interface PlanItemProps {
  plan: Plan,
  deletePlan: (id: DeletePlan['id']) => void;
  getOnePlan: (id: GetOnePlan['id']) => void;
}

const PlanItem = ({ plan, deletePlan, getOnePlan }: PlanItemProps) => {
const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

  return (
    <>
    <Card title="Custom Table Header">
    <Table dataSource={dataSource} columns={columns}>
      <Table.Column title="Name" dataIndex="name" key="name" />
      <Table.Column title="Age" dataIndex="age" key="age" />
      <Table.Column title="Address" dataIndex="address" key="address" />
    </Table>
    </Card>
    </>
  )
}
export default PlanItem;