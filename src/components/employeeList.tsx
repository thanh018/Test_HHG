import React, {
  useState,
  useEffect
} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import * as _ from 'lodash';


const BASE_URL = 'https://609e1e8533eed80017957b45.mockapi.io/users';

interface IEmployee {
  id: string;
  name: string;
  email: string;
  position: string;
}

interface IFormData {
  name: string;
  email: string;
  position: string;
}

interface IErrors {
  name: boolean;
  email: boolean;
  position: boolean;
}

const EmployeeList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const keysForm: Array<string> = ['name', 'email', 'position'];


  type formType = {
    [key: string]: string
  }

  type errorsType = {
    [key: string]: boolean
  }

  const initFormData: formType = {
    name: '',
    email: '',
    position: '',
  };

  const initErrors: errorsType = {
    name: false,
    email: false,
    position: false,
  }

  const [employeeList, setEmployeeList] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initErrors);
  const [loading, setLoading] = useState(false);

  const fetchEmployeeList = async (page = 2) => {
    const res = await axios.get(`${BASE_URL}/?page=${page}&limit=5`);
    const list = _.get(res, 'data.list', []);
    const total = _.get(res, 'data.total', 0);
    setTotal(total);
    setEmployeeList(list);
  };
  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const goInfoEmployee = async (id:string) => {
    setIsOpen(true);
    const res = await axios.get(`${BASE_URL}/${id}`);
    if (!_.isEmpty(res.data)) {
      setFormData(res.data)
    }
  };

  const deleteEmployee = async (id:string) => {
    setLoading(true);
    const res = await axios.delete(`${BASE_URL}/${id}`);
    if (!_.isEmpty(res.data) || [200, 201].includes(res.status)) {
      fetchEmployeeList();
      setLoading(false);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: !value
    })
  };

  const submitForm = () => {
    const tempErrors: errorsType = {};

    for (let key of keysForm) {
      tempErrors[key] = !formData[key];
    }

    setErrors(tempErrors);
    const isErrors = Object.values(tempErrors).some((val: boolean) => val);
    
    if (isErrors)
      return;

    setLoading(true);
    const id = _.get(formData, 'id', '');
    const saveEmp = async () => {
      const res =  id ? await axios.put(`${BASE_URL}/${id}`, formData)
        : await axios.post(BASE_URL, formData);
      if (!_.isEmpty(res.data) || [200, 201].includes(res.status)) {
        fetchEmployeeList();
        closeEmployee();
        setLoading(false);
      }
    };
    saveEmp();
  };

  const closeEmployee = () => {
    setIsOpen(false);
    setFormData(initFormData);
    setErrors(initErrors);
    setLoading(false);
  };

  const renderPagination = (totalItem:number) => {
    if (!totalItem) return null;
    const num1 = Math.floor(totalItem / 5);
    const num2 = totalItem / 5 - Math.floor(totalItem / 5);
    const totalPage = num1 + (num2 > 0 ? 1 : 0);
    let results = [];
    for (let i = 1; i <= totalPage; i++) {
      results.push(i);
    }
    return (<ul>{results.map(rs=>
      <li onClick={() => fetchEmployeeList(rs)} key={rs}>{rs}</li>)}</ul>
    );
    
  } 

  return (
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
          <th>Action</th>
        </tr>
        {employeeList.length > 0 &&
          employeeList.map(({id, name, email, position})=>(
          <tr key={id}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{position}</td>
            <td>
              <button onClick={()=>goInfoEmployee(id)}>Edit</button>
              <button onClick={()=>deleteEmployee(id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
      <div className="pagination">
        {
          employeeList.length > 0 && renderPagination(total)
        }
      </div>
      <button onClick={() => setIsOpen(true)}>New</button>
      <Modal isOpen={isOpen}>
        <div className="relative">
          <div className={`${loading ? 'loading' : 'd-none'}`}>
            <div className="spinner"></div>
          </div>
          <p>Create a new employee</p>
          <form>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={handleInput}
              />
              {
                errors.name && !formData.name &&
                  <p className="error">Name must not empty</p>
              }
            </div>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Enter employee email"
                value={formData.email}
                onChange={handleInput}
              />
              {
                errors.email && !formData.email &&
                  <p className="error">Email must not empty</p>
              }
            </div>
            <div>
              <input
                type="text"
                name="position"
                placeholder="Enter employee position"
                value={formData.position}
                onChange={handleInput}
              />
              {
                errors.position && !formData.position &&
                  <p className="error">Position must not empty</p>
              }
            </div>
        </form>
          <button onClick={closeEmployee}>Close</button>
          <button onClick={submitForm}>Save</button>
        </div>
      </Modal>
    </>
  )
}
Modal.setAppElement("#root");
export default EmployeeList;