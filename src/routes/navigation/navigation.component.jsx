import './navigation.styles.scss'

import { Link, Outlet } from "react-router-dom"

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { Fragment } from "react"

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                </div>
            </div>
            <Outlet /> 
        </Fragment>
    )
}

export default Navigation