import React from 'react';
import './Footer.css';

function Footer(props) {
    return (
        <div className='footer'>
            <footer class="footer-distributed">
                <div className="footer-email">
                    <h2>Hãy đóng góp ý kiến về Website cho chúng tôi !</h2>
                    <p>Để giúp xây dựng một thế giới nha khoa như mong muốn.</p>
                    <div className='footer-input'>
                        <textarea name="" id="" cols="30" rows="5"></textarea>
                        <button>Gửi phản hồi</button>
                    </div>
                </div>
                <div className='footer-grid'>
                    <div className='footer-grid-item'>
                        <h5>Our solution</h5>
                        Intergrated Security Program <br></br>
                        Core Features<br></br>
                        Product Features <br></br>
                        Pricing
                    </div>
                    <div className='footer-grid-item'>
                        <h5>Our solution</h5>
                        Intergrated Security Program <br></br>
                        Core Features<br></br>
                        Product Features <br></br>
                        Pricing
                    </div>
                    <div className='footer-grid-item'>
                        <h5>Our solution</h5>
                        Intergrated Security Program <br></br>
                        Core Features<br></br>
                        Product Features <br></br>
                        Pricing
                    </div>
                    <div className='footer-grid-item'>
                        <h5>Our solution</h5>
                        Intergrated Security Program <br></br>
                        Core Features<br></br>
                        Product Features <br></br>
                        Pricing
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;