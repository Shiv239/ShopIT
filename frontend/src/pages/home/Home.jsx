import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";


const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="order" />
                </div>
                <div className="button">
                    <a href='/offer'>
                        <button className="offer_button">Apply Offers</button>
                    </a>
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>
                    <Table />
                </div>
            </div>
        </div>
    );
};

export default Home;
