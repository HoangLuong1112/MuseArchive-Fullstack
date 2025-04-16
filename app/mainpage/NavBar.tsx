import React from 'react'

const NavBar = () => {
    return (
        <div className='h-16 w-screen bg-black text-white text-nowrap'>
            <div className='flex justify-between items-center h-full w-full p-4'>
                <div className='flex gap-10'>
                    <div className='rounded-full bg-yellow-400 '>
                        aba aba
                    </div>
                    <div className='bg-blue-400'>
                        réc réc réc
                    </div>
                </div>
                <div className='flex gap-10 items-center'>
                    <div className='bg-white text-black rounded-full p-2 ' >
                        Khám phá premium
                    </div>
                    <div className='bg-amber-400'>
                        Siêu nhân
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar