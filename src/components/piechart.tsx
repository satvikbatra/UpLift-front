import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel({ data, label }: { data: { id: string; value: number }[], label?: number }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <PieChart 
        series={[{ data, innerRadius: 100, outerRadius: 130, cx: '50%', cy: '50%' }]} 
        width={300} 
        height={300}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }} 
        slotProps={{ legend: { hidden: true } }}
      >
        <PieCenterLabel>{label?.toFixed(2)}</PieCenterLabel>
      </PieChart>
    </div>
  );
}
