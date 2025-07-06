import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0">
              {/* <img
                className="h-8 w-8"
                src="/logo.svg"
                alt="Logo"
              /> */}
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              {/* Navigation links can be added here */}
            </div>
          </div>
          <div className="flex items-center">
            <Link
                    to="/login"
                      style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                      }}
                    >
                      Signup
                    </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;