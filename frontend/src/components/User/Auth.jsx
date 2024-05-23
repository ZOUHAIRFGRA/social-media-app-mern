import React from 'react';

const Auth = ({ children }) => {
    return (
        <div className="w-full h-full bg-gray-900 text-white">

            <div className="flex w-full h-screen md:w-2/3 py-8 mx-auto">

                <div className="flex flex-col gap-3 w-full md:w-2/5 mx-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Auth;
