import React, { FunctionComponent, useState } from 'react';

interface Employee {
    id: string;
    name: string;
    email: string;
    position: string;
}

const EmployeeList:FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
  const [clicks, setClicks] = useState(initial);
  return <>
    <table>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
        </tr>
        <tr>
            <td>James</td>
            <td>james@gmail.com</td>
            <td>Head of Engineer</td>
        </tr>
        <tr>
            <td>Nick</td>
            <td>nick@gmail.com</td>
            <td>Head of Product</td>
        </tr>
    </table>
  </>
}
export default EmployeeList;