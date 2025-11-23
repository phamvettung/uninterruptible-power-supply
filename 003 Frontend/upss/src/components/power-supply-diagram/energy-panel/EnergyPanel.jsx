import { Button } from 'antd'
import React from 'react'

export default function EnergyPanel() {
    return (
        <div className='border-b-2 border-l-2 p-2 bg-white rounded-md w-40'>
            <div className='border-b-2 border-blue-800'>
                <div className='text-center font-bold'>Device name</div>
                <div className='text-center'>Load name</div>
            </div>

            <div className='border-b-2 border-blue-800'>
                <div className='w-full text-center font-mono text-blue-300 bg-black border border-blue-800 rounded-md p-0.5 select-none h-7 mt-0.5 mb-0.5 text-base'>
                    OPENED
                </div>
                <div className='w-full text-center font-mono text-blue-300 bg-black border border-blue-800 rounded-md p-0.5 select-none h-7 mb-0.5 text-base'>
                    999.99 A
                </div>
                <div className='w-full text-center font-mono text-blue-300 bg-black border border-blue-800 rounded-md p-0.5 select-none h-7 mb-0.5 text-base'>
                    999.99 V
                </div>
                <div className='w-full text-center font-mono text-blue-300 bg-black border border-blue-800 rounded-md p-0.5 select-none h-7 mb-0.5 text-base'>
                    99999.99 kW
                </div>
                <div className='w-full text-center font-mono text-blue-300 bg-black border border-blue-800 rounded-md p-0.5 select-none h-7 mb-0.5 text-base'>
                    99999.99 kWh
                </div>
            </div>

            <div className='flex justify-around mt-0.5'>
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
