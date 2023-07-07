import { Container } from '@mui/material';
import { useT } from '@transifex/react';
import { Link } from 'react-router-dom';
import Button from 'src/stories/button/Button';
import Title from 'src/stories/title/Title';

import { ChartBarExample, ChartData, ChartPieExample } from '../../components/ChartExample';
import DashboardChartContainer from '../../stories/dashboard/DashboardChartContainer';
import DashboardItemContainer from '../../stories/dashboard/DashboardItemContainer';

const dataPie: ChartData[] = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
];

const dataBar: ChartData[] = [
  {
    name: 'Page A',
    value: 4000,
  },
  {
    name: 'Page B',
    value: 3000,
  },
  {
    name: 'Page C',
    value: 2000,
  },
  {
    name: 'Page D',
    value: 2780,
  },
];

export function HomeOCP() {
  const t = useT();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:mb-8 md:mb-8 mb-4 md:grid-cols-2 gap-4 ">
        <div className="flex items-end col-span-1 md:mr-10">
          <Title className="mb-0" type="page" label={t('Home - Dashbaord')} />
        </div>
        <div className="flex justify-start items-start my-4 col-span-1 md:justify-end md:my-0 md:ml-10 lg:justify-end lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:flex md:gap-0">
            <div>
              <Button className="md:mr-4" label={t('MSME Applications')} component={Link} to="/admin/applications" />
            </div>

            <div>
              <Button label={t('Settings')} component={Link} to="/settings" />
            </div>
          </div>
        </div>
      </div>

      <Title type="section" label={t('MSME opt-in statistics')} className="mb-6" />
      <Container className="p-0 lg:pr-20 ml-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
          <div className="col-span-2 flex flex-row">
            <DashboardItemContainer description={t('MSMEs opted into the scheme')} value="158" />
            <DashboardItemContainer description={t('MSMEs contacted  opted into the scheme')} value="75%" />
          </div>
        </div>
        <div className="grid lg:gap-10 grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
          <div className="col-span-1">
            <DashboardChartContainer label={t('Proportion of MSMEs opting into the scheme by sector')}>
              <ChartPieExample data={dataPie} />
            </DashboardChartContainer>
          </div>
          <div className="col-span-1">
            <DashboardChartContainer label={t('Breakdown of reasons why MSMEs opted out of the scheme')}>
              <ChartBarExample data={dataBar} />
            </DashboardChartContainer>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HomeOCP;
