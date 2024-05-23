import React from 'react';
import Sidebar from './Sidebar';

const Update = ({ children, activeTab }) => {
    return (
        <>
            <div className="my-24 xl:w-2/3 mx-auto sm:pr-14 sm:pl-8 bg-transparent">
                <div className="flex border rounded w-full  dark:bg-gray-800">
                    <Sidebar activeTab={activeTab} />
                    {children}
                </div>
            </div>
        </>
    );
}

export default Update;
