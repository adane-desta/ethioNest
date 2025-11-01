
import '/css/fontawesome.min.css'
import './footer2.css'


function Footer(){

    return(
        <footer>
        <div className="containerf">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>SidamaRent</h4>
                    <p>Digital property solutions for Hawassa City</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <a href="/frontend/html-files/homepage.html">Home</a>
                    <a href="/frontend/html-files/properties.html">Properties</a>
                    <a href="/frontend/html-files/saved.html">Saved Properties</a>
                    <a href="/frontend/html-files/homepage.html/about">About</a>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p><i className="fas fa-phone"></i> +251 912 345 678</p>
                    <p><i className="fas fa-envelope"></i> info@adarerent.com</p>
                    <p><i className="fas fa-map-marker-alt"></i> Hawassa, Sidama Region, Ethiopia</p>
                </div>
            </div>
            <div className="copyright">
                <p>© 2024 Sidama Regional State Science and Technology Institute. All rights reserved.</p>
            </div>
        </div>
    </footer>
    );
}

export default Footer
