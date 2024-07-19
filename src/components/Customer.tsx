import AxiosInstance from "../config/axiosInstance.ts";
import React, { useEffect, useState } from "react";
import {Modal} from 'react-bootstrap';

interface Customer {
    _id: string,
    fullName: string,
    address: string,
    salary: number
}

const Customer: React.FC = () => {

    const [customers, setCustomers] = useState<Customer[]>([])

    const [modalState, setModalState] = useState<boolean>(false);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState<number | ''>('');

    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');
    const [updateSalary, setUpdateSalary] = useState<number | ''>('');

    const handleClose = () => setModalState(false);


    useEffect(() => {
        findAllCustomers('');
    }, []);

    const updateCustomer = async () =>{
        try {

            await AxiosInstance.put('/customers/update/'+selectedCustomerId,{
                fullName:updateName,address:updateAddress,salary:updateSalary
            });
            handleClose();
            findAllCustomers('');

        } catch (e) {
            console.log(e)
        }
    }

    const findAllCustomers = async (e: any) => {
        const response = await AxiosInstance.get(`/customers/find-all?searchText=${e}&page=1&size=10`);
        setCustomers(response.data);
    }

    const deleteCustomer = async (id: string) => {
        await AxiosInstance.delete('/customers/delete-by-id/' + id);
        findAllCustomers('');
    }

    const loadModal = async (id: string) => {
        const customer = await AxiosInstance.get('/customers/find-by-id/' + id);
        setModalState(true);
        setSelectedCustomerId(customer.data._id);
        setUpdateName(customer.data.fullName);
        setUpdateAddress(customer.data.address);
        setUpdateSalary(parseFloat(customer.data.salary));

    }

    const saveCustomer = async () => {

        try{

            const response = await AxiosInstance.post('/customers/create',{
                 fullName:name,address,salary
             });
  
            setName('');
            setSalary('');
            setAddress('');
            findAllCustomers('');
  
         }catch (e){
             console.log(e)
         }
    }

    

    return (
        <>
            <div className="container">
                <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="customerName">Customer Name</label>
                            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className='form-control' id='customerName' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="customerAddress">Customer Address</label>
                            <input value={address} onChange={(e) => { setAddress(e.target.value) }} type="text" className='form-control' id='customerAddress' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="customerSalary">Salary</label>
                            <input value={salary} onChange={(e) => { setSalary(e.target.value == '' ? '' : parseFloat(e.target.value)) }} type="number" className='form-control' id='customerSalary' />
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <button onClick={saveCustomer} className="btn btn-primary col-12">Save Customer</button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <form className="col-12"><input type="search" onChange={(e) => findAllCustomers(e.target.value)} className="form-control" placeholder="Search Customers here" /></form>
                    </div>
                    <div className="col-12 mt-3">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>#Id</th>
                                    <th>Customer Name</th>
                                    <th>Address</th>
                                    <th>Salary</th>
                                    <th>Delete Option</th>
                                    <th>Update Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer, index) =>
                                    <tr key={index}>
                                        <td>#{index}</td>
                                        <td>{customer.fullName}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.salary}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure?')) {
                                                        deleteCustomer(customer._id)
                                                    }
                                                }}
                                                className='btn btn-outline-danger btn-sm'>Delete</button>
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                loadModal(customer._id);
                                            }} className='btn btn-outline-success btn-sm'>Update</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <Modal show={modalState} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="col-12 mb-3">
                <div className="form-group">
                    <input type="text" defaultValue={updateName} onChange={(e)=>setUpdateName(e.target.value)} className="form-control" />
                </div>
            </div>
            <div className="col-12 mb-3">
                <div className="form-group">
                    <input type="text" defaultValue={updateAddress} onChange={(e)=>setUpdateAddress(e.target.value)} className="form-control" />
                </div>
            </div>
            <div className="col-12">
                <div className="form-group">
                    <input type="text" defaultValue={updateSalary} onChange={(e)=>setUpdateSalary(parseFloat(e.target.value))} className="form-control" />
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-outline-danger' onClick={handleClose}>Close</button>
          <button className='btn btn-outline-success' onClick={()=>updateCustomer()}>Update Customer</button>
        </Modal.Footer>
      </Modal>

            
        </>
    )
}

export default Customer;