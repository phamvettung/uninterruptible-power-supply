import React, { useState } from 'react'

export default function VerticalCB() {

    const [isClosed, setClose] = useState(false);

    return (
        <div className='flex'>
            <div className="[&>p]:text-sm [&>p]:text-gray-600 mt-5">
                <p>MCCB</p>
                <p>3P</p>
                <p>100A</p>
                <p>16A</p>
            </div>
            <div>
                <svg
                    onClick={() => setClose(!isClosed)}
                >
                    {/* Top wire */}
                    <line
                        x1="30"
                        y1="0"
                        x2="30"
                        y2="35"
                        stroke="blue"
                        strokeWidth="3"
                    />
                    {/* bottom wire */}
                    <line
                        x1="30"
                        y1="85"
                        x2="30"
                        y2="120"
                        stroke="blue"
                        strokeWidth="3"
                    />

                    {/* top contact */}
                    <circle cx="30" cy="35" r="6" fill="transparent" stroke="yellow" strokeWidth="3" />
                    {/* Switch arm */}
                    <line
                        x1="30"
                        y1="35"
                        x2="30"
                        y2="85"
                        stroke="yellow"
                        strokeWidth="3"
                        strokeLinecap="round"
                        style={{
                            transformOrigin: "30px 85px", //origin to transform
                            transform: isClosed ? "rotate(0deg)" : "rotate(-30deg)",
                            transition: "transform 0.3s ease-in-out",
                        }}
                    />
                    {/* bottom contact */}
                    <circle cx="30" cy="85" r="6" fill="transparent" stroke="yellow" strokeWidth="3" />

                </svg>
            </div>
        </div>
    )
}
