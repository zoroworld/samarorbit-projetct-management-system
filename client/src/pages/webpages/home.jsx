import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <>
         <section id="hero" className="hero section" style={{ textAlign: 'center', padding: '60px 20px', background: '#f0f4f8', height:'100vh', display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ maxWidth: '800px', margin: '40px auto' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                  Welcome to Our Project Management System
                </h1>
                <p style={{ marginBottom: '2rem', fontSize: '1rem' }}>
                  Our team excels at completing project tasks with productivity and precision.
                </p>
                  <div className='d-flex justify-content-center gap-3'>
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
          </section>
  
  
        </>
        
    )
};

export default Home;