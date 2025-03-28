import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
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

export default function PieChartWithCenterLabel({
  stats = [],
}: {
  stats: { id: string; value: number; color: string }[];
  label?: number;
}) {
  if (!stats.length) {
    return (
      <div className="flex items-center justify-center text-gray-500">
        No Data Available
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <PieChart
        series={[
          {
            data: stats,
            innerRadius: "70%",
            outerRadius: "90%",
            cx: "50%",
            cy: "50%",
          },
        ]}
        width={200}
        height={200}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        slotProps={{ legend: { hidden: true } }}
      >
        <PieCenterLabel>Rating: 9.5</PieCenterLabel>
      </PieChart>
    </div>
  );
}
