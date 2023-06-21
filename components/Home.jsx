import './Home-style.css'
const Home = () => {
    const recentPosts = []

    return (
        <div>
                <header className="showcase">
                    <h2>VerveVue</h2>
                    <p>
                        Create your own Blog, we host you gain 
                    </p>
                    <a href="#" className="btn">
                        Create Now <i className="fas fa-chevron-right"></i>
                    </a>
                </header>
                <h2 className='heading'>Recent Posts</h2><br/>
                <section className="home-cards">
                    <div>
                        <img src="https://i.ibb.co/LZPVKq9/card1.png" alt=""/>
                        <h3>New Surface Pro 7</h3>
                        <p>
                        See how Katie Sowers, Asst. Coach for the 49ers, uses Surface Pro 7
                                        to put her plans into play.
                        </p>
                        <a href="#">Learn More <i className="fas fa-chevron-right"></i></a>
                    </div>
                </section>
        </div>
    )
    }

    export default Home
