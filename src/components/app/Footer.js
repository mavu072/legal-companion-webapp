/**
 * Main footer
 * @returns App footer
 */
function AppFooter() {
    return (
        <>
            <footer className='landing-footer'>
                <span data-date={new Date().getFullYear()}>Menity</span>
                <div>
                    <a href='/privacy'>Privacy</a>
                    <a href='/terms'>Terms of Service</a>
                </div>
            </footer>
        </>
    )
}

export default AppFooter;