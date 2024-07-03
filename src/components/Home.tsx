import DefaultCard from "./cards/DefaultCard";
import DefaultChart from "./cards/DefaultChart";
import MinQtyCard from "./cards/MinQtyCard";

function Home() {
    
    return (
        <div className="container mt-4">
            <div className="row">
                <DefaultCard thumbnail="images/film4.jpg" description="This is a wider card with supporting text below as a natural" title="Customers" value={250} key={1} />
                <DefaultCard thumbnail="images/film1.jpg" description="This is a wider card with supporting text below as a natural" title="Products" value={220} key={2} />
                <DefaultCard thumbnail="images/film3.jpg" description="This is a wider card with supporting text below as a natural" title="Orders" value={280} key={3} />
                <DefaultCard thumbnail="images/film2.jpg" description="This is a wider card with supporting text below as a natural" title="Income" value={270} key={4} />
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
                        <MinQtyCard />
                        <MinQtyCard />
                        <MinQtyCard />
                        <MinQtyCard />
                        <MinQtyCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;