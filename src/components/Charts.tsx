/* eslint-disable react/require-default-props */

/* eslint-disable react/no-array-index-key */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import Text from 'src/stories/text/Text';

import { COLORS } from '../constants';
import { ChartData } from '../schemas/statitics';

interface ChartsProps {
  data: ChartData[];
}

const COLORS_TO_FILL = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#82ca9d',
  '#8884d8',
  COLORS.darkGreen,
  COLORS.red,
  COLORS.yellow,
];

export function ChartPie({ data }: ChartsProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((_entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cell key={`cell-${index}`} fill={COLORS_TO_FILL[index % COLORS_TO_FILL.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ChartBar({ data }: ChartsProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (_data: any, index: number) => {
    setActiveIndex(index);
  };
  const selected = data[activeIndex];
  return (
    <>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={140} data={data}>
          <Bar dataKey="value" fill={COLORS.darkGreen} onClick={handleClick}>
            {data.map((_entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? '#82ca9d' : COLORS.darkGreen}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {selected && (
        <Text className="mb-0">
          {selected.name}: {selected.value}
        </Text>
      )}
    </>
  );
}
