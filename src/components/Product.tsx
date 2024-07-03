function Product() {

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input type="text" className="form-control" id="productName" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="form-group">
                            <label htmlFor="price">Unit Price</label>
                            <input type="number" className="form-control" id="price" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="form-group">
                            <label htmlFor="qty">QTY On Hand</label>
                            <input type="number" className="form-control" id="qty" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="form-group">
                            <label htmlFor="image">Product Image</label>
                            <input type="file" className="form-control" id="image" />
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <button className="btn btn-primary col-12">Save Product</button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <form className="col-12"><input type="search" className="form-control" placeholder="Search Products here" /></form>
                    </div>
                    <div className="col-12 mt-3">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>#Id</th>
                                    <th>Product Name</th>
                                    <th>Unit Price</th>
                                    <th>QTY On Hand</th>
                                    <th>Delete Option</th>
                                    <th>Update Option</th>
                                    <th>See more</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1001</td>
                                    <td>Laptop</td>
                                    <td>750.00</td>
                                    <td>45</td>
                                    <td>
                                        <button className="btn btn-outline-danger btn-sm">Delete</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-success btn-sm">Delete</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-info btn-sm">View</button>
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

export default Product;