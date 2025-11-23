import React, { useState } from 'react'

export default function HorizontalCB() {
  const [isClosed, setClose] = useState(false);

  return (
    <div className='flex flex-col'>
      <div className="[&>p]:text-sm [&>p]:text-gray-600 ml-4">
        <p>MCCB</p>
        <p>3P</p>
        <p>100A</p>
        <p>16A</p>
      </div>
      <div>
        <svg
          onClick={() => setClose(!isClosed)}
        >
          {/* Left wire */}
          <line
            x1="0"
            y1="30"
            x2="35"
            y2="30"
            stroke="blue"
            strokeWidth="3"
          />
          {/* Right wire */}
          <line
            x1="85"
            y1="30"
            x2="120"
            y2="30"
            stroke="blue"
            strokeWidth="3"
          />

          {/* Left contact */}
          <circle cx="35" cy="30" r="6" fill="transparent" stroke="yellow" strokeWidth="3" />
          {/* Switch arm */}
          <line
            x1="35"
            y1="30"
            x2="85"
            y2="30"
            stroke="yellow"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              transformOrigin: "35px 30px", //origin to transform
              transform: isClosed ? "rotate(0deg)" : "rotate(-30deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          />
          {/* Right contact */}
          <circle cx="85" cy="30" r="6" fill="transparent" stroke='yellow' strokeWidth="3" />
        </svg>
      </div>
    </div>
  )
}
