
import { Spin } from "antd";
import { Suspense } from "react";

const LoadingPage = ({ children }) => {
    return (
        <Suspense fallback={
            <Spin 
                size="large"
                delay={0}
                fullscreen={true}
                tip="Loading..."
            />
        }>
            {children}
        </Suspense>
    );
};

export default LoadingPage;