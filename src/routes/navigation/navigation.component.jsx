import './navigation.styles.scss'

import { Fragment, useContext } from "react"
import { Link, Outlet } from "react-router-dom"

import { CartContext } from '../../contexts/cart.context'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context'

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    const signOutHandler = () => setCurrentUser(null)
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
                    { currentUser ? (
                        <span onClick={signOutHandler} className='nav-link'>SIGN OUT</span>
                    ) : (<Link className="nav-link" to='/auth'>
                    SIGN IN</Link>
                    )}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet /> 
        </Fragment>
    )
}

export default Navigation