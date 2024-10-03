import React from 'react'

function Footer() {
    return (
        <div className='flex flex-col justify-center w-full h-20 text-center border-t border-blue-400 border-solid'>
            <h3 className=''>© Copyright {new Date().getFullYear()} THN </h3>
        </div>
    )
}

export default Footer