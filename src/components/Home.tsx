import { useEffect, useState } from "react";
import DefaultCard from "./cards/DefaultCard";
import DefaultChart from "./cards/DefaultChart";
import MinQtyCard from "./cards/MinQtyCard";
import AxiosInstance from "../config/axiosInstance.ts";

interface Proudct {
    _id: string,
    name: string,
    description: string,
    image: string,
    unitPrice: number,
    qtyOnHand: number
}


const Home: React.FC = () => {

    const [proudcts, setProudcts] = useState<Proudct[]>([])
    const [proudctCount, setProudctCount] = useState<number>()
    const [customerCount, setCustomerCount] = useState<number>()
    const [orderCount, setOrderCount] = useState<number>()
    const [totalIncome, setTotalIncome] = useState<number>()

    useEffect(() => {
        findAllProducts();
        findAllCount();
    }, []);

    const findAllProducts = async () => {
        const response = await AxiosInstance.get('/products/find-all-min');
        setProudcts(response.data);
    }

    const findAllCount = async () => {
        const productsCount = await AxiosInstance.get('/products/find-count');
        setProudctCount(productsCount.data);

        const customersCount = await AxiosInstance.get('/customers/find-count');
        setCustomerCount(customersCount.data);

        const ordersCount = await AxiosInstance.get('/orders/find-count');
        setOrderCount(ordersCount.data);

        const totalIncome = await AxiosInstance.get('/orders/find-income');
        setTotalIncome(totalIncome.data);
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <DefaultCard thumbnail="images/film4.jpg" description="This is a wider card with supporting text below as a natural" title="Customers" value={customerCount} key={1} />
                <DefaultCard thumbnail="images/film1.jpg" description="This is a wider card with supporting text below as a natural" title="Products" value={proudctCount} key={2} />
                <DefaultCard thumbnail="images/film3.jpg" description="This is a wider card with supporting text below as a natural" title="Orders" value={orderCount} key={3} />
                <DefaultCard thumbnail="images/film2.jpg" description="This is a wider card with supporting text below as a natural" title="Income" value={totalIncome} key={4} />
            </div>
            <br />
            <div className="row">
                <div className="col-12 col-md-9">
                    <div className="context">
                        <DefaultChart />
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="context">
                        {proudcts.map((prod, index) => (
                            <MinQtyCard key={index} name={prod.name} description={prod.description} image={prod.image} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;