
import {Link, useLoaderData, useLocation, useNavigate, useParams} from "react-router";

import {cn} from "~/../lib/util";

const RootNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const params = useParams();
    const user = useLoaderData();

    const handleLogout = async () => {
        
        navigate('/sign-in')
    }

    console.log(user)

    return (
        <nav className={cn('w-full fixed z-50 glassmorphism')}>
            <header className="root-nav wrapper">
                <Link to='/' className="link-logo">
                    <img src="/assets/logo.png" alt="logo" className="size-[30px]" />
                    <h1>Resvy</h1>
                </Link>

             {user ?   <aside>
                    {
                    // user.status === 'admin'
                    true
                     && (
                        <Link to="/dashboard" className={cn('text-base font-normal text-white', {"text-dark-100": location.pathname.startsWith('/travel')})}>
                            Admin Panel
                        </Link>
                    )}

                    <img src={user?.imageUrl || '/assets/images/david.wepb'} alt="user" referrerPolicy="no-referrer" />

                    <button onClick={handleLogout} className="cursor-pointer">
                        <img
                            src="/assets/icons/logout.svg"
                            alt="logout"
                            className="size-6 rotate-180"
                        />
                    </button>
                </aside> : 
                
                <aside>

                    <Link to="/login" className={cn('text-base font-semibold text-primary-400', )}>
                            Login
                    </Link>

                    <Link to="/signup" className={'text-base bg-primary-500 rounded-2xl  p-2 font-normal text-white'}>
                            Sign Up
                    </Link>
                </aside>
                
                }
            </header>
        </nav>
    )
}
export default RootNavbar