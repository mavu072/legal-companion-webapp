import './Legal.css';
import AppFooter from '../app/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TermsOfService() {
    return (
        <>
            <div className='legal-notice'>
                <div className='content'>
                    <a className='link' href='/'><FontAwesomeIcon icon="fa-solid fa-chevron-left" /> &nbsp;Back</a>
                    <h1>Terms of Service</h1>
                    <h4>By using our website, you agree to these terms.</h4>
                    <p>Welcome to AI Legal Companion! These terms govern your use of our website and services. By accessing or using our website, you agree to comply with these terms. Please read them carefully.</p>

                    <h2>1. Use of Our Website</h2>
                    <p>You may use our website and services for lawful purposes and in accordance with these terms. You agree not to use our website in any way that violates applicable laws or regulations.</p>

                    <h2>2. Intellectual Property Rights</h2>
                    <p>Our website and its content, including text, graphics, logos, and images, are the property of Menity and are protected by copyright and other intellectual property laws. You may not use, copy, or distribute our content without our prior written consent.</p>

                    <h2>3. User Contributions</h2>
                    <p>Our website may allow users to post, submit, or share content. You are solely responsible for any content you post, submit, or share on our website, and you agree not to post any content that violates these terms or infringes on the rights of others.</p>

                    <h2>4. Disclaimer of Warranties</h2>
                    <p>Our website and services are provided on an "as is" and "as available" basis, without any warranties of any kind. We make no representations or warranties about the accuracy, completeness, or reliability of the content on our website or the results obtained from using our services.</p>

                    <p>AI Legal Companion is not operated by an authorized legal practitioner, and the information provided by this software is not intended to constitute legal advice. The responses generated from this software are for informational and educational purposes only. Users are advised to seek professional legal advice from qualified practitioners for specific legal matters and to verify the accuracy and applicability of any information obtained from this software.</p>

                    <h2>5. Limitation of Liability</h2>
                    <p>In no event will AI Legal Companion be liable for any indirect, consequential, incidental, special, or punitive damages arising out of or in connection with your use of our website or services, even if we have been advised of the possibility of such damages.</p>

                    <h2>6. Governing Law</h2>
                    <p>These terms are governed by the laws of South Africa, without regard to its conflict of laws principles. Any disputes arising out of or in connection with these terms will be resolved exclusively by the courts of South Africa.</p>

                    <h2>7. Changes to These Terms</h2>
                    <p>We reserve the right to modify or update these terms at any time. We will notify you of any changes by posting the updated terms on our website. Your continued use of our website after any changes to these terms will constitute your acceptance of the revised terms.</p>

                    <h2>8. Contact Us</h2>
                    <p>If you have any questions or concerns about these terms, please contact us at <a href="mailto:menityapps@gmail.com">menityapps@gmail.com</a>.</p>

                    <p>These terms were last updated on 14 May 2024.</p>
                </div>
            </div>
            <AppFooter />
        </>
    )
}

export default TermsOfService;