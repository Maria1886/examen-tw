import React from 'react';

const PageContainer = ({ children }) => {
    return (
        <>
            <br />
            <div className="container" style={{"minHeight" : "90vh"}}>
                {children}
            </div>
        </>
    );
}

export default PageContainer;