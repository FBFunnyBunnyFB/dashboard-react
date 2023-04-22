import { useState } from "react";
import search_icon from "../icons/search.svg";
import profile_data from "../json/profile.json";
import customers_data from "../json/customers.json";
import '../css/Product.css';

const ITEMS_PER_PAGE = 8;

function Header() {
    return (
        <tr>{
            Object.values(customers_data.fields).map(field => {
                return (
                    <th className={`content__col-title ${field.toLocaleLowerCase()}`} key={field}>{field}</th>
                )
            })
        }</tr>
    )
}
function PhoneNumber(props) {
    const input = props.phone.toString();
    const [country, provider, number] = [
        input.slice(0,3), 
        input.slice(3,6), 
        input.slice(6)
    ];
    return `(${country}) ${provider}-${number}`;
}
function List(props) {
    let data = customers_data.customers;
    if(props.input === '') {
        data = customers_data.customers.slice(0, ITEMS_PER_PAGE);
    } else {
        data = customers_data.customers.filter((customer) => {
            const search_result_map = Object.keys(customers_data.fields).map(field => {
                if(!customer.hasOwnProperty(field)) return false;
                return customer[field].toString().toLocaleLowerCase().includes(props.input)
            })
            return search_result_map.includes(true);
        });
    }
    const result = data.map((customer, i) => {
        return (
            <tr className="content__row" key={`customer${i}`}>
                <td className="content__item name" key={`customer${i}-name`}>
                    {customer.name}
                </td>
                <td className="content__item company" key={`customer${i}-company`}>
                    {customer.company || "Uknown"}
                </td>
                <td className="content__item phone" key={`customer${i}-phone`}>
                    {customer.phone ? <PhoneNumber phone={customer.phone}></PhoneNumber> : "Uknown"}
                </td>
                <td className="content__item email" key={`customer${i}-email`}>
                    {customer.email || "Uknown"}
                </td>
                <td className="content__item country" key={`customer${i}-country`}>
                    {customer.country || "Uknown"}
                </td>
                <td className="content__item status" key={`customer${i}-status`}>
                    <div className={`content__status-wrapper ${customer?.status?.toLocaleLowerCase()}`}>
                        {customer.status || "Uknown"}
                    </div>
                </td>
            </tr>
        )
    });
    return result;
}
function Navigation() {
    let list_items = [];
    list_items.push(
        <li className="navigation__item" key="page-prev">&lt;</li>
    )
    for (let i = 0; i < Math.ceil(customers_data.customers.length / ITEMS_PER_PAGE); i++) {
        list_items.push(
            <li className={`navigation__item${i===0 ? " active" : ""}`} key={`page-${i}`}>{i+1}</li>
        )
    }
    list_items.push(
        <li className="navigation__item" key="page-next">&gt;</li>
    )
    if(list_items.length > 6) {
        list_items = list_items.slice(0, 5).concat(<li className="navigation__other" key="page-other">...</li>).concat(list_items.slice(-2));
    }
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                {list_items}
            </ul>
        </nav>
    )
}
function Footer() {
    return (
        <tr>
            <td colSpan="100%">
                <div className="content__footer-wrapper">
                    <h4 className="content__total">Showing data 1 to 8 of 256K entries</h4>
                    <Navigation></Navigation>
                </div>
            </td>
        </tr>
    )
}
function Customers() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        setInputText(e.target.value.toLocaleLowerCase());
    };
    return (
        <div className="customers">
            <div className="customers__top-wrapper">
                <div className="customers__header">
                    <h3 className="customers__title">All customers</h3>
                    <h4 className="customers__subtitle">Active members</h4>
                </div>
                <div className="customers__searchbar">
                    <img className="customers__search-icon" src={search_icon} alt="Search"></img>
                    <input type="search" placeholder="Search" className="customers__search-input" onChange={inputHandler}></input>
                </div>
            </div>
            <table className="content">
                <thead className="content__header">
                    <Header></Header>
                </thead>
                 <tbody className="content__body">
                    <List input={inputText}></List>
                </tbody>
                 <tfoot className="content__footer">
                    <Footer></Footer>
                 </tfoot>
            </table>        
        </div>
    )
}
function Product() {
    return (
        <div className="product">
            <h2 className="product__greeting">
                Hello {profile_data.name || "User"} 👋🏼,
            </h2>
            <Customers></Customers>
        </div>
    )
}

export default Product