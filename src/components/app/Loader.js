import './Loader.css';
import { ThreeDots } from "react-loader-spinner";

function ScreenLoader() {
    return (
        <>
            <div className="screen-loader">
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#569FFF"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </>
    );
}

function InlineLoader() {
    return (
        <>
            <div className='inline-loader'>
                <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="#b1aeae"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </>
    );
}

export { ScreenLoader, InlineLoader }