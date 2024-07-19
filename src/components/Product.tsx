import AxiosInstance from "../config/axiosInstance.ts";
import React, {  useEffect, useRef, useState } from "react";
import { Modal } from 'react-bootstrap';
import {storage} from '../config/firebase'

interface Proudct {
    _id: string,
    name: string,
    description: string,
    image: string,
    unitPrice: number,
    qtyOnHand: number
}

const Product: React.FC = () => {

    const [proudcts, setProudcts] = useState<Proudct[]>([])
    const [image, setImage] = useState<File | null>(null);
    const [uImage, setUImage] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFile = async (event:React.ChangeEvent<HTMLInputElement>)=>{
        setImage(event.target.files?event.target.files[0]:null);
    }

    const handleUpdateFile = async (event:React.ChangeEvent<HTMLInputElement>)=>{
        setUImage(event.target.files?event.target.files[0]:null);
    }

    const [modalState, setModalState] = useState<boolean>(false);
    const [viewModalState, setViewModalState] = useState<boolean>(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [qtyOnHand, setQtyOnHand] = useState<number | ''>('');

    const [selectedProductId, setSelectedProductId] = useState('');
    const [updateImage, setUpdateImage] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateUnitPrice, setUpdateUnitPrice] = useState<number | ''>('');
    const [updateQtyOnHand, setUpdateQtyOnHand] = useState<number | ''>('');

    const handleClose = () => setModalState(false);
    const viewClose = () => setViewModalState(false);

    const saveProduct = async () => {
        let imageUrl = '';
        if(image){
            try{
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${Math.random()+'-'+image.name}`);
                const snapshot = await imageRef.put(image);
                imageUrl = await snapshot.ref.getDownloadURL();
            }catch(err){
                console.log(err);
            }

        }

        try {

            await AxiosInstance.post('/products/create', {
                name, description, image: imageUrl, unitPrice, qtyOnHand
            });

            setName('');
            setDescription('');
            setQtyOnHand('');
            setUnitPrice('');

            // Clear the file input value
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            findAllProducts('');

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        findAllProducts('');
    }, []);

    const findAllProducts = async (e: any) => {
        const response = await AxiosInstance.get(`/products/find-all?searchText=${e}&page=1&size=10`);
        setProudcts(response.data);
    }

    const deleteProduct = async (id: string) => {
        await AxiosInstance.delete('/Products/delete-by-id/' + id);
        findAllProducts('');
    }

    const loadModal = async (id: string) => {
        const product = await AxiosInstance.get('/products/find-by-id/' + id);
        setSelectedProductId(product.data._id);
        setUpdateName(product.data.name);
        setUpdateImage(product.data.image);
        setUpdateDescription(product.data.description);
        setUpdateUnitPrice(parseFloat(product.data.unitPrice));
        setUpdateQtyOnHand(parseFloat(product.data.qtyOnHand));

    }

    const updateProduct = async () => {
        let imageUrl2 = '';
        if(uImage){
            try{
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${Math.random()+'-'+uImage.name}`);
                const snapshot = await imageRef.put(uImage);
                imageUrl2 = await snapshot.ref.getDownloadURL();
            }catch(err){
                console.log(err);
            }

        }
        try {

            await AxiosInstance.put('/products/update/' + selectedProductId, {
                name: updateName, description: updateDescription, image: imageUrl2, qtyOnHand: updateQtyOnHand, unitPrice: updateUnitPrice
            });
            handleClose();
            findAllProducts('');

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="productName" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="form-group">
                            <label htmlFor="price">Unit Price</label>
                            <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(parseFloat(e.target.value))} className="form-control" id="price" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 mb-2">
                        <div className="form-group">
                            <label htmlFor="qty">QTY On Hand</label>
                            <input type="number" value={qtyOnHand} onChange={(e) => setQtyOnHand(parseFloat(e.target.value))} className="form-control" id="qty" />
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                        <div className="form-group">
                            <label htmlFor="image">Product Image</label>
                            <input ref={fileInputRef} onChange={handleFile} type="file" className="form-control" id="image" />
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea value={description} rows={5} onChange={(e) => setDescription(e.target.value)} className='form-control' id='description' />
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <button className="btn btn-primary col-12" onClick={saveProduct}>Save Product</button>
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
                                {proudcts.map((product, index) =>
                                    <tr key={index}>
                                        <td>#{index}</td>
                                        <td>{product.name}</td>
                                        <td>{product.unitPrice}</td>
                                        <td>{product.qtyOnHand}</td>
                                        <td>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => {
                                                if (confirm('Are you sure?')) {
                                                    deleteProduct(product._id)
                                                }
                                            }}>Delete</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-outline-success btn-sm" onClick={() => {
                                                loadModal(product._id);
                                                setModalState(true);
                                            }}>Update</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-outline-info btn-sm" onClick={() => {
                                                loadModal(product._id);
                                                setViewModalState(true);
                                            }}>View</button>
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
                    <Modal.Title>Update Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12 mb-3">
                        <img src={updateImage} alt={updateImage} width={"100%"} />
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input onChange={handleUpdateFile} type="file" className="form-control" id="image" />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input type="text" defaultValue={updateName} onChange={(e) => setUpdateName(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <textarea defaultValue={updateDescription} rows={5} onChange={(e) => setUpdateDescription(e.target.value)} className='form-control' id='description' />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input type="text" defaultValue={updateUnitPrice} onChange={(e) => setUpdateUnitPrice(parseFloat(e.target.value))} className="form-control" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" defaultValue={updateQtyOnHand} onChange={(e) => setUpdateQtyOnHand(parseFloat(e.target.value))} className="form-control" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-outline-danger' onClick={handleClose}>Close</button>
                    <button className='btn btn-outline-success' onClick={() => updateProduct()}>Update Product</button>
                </Modal.Footer>
            </Modal>

            <Modal show={viewModalState} onHide={viewClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12 mb-3">
                        <img src={updateImage} alt={updateImage} width={"100%"} />
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input type="text" defaultValue={updateName} className="form-control" />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <textarea defaultValue={updateDescription} rows={5} className='form-control' id='description' />
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input type="text" defaultValue={updateUnitPrice} className="form-control" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" defaultValue={updateQtyOnHand} className="form-control" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-outline-danger' onClick={viewClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Product;