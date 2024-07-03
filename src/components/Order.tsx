function Order() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                        <div className="form-group">
                            <label htmlFor="customer">Select Customer</label>
                            <select id="customer" className="form-control">
                                <option defaultValue="Use Option" disabled>Use Options</option>
                                <option value="">Customer 1</option>
                                <option value="">Customer 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                        <div className="form-group">
                            <label htmlFor="name">Customer Name</label>
                            <input type="text" disabled className="form-control" id="name" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                        <div className="form-group">
                            <label htmlFor="address">Customer Address</label>
                            <input type="text" disabled className="form-control" id="address" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                        <div className="form-group">
                            <label htmlFor="salary">Customer Salary</label>
                            <input type="number" disabled className="form-control" id="salary" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                        <div className="form-group">
                            <label htmlFor="product">Select Product</label>
                            <select id="product" className="form-control">
                                <option defaultValue="Use Option" disabled>Use Options</option>
                                <option value="">Customer 1</option>
                                <option value="">Customer 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                        <div className="form-group">
                            <label htmlFor="productDesc">Product Description</label>
                            <input type="text" disabled className="form-control" id="productDesc" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                        <div className="form-group">
                            <label htmlFor="price">Unit Price</label>
                            <input type="number" disabled className="form-control" id="price" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                        <div className="form-group">
                            <label htmlFor="qtyOnHand">QTY On Hand</label>
                            <input type="number" disabled className="form-control" id="qtyOnHand" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                        <div className="form-group">
                            <label htmlFor="qty">QTY</label>
                            <input type="number" disabled className="form-control" id="qty" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-12">
                        <button className="btn btn-primary col-12">+ Add Product</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-3">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>#Id</th>
                                    <th>Product Name</th>
                                    <th>Unit Price</th>
                                    <th>QTY</th>
                                    <th>Total</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1001</td>
                                    <td>Product 1</td>
                                    <td>240.00</td>
                                    <td>10</td>
                                    <td>2400.00</td>
                                    <td>
                                        <button className="btn btn-outline-danger btn-sm">Remove</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="bottom-context mt-4 d-flex justify-content-between align-items-center w-100">
                            <div className="total-outer">
                                <h1 className="text-danger m-0">Total : 2550.00</h1>
                            </div>
                            <div className="place-order">
                                <button className="btn btn-primary">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;