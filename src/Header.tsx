import { Link, NavLink } from "react-router-dom";

const activeStyle = {
    color: "purple"
}

const Header = () => {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to={"/"}>

                                <img alt="Carved Rock Fitness" src="/images/logo.png" />
                            </Link>
                        </li>
                        <li>
                            <NavLink to={"/shoes"} style={activeStyle}>

                                Shoes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/cart"} style={activeStyle}>

                                Cart
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
export default Header;