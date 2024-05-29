import './About.css';
import AppFooter from '../app/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TypeAnimation } from 'react-type-animation';
import CompanyLogo from '../../assets/menity-logo-transparent.png';
import AppLogo from '../../assets/Logo.svg';

function About() {
    return (
        <>
            <div className='about'>

                <div className='content'>
                    <a className='link' href='/'><FontAwesomeIcon icon="fa-solid fa-chevron-left" /> &nbsp;Back to Home</a>
                    <h1>About us</h1>

                    <h2>Welcome to Menity!</h2>
                    <p>
                        We are a forward-thinking software startup based in Cape Town, founded by software engineer Avuyile Mgxotshwa in 2024. We are dedicated to empowering South African employees with the knowledge and tools they need to understand and protect their legal rights in the workplace.
                    </p>

                    <h1 className='animation'>
                        <TypeAnimation
                            sequence={[
                                'Humenity',
                                1000,
                                'Hum',
                                1000,
                                'Humanity',
                                1000,
                                '',
                                1000,
                                'Menity',
                                3000,
                            ]}
                            speed={250}
                            repeat={Infinity}
                            style={{
                                color: '#000000',
                            }}
                        />
                    </h1>

                    <h2>Our Mission</h2>
                    <p>At Menity, our mission is to make legal information accessible and understandable for all employees and laborers in South Africa. We believe that every worker deserves to know their rights and have the means to address workplace issues effectively and confidently.</p>

                    <h2>Our Vision</h2>
                    <p>We envision a future where employees are well-informed and equipped to advocate for themselves, creating fairer and more transparent workplaces across the country. Through innovative technology and a commitment to user empowerment, we strive to be a trusted resource for legal information and guidance.</p>

                    <img className='ailc-logo' alt='AI Legal Companion' src={AppLogo}></img>

                    <h2>Our Product: AI Legal Companion</h2>
                    <p>AI Legal Companion is our flagship product, designed to bridge the gap between complex legal texts and everyday workplace scenarios. Leveraging advanced AI technology, our platform provides tailored legal information, compliance checking for employment agreements, and guidance on responding to workplace incidents.</p>



                    <h2>Why Choose Menity?</h2>
                    <ul>
                        <li><strong>Innovation:</strong> We use cutting-edge AI technology to deliver precise and relevant legal information.</li>
                        <li><strong>Accessibility:</strong> Our software is free to use, ensuring that everyone has access to essential legal knowledge.</li>
                        <li><strong>Empowerment:</strong> We empower users with the information they need to make informed decisions and take appropriate actions in their workplace.</li>
                    </ul>

                    <h2>Our Team</h2>
                    <p>Menity is powered by a passionate team of professionals committed to making a positive impact. Our expertise spans technology, user experience design, and ensuring that our products are both innovative and user-friendly.</p>

                    <h2>Contact Us</h2>
                    <p>We love hearing from our users! If you have any questions, feedback, or suggestions, please don’t hesitate to reach out to us at <a className='link' href="mailto:menityapps@gmail.com">menityapps@gmail.com</a>.</p>

                    <img className='company-logo' alt='Apps by Menity' src={CompanyLogo}></img>

                    <p>Thank you for choosing Menity. Together, we can create a better workplace for everyone.</p>
                </div>
            </div>
            <AppFooter />
        </>
    )
}

export default About;