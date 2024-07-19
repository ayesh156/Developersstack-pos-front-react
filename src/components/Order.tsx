import AxiosInstance from "../config/axiosInstance.ts";
import React, { useEffect, useState } from "react";

interface Customer {
    _id: string,
    fullName: string,
    address: string,
    salary: number
}

interface Product {
    _id: string,
    name: string,
    description: string,
    image: string,
    unitPrice: number,
    qtyOnHand: number
}

interface Cart {
    _id: string | undefined,
    description: string | undefined,
    qty: number | undefined,
    unitPrice: number | '',
    total: number | undefined
}

const Order: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<Cart[]>([])

    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState<number | ''>('');

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const [userQty, setUserQty] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [qtyOnHand, setQtyOnHand] = useState<number | ''>('');
    const [netTotal, setNetTotal] = useState<number>(0);

    useEffect(() => {
        findAllCustomers();
        findAllProducts();
    }, []);

    useEffect(() => {
        setTotal();
    }, [cart]);

    const setTotal = () => {
        let amount = 0;
        cart.forEach((data) => {
            amount += data.total ? data.total : 0;
        });
        setNetTotal(amount);
    };

    const findAllCustomers = async () => {
        const response = await AxiosInstance.get('/customers/find-all?searchText=&page=1&size=10');
        setCustomers(response.data);
    }

    const findAllProducts = async () => {
        const response = await AxiosInstance.get('/products/find-all?searchText=&page=1&size=10');
        setProducts(response.data);
    }

    const getCustomerById = async (id: string) => {
        const customer = await AxiosInstance.get('/customers/find-by-id/' + id);
        setSelectedCustomer(customer.data);
        setAddress(customer.data.address);
        setSalary(customer.data.salary ? parseFloat(customer.data.salary) : '');
    }

    const getProductById = async (id: string) => {
        const product = await AxiosInstance.get('/products/find-by-id/' + id);
        setSelectedProduct(product.data);
        setDescription(product.data.description);
        setUnitPrice(product.data.unitPrice ? parseFloat(product.data.unitPrice) : '');
        setQtyOnHand(product.data.qtyOnHand ? parseFloat(product.data.qtyOnHand) : '');
    }

    const saveOrder = async () => {
        await AxiosInstance.post('/orders/create', {
            date: new Date(),
            customerDetails: selectedCustomer,
            totalCost: netTotal,
            products: cart,
        });
    }

    const addToCart = (newItem: Cart) => {
        setCart((prevState) => [...prevState, newItem]);
        setDescription('');
        setUnitPrice('');
        setQtyOnHand('');
        setAddress('');
        setSalary('');
        setUserQty(0); // Reset the userQty here
    }

    const handleAddProduct = () => {
        if (selectedProduct && unitPrice !== '' && userQty !== 0) {
            const cartProduct: Cart = {
                _id: selectedProduct._id,
                description: description,
                unitPrice: unitPrice,
                qty: userQty,
                total: (userQty * (unitPrice ? unitPrice : 0))
            }
            addToCart(cartProduct);
            setTotal();
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="form-group">
                            <label htmlFor="customer">Select Customer</label>
                            <select id="customer" className="form-control" onChange={e => {
                                getCustomerById(e.target.value);
                            }}>
                                <option defaultValue="Use Option">Select Value</option>
                                {customers.map((customer, index) => (
                                    <option key={index} value={customer._id}>{customer.fullName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="form-group">
                            <label htmlFor="address">Customer Address</label>
                            <input type="text" disabled value={address} className="form-control" id="address" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="form-group">
                            <label htmlFor="salary">Customer Salary</label>
                            <input type="number" disabled value={salary !== '' ? salary : ''} className="form-control" id="salary" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                        <div className="form-group">
                            <label htmlFor="product">Select Product</label>
                            <select id="product" className="form-control" onChange={e => {
                                getProductById(e.target.value);
                            }}>
                                <option defaultValue="Use Option">Select Value</option>
                                {products.map((product, index) => (
                                    <option key={index} value={product._id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-2">
                        <div className="form-group">
                            <label htmlFor="productDesc">Product Description</label>
                            <input type="text" disabled value={description} className="form-control" id="productDesc" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                        <div className="form-group">
                            <label htmlFor="price">Unit Price</label>
                            <input type="number" disabled value={unitPrice !== '' ? unitPrice : ''} className="form-control" id="price" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                        <div className="form-group">
                            <label htmlFor="qtyOnHand">QTY On Hand</label>
                            <input type="number" disabled value={qtyOnHand !== '' ? qtyOnHand : ''} className="form-control" id="qtyOnHand" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2 mb-2">
                        <div className="form-group">
                            <label htmlFor="qty">QTY</label>
                            <input type="number" value={userQty !== 0 ? userQty : ''} onChange={(e) => { setUserQty(parseFloat(e.target.value)) }} className="form-control" id="qty" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row mt-4">
                    <div className="col-12">
                        <button className="btn btn-primary col-12" onClick={handleAddProduct}>+ Add Product</button>
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
                                {cart.map((data, index) => (
                                    <tr key={index}>
                                        <td>#{data._id}</td>
                                        <td>{data.description}</td>
                                        <td>{data.unitPrice}</td>
                                        <td>{data.qty}</td>
                                        <td>{data.total}</td>
                                        <td>
                                            <button onClick={(e) => {
                                                setCart((prevState) => prevState.filter((cartData) => cartData._id !== data._id));
                                                setTotal();
                                            }} className="btn btn-outline-danger btn-sm">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="bottom-context mt-4 d-flex justify-content-between align-items-center w-100">
                            <div className="total-outer">
                                <h1 className="text-danger m-0">Total : {netTotal}</h1>
                            </div>
                            <div className="place-order">
                                <button className="btn btn-primary" onClick={saveOrder}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;
