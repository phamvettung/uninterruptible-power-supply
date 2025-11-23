import React from 'react'
import PageMeta from '../../../components/common/PageMeta';
import EnergyPanel from '../../../components/power-supply-diagram/energy-panel/EnergyPanel';
import VerticalCB from '../../../components/power-supply-diagram/circuit-breaker/VerticalCB';
import HorizontalCB from '../../../components/power-supply-diagram/circuit-breaker/HorizontalCB';
import useMedia from '../../../hooks/useMedia';
import {
  ArrowDownOutlined,
} from '@ant-design/icons';
import Arrow from '../../../components/power-supply-diagram/circuit-breaker/Arrow';
import MobileEnergyPanel from '../../../components/power-supply-diagram/energy-panel/MobileEnergyPanel';

export default function PowerSupplyDiagram() {

  const isMobile = useMedia("(max-width: 768px)");

  return (
    <>
      <PageMeta
        title="Uninterruptible Power Supply"
        description="Uninterruptible Power Supply"
      />
      {!isMobile ? (
        <div className='w-full h-full flex bg-gray-200'>
          <svg width="1500" height="830">

            <foreignObject x="450" y="120" width={85} height={120}>
              <VerticalCB />
            </foreignObject>
            <foreignObject x="950" y="120" width={85} height={120}>
              <VerticalCB />
            </foreignObject>
            <foreignObject x="690" y="220" width={120} height={120}>
              <HorizontalCB />
            </foreignObject>

            <line x1="80" y1="330" x2="690" y2="330" stroke="blue" strokeWidth="3" />
            <line x1="810" y1="330" x2="1410" y2="330" stroke="blue" strokeWidth="3" />

            <foreignObject x="20" y="330" width={120} height={120}>
              <VerticalCB />
            </foreignObject>
            <foreignObject x="190" y="330" width={120} height={120}>
              <VerticalCB />
            </foreignObject>
            <foreignObject x="360" y="330" width={120} height={120}>
              <VerticalCB />
            </foreignObject>
            <foreignObject x="530" y="330" width={120} height={120}>
              <VerticalCB />
            </foreignObject>
            <foreignObject x="820" y="330" width={120} height={120}>
              <VerticalCB />
            </foreignObject>
            <foreignObject x="990" y="330" width={120} height={120}>
              <VerticalCB />
            </foreignObject>
            <foreignObject x="1160" y="330" width={120} height={120}>
              <VerticalCB />
            </foreignObject>
            <foreignObject x="1330" y="330" width={120} height={120}>
              <VerticalCB />
            </foreignObject>


            <foreignObject x="250" y="40" width={160} height={256}>
              <EnergyPanel />
            </foreignObject>
            <foreignObject x="1080" y="40" width={160} height={256}>
              <EnergyPanel />
            </foreignObject>

            <foreignObject x="10" y="520" width={160} height={256}>
              <EnergyPanel />
            </foreignObject>
            <foreignObject x="180" y="520" width={160} height={256}>
              <EnergyPanel />
            </foreignObject>
            <foreignObject x="350" y="520" width={160} height={256}>
              <EnergyPanel />
            </foreignObject>
            <foreignObject x="520" y="520" width={160} height={256}>
              <EnergyPanel />
            </foreignObject>
            <foreignObject x="810" y="520" width={160} height={256}>
              <EnergyPanel />
            </foreignObject>
            <foreignObject x="980" y="520" width={160} height={256}>
              <EnergyPanel />
            </foreignObject>
            <foreignObject x="1150" y="520" width={160} height={256}>
              <EnergyPanel />
            </foreignObject>
            <foreignObject x="1320" y="520" width={160} height={256}>
              <EnergyPanel />
            </foreignObject>

            <line x1="519" y1="230" x2="519" y2="330" stroke="blue" strokeWidth="3" />
            <line x1="1019" y1="230" x2="1019" y2="330" stroke="blue" strokeWidth="3" />

            <foreignObject x="74" y="450" width={30} height={37}>
              <Arrow />
            </foreignObject>
            <foreignObject x="244" y="450" width={30} height={37}>
              <Arrow />
            </foreignObject>
            <foreignObject x="414" y="450" width={30} height={37}>
              <Arrow />
            </foreignObject>
            <foreignObject x="584" y="450" width={30} height={37}>
              <Arrow />
            </foreignObject>
            <foreignObject x="874" y="450" width={30} height={37}>
              <Arrow />
            </foreignObject>
            <foreignObject x="1044" y="450" width={30} height={37}>
              <Arrow />
            </foreignObject>
            <foreignObject x="1214" y="450" width={30} height={37}>
              <Arrow />
            </foreignObject>
            <foreignObject x="1384" y="450" width={30} height={37}>
              <Arrow />
            </foreignObject>

            <circle cx="519" cy="75" r="20" fill="transparent" stroke="gray" strokeWidth="3" />
            <circle cx="519" cy="100" r="20" fill="transparent" stroke="gray" strokeWidth="3" />
            <circle cx="1019" cy="75" r="20" fill="transparent" stroke="gray" strokeWidth="3" />
            <circle cx="1019" cy="100" r="20" fill="transparent" stroke="gray" strokeWidth="3" />

            <line x1="530" y1="180" x2="989" y2="180" stroke="blue" strokeWidth="2" strokeDasharray={2.5} />
            <line x1="750" y1="180" x2="750" y2="300" stroke="blue" strokeWidth="2" strokeDasharray={2.5} />
          </svg>
        </div>
      ) : (
        <div className='flex flex-col'>
          <MobileEnergyPanel />
          <MobileEnergyPanel />
          <MobileEnergyPanel />
          <MobileEnergyPanel />
          <MobileEnergyPanel />
          <MobileEnergyPanel />
          <MobileEnergyPanel />
          <MobileEnergyPanel />
          <MobileEnergyPanel />
          <MobileEnergyPanel />
        </div>
      )}
    </>
  )
}
