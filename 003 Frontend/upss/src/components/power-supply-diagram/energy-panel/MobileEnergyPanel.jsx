import { Button } from 'antd'
import React from 'react'

export default function MobileEnergyPanel() {
    return (
        <div className='border-b-2 border-l-2 p-2 bg-white rounded-md w-110'>
            <div className='border-b-2 border-blue-800'>
                <div className='text-center font-bold'>Device name</div>
                <div className='text-center'>Load name</div>
            </div>

            <div className='border-b-2 border-blue-800'>
                <div className='flex'>
                    <p className='justify-center content-center w-40'>Status </p>
                    <div className='w-full text-center content-center font-mono text-blue-300 bg-black border border-blue-800 rounded-md p-0.5 select-none h-10 mt-2 mb-1 text-base'>
                        OPENED
                    </div>
                </div>
                <div className='flex'>
                    <p className='justify-center content-center w-40'>Current </p>
                    <div className='w-full text-center content-center font-mono text-blue-300 bg-black border border-blue-800 rounded-md p-0.5 select-none h-10 mb-2 text-base'>
                        999.99 A
                    </div>
                </div>
                <div className='flex'>
                    <p className='justify-center content-center w-40'>Voltage </p>
                    <div className='w-full text-center content-center font-mono text-blue-300 bg-black border border-blue-800 rounded-md p-0.5 select-none h-10 mb-2 text-base'>
                        999.999 V
                    </div>
                </div>
                <div className='flex'>
                    <p className='justify-center content-center w-40'>Power Consumption </p>
                    <div className='w-full text-center content-center font-mono text-blue-300 bg-black border border-blue-800 rounded-md p-0.5 select-none h-10 mb-2 text-base'>
                        9999.99 kW
                    </div>
                </div>
                <div className='flex'>
                    <p className='justify-center content-center w-40'>Energy Consumption </p>
                    <div className='w-full text-center content-center font-mono text-blue-300 bg-black border border-blue-800 rounded-md p-0.5 select-none h-10 mb-2 text-base'>
                        99999.99 kWH
                    </div>
                </div>
            </div>

            <div className='flex justify-around mt-2'>
                <Button color="green" variant="filled">
                    OPEN
                </Button>
                <Button color="red" variant="filled">
                    CLOSE
                </Button>
            </div>
        </div>
    )
}
