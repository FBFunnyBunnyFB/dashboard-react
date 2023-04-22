import dashboard_logo from "../icons/dashboard_logo.svg";
import profile_picture from "../images/profile_picture.png";
import profile_data from "../json/profile.json";
import menu from "../json/menu.json";
import '../css/Menu.css';

function Menu() {
    return (
        <header className="side-menu">
            <div className="logo">
                <img className="logo__icon" src={dashboard_logo} alt="Dashboard logo"></img>
                <h1 className="logo__title">Dashboard<span className="logo__version">v.01</span></h1>
            </div>
            <nav className="nav">
                <ul className="nav__list"> 
                    {
                        menu.items.map((item) => {
                            const image = require(`../icons/${item.icon}.svg`);
                            return (
                                <li key={item.title} className={`nav__item${item.has_arrow ? " arrow" : ""}${item.active ? " active" : ""}`}>
                                    <img className="nav__icon" src={image} alt={item.icon}></img>
                                    <span className="nav__title">{item.title}</span>
                                </li>
                            )
                            
                        })
                    }
                </ul>
            </nav>
            <div className="profile">
                <img className="profile__picture" src={profile_picture} alt="Profile"></img>
                <div className="profile__bio">
                    <h2 className="profile__name">{profile_data.name}</h2>
                    <h3 className="profile__position">{profile_data.position}</h3>
                </div>
            </div>
        </header>
    )
}

export default Menu