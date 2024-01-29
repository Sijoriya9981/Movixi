import './headerstyle.scss'
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../../assets/movix-logo.svg";
import ContentWrapper from '../contentWrapper/ContentWrapper';
const Header = () => {
    const [show, setShow] = useState("top");  // upar ke navbar ke scrolling
    const [lastScrollY, setLastScrollY] = useState(0);  //  navbar scrolling effect ke liye
    const [mobileMenu, setMobileMenu] = useState(false);  // mobile ke menu ke liye
    const [query, setquery] = useState("");   // input search ke query collect ke liye
    const [showSearch, setShowSearch] = useState("");   //  input search show karne ke liye
    const navigate = useNavigate();   // navigate karne ke liye
    const location = useLocation();



    useEffect(() => {
        window.scrollTo(0, 0);

    }, [location])

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            }
            else {
                setShow("show")
            }
        }
        else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    }
    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        }

    }, [lastScrollY])



    const opensearch = () => {
        setMobileMenu(false);
        setShowSearch(true);

    }
    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    }

    const navigationhandler = (type) => {
        if (type === "Movies") {
            navigate("/explore/movie");
        }
        else if (type === "TV") {
            navigate("/explore/tv");
        }
    }
    const searchqueryhandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);

            }, 2000)
        }
    }

    return (

        <header style={{ right: "10px", top: "0px" }} className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")} >
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationhandler("Movies")} >Movies</li>
                    <li className="menuItem" onClick={() => navigationhandler("TV")}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={opensearch} />
                    </li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={opensearch} />
                    {mobileMenu ? <VscChromeClose onClick={() => { setMobileMenu(false) }} /> : <SlMenu onClick={openMobileMenu} />}


                </div>
            </ContentWrapper>
            {showSearch && <div className="searchBar">
                <ContentWrapper>
                    <div className="searchInput">
                        <input type="text" name="" id="" placeholder='Search for movies & tv shows ' onChange={(e) => setquery(e.target.value)} onKeyUp={searchqueryhandler} />
                        <VscChromeClose onClick={() => { setShowSearch(false) }} />
                    </div>

                </ContentWrapper>
            </div>}
        </header>



    )
}

export default Header;