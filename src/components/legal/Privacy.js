import './Legal.css';
import AppFooter from '../app/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Privacy() {
    return (
        <>
            <div className='legal-notice'>
                
                <div className='content'>
                <a className='link' href='/'><FontAwesomeIcon icon="fa-solid fa-chevron-left" /> &nbsp;Back to Home</a>
                    <h1>Privacy Policy</h1>
                    <h4>Don't worry we don't sell your information!</h4>
                    <p>At AI Legal Companion, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect the information you provide to us when using our website.</p>

                    <h2>Information We Collect</h2>
                    <ul>
                        <li><strong>Personal Information</strong>: When you use our website, we may collect personal information such as your name, email address, and other contact details you provide to us.</li>
                        <li><strong>Usage Data</strong>: We may also collect information about your interactions with our website, including your IP address, browser type, and browsing behavior.</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <p>We use the information we collect for the following purposes:</p>
                    <ul>
                        <li>To provide and maintain our website and services.</li>
                        <li>To personalize your experience and provide tailored content.</li>
                        <li>To communicate with you and respond to your inquiries.</li>
                        <li>To analyze usage trends and improve our website and services.</li>
                        <li>To comply with legal obligations and protect our rights.</li>
                    </ul>

                    <h2>Information Sharing and Disclosure</h2>
                    <p>We do not sell, trade, or rent your personal information to third parties. However, we may disclose your information in the following circumstances:</p>
                    <ul>
                        <li>With your consent or at your direction.</li>
                        <li>To trusted service providers who assist us in operating our website and providing our services.</li>
                        <li>To comply with legal requirements or respond to lawful requests from authorities.</li>
                    </ul>

                    <h2>Data Security</h2>
                    <p>We take reasonable measures to protect the security of your personal information and prevent unauthorized access, disclosure, or alteration. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

                    <h2>Data Protection</h2>
                    <p>We prioritize your privacy and the protection of your personal information. In compliance with the Protection of Personal Information Act (PoPI) of South Africa, we ensure that your personal data is handled with the utmost care and security.</p>
                    
                    <p>Our software utilizes advanced large language models (LLMs) to provide you with tailored legal information and guidance. However, we want to assure you that:</p>
                    <ul>
                        <li>No personal data is sent to or processed by the LLMs.</li>
                        <li>All data processing occurs within our secure, local environment, ensuring that your personal information remains confidential and protected.</li>
                        <li>We implement robust security measures to safeguard your data against unauthorized access, disclosure, or misuse.</li>
                    </ul>
                    <p>By using AI Legal Companion, you can trust that your privacy is our priority and that we adhere to all legal requirements to protect your personal information.</p>
                    
                    <p>If you have any questions or concerns regarding our data protection practices, please feel free to contact us.</p>

                    <h2>Your Rights</h2>
                    <p>You have the right to access, correct, or delete your personal information. If you would like to exercise these rights or have any questions about our privacy practices, please contact us at <a className='link' href="mailto:menityapps@gmail.com">menityapps@gmail.com</a>.</p>

                    <h2>Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated Privacy Policy on our website.</p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions or concerns about our Privacy Policy or data practices, please contact us at <a className='link' href="mailto:menityapps@gmail.com">menityapps@gmail.com</a>.</p>

                    <p>This Privacy Policy was last updated on 29 May 2024.</p>
                </div>
            </div>
            <AppFooter />
        </>
    )
}

export default Privacy;