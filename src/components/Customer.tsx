function Customer() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="customerName">Customer Name</label>
                            <input type="text" className="form-control" id="customerName" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="customerAddress">Customer Address</label>
                            <input type="text" className="form-control" id="customerAddress" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="customerSalary">Customer Salary</label>
                            <input type="number" className="form-control" id="customerSalary" />
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <button className="btn btn-primary col-12">Save Customer</button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <form className="col-12"><input type="search" className="form-control" placeholder="Search Customers here" /></form>
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
                                <tr>
                                    <td>1001</td>
                                    <td>Thisara Lakshan</td>
                                    <td>Colombo</td>
                                    <td>25000.00</td>
                                    <td>
                                        <button className="btn btn-outline-danger btn-sm">Delete</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-success btn-sm">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1002</td>
                                    <td>Eshara Uddipana</td>
                                    <td>Matara</td>
                                    <td>25000.00</td>
                                    <td>
                                        <button className="btn btn-outline-danger btn-sm">Delete</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-success btn-sm">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Customer;