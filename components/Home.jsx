import './Home-style.css'
const Home = () => {
    const recentPosts = []

    return (
        <div>
                <header class="showcase">
                    <h2>Responsive Blog App</h2>
                    <p>
                        Create your own Blog, we host you gain 
                    </p>
                    <a href="#" class="btn">
                        Create Now <i class="fas fa-chevron-right"></i>
                    </a>
                </header>
                <h2 className='heading'>Recent Posts</h2><br/>
                <section class="home-cards">
                    <div>
                        <img src="https://i.ibb.co/LZPVKq9/card1.png" alt=""/>
                        <h3>New Surface Pro 7</h3>
                        <p>
                        See how Katie Sowers, Asst. Coach for the 49ers, uses Surface Pro 7
                                        to put her plans into play.
                        </p>
                        <a href="#">Learn More <i class="fas fa-chevron-right"></i></a>
                    </div>
                </section>
            
            <footer class="footer">
                <div class="footer-inner">
                <div><i class="fas fa-globe fa-2x"></i> Developed by Rushyendra </div>
                    <ul>
                        <li><a href="#">Sitemap</a></li>
                        <li><a href="#">Contact Microsoft</a></li>
                        <li><a href="#">Privacy & cookies</a></li>
                        <li><a href="#">Terms of use</a></li>
                        <li><a href="#">Safety & eco</a></li>
                        <li><a href="#">About our ads</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
    }

    export default Home
