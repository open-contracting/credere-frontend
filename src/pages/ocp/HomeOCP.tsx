import { Container, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useT } from '@transifex/react';
import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/stories/button/Button';
import Title from 'src/stories/title/Title';

import { ChartBar, ChartMultipleBar, ChartPie } from '../../components/Charts';
import LendersButtonGroup from '../../components/LendersButtonGroup';
import { MSME_TYPES, MSME_TYPES_NAMES, STATISTICS_DATE_FILTER, STATISTICS_DATE_FILTER_OPTIONS } from '../../constants';
import CURRENCY_FORMAT_OPTIONS from '../../constants/intl';
import useGetStatisticsOCP from '../../hooks/useGetStatisticsOCP';
import useGetStatisticsOCPoptIn from '../../hooks/useGetStatisticsOCPoptIn';
import { DECLINE_FEEDBACK_NAMES } from '../../schemas/application';
import { ChartData, GENEDER_NAMES, STATUS_GROUPS } from '../../schemas/statitics';
import DashboardChartContainer from '../../stories/dashboard/DashboardChartContainer';
import DashboardItemContainer from '../../stories/dashboard/DashboardItemContainer';
import { DatePicker, Input } from '../../stories/form-input/FormInput';
import Loader from '../../stories/loader/Loader';
import { formatCurrency, formatDateForFileName, renderSector, renderSize } from '../../util';

export function HomeOCP() {
  const t = useT();
  const { data, isLoading } = useGetStatisticsOCPoptIn();

  const [sectorData, setSectorData] = useState<ChartData[]>([]);
  const [rejectedReasonsData, setRejectedReasonsData] = useState<ChartData[]>([]);

  const [donwloadingCSV, setDownloadingCSV] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const sectorDataArray: ChartData[] = [];
    if (data?.opt_in_stat.sector_statistics) {
      data.opt_in_stat.sector_statistics.forEach((element) => {
        sectorDataArray.push({ name: renderSector(element.name), value: element.value });
      });
      setSectorData(sectorDataArray);
    }
    const rejectedReasonsDataArray: ChartData[] = [];
    if (data?.opt_in_stat.rejected_reasons_count_by_reason) {
      data.opt_in_stat.rejected_reasons_count_by_reason.forEach((element) => {
        rejectedReasonsDataArray.push({ name: DECLINE_FEEDBACK_NAMES[element.name], value: element.value });
      });
      setRejectedReasonsData(rejectedReasonsDataArray);
    }
  }, [data]);

  const [initialDate, setInitialDate] = useState<string | null>(null);
  const [finalDate, setFinalDate] = useState<string | null>(null);
  const [lenderId, setLenderId] = useState<number | null>(null);
  const [dateFilterRange, setDataFilterRange] = useState<string>(STATISTICS_DATE_FILTER.CUSTOM_RANGE);

  const isBeforeInitialDate = (date: unknown) => {
    if (!initialDate) return false;
    return dayjs(date as string).isBefore(dayjs(initialDate));
  };

  const isAfterFinalDate = (date: unknown) => {
    if (!finalDate) return false;
    return dayjs(date as string).isAfter(dayjs(finalDate));
  };

  const handleChangeSelectDateFilter = (event: SelectChangeEvent) => {
    setDataFilterRange(event.target.value as string);
  };

  const { data: dataKPI, isLoading: isLoadingKPI } = useGetStatisticsOCP(
    dateFilterRange,
    initialDate,
    finalDate,
    lenderId,
  );

  const downloadCSV = () => {
    setDownloadingCSV(true);
    if (data) {
      const csvData = [
        [t('Metric'), t('Value')],
        [t('MSMEs opted into the scheme'), data.opt_in_stat.opt_in_query_count],
        [t('MSMEs contacted opted into the scheme'), `${data.opt_in_stat.opt_in_percentage}%`],
        [t('Unique MSMEs opted into the scheme'), data.opt_in_stat.received_count_distinct],
        [t('Unique MSMEs with submitted applications'), data.opt_in_stat.submitted_count_distinct],
        [t('Unique MSMEs with approved applications'), data.opt_in_stat.approved_count_distinct],
        [
          t('Averate amount of credit disbursed'),
          `"${CURRENCY_FORMAT_OPTIONS.default.options.currency} ${formatCurrency(
            data.opt_in_stat.average_credit_disbursed,
            CURRENCY_FORMAT_OPTIONS.default.options.currency,
          )}"`,
        ],
        [t('Average applications per day'), data.opt_in_stat.average_applications_per_day],
        [t('Proportion of MSMEs opting into the scheme by sector'), ''],
        ...sectorData.map((row) => [t(row.name), row.value]),
        [t('Breakdown of reasons why MSMEs opted out of the scheme'), ''],
        ...rejectedReasonsData.map((row) => [t(row.name), row.value]),
        [t('Number of applications recieved by gender'), ''],
        ...data.opt_in_stat.received_count_by_gender.map((row) => [t(row.name), row.value]),
        [t('Number of applications submitted by gender'), ''],
        ...data.opt_in_stat.submitted_count_by_gender.map((row) => [t(row.name), row.value]),
        [t('Number of applications approved by gender'), ''],
        ...data.opt_in_stat.approved_count_by_gender.map((row) => [t(row.name), row.value]),
        [t('Unique MSMEs count from recieved applications by gender'), ''],
        ...data.opt_in_stat.received_count_distinct_by_gender.map((row) => [t(row.name), row.value]),
        [t('Unique MSMEs count from submitted applications by gender'), ''],
        ...data.opt_in_stat.submitted_count_distinct_by_gender.map((row) => [t(row.name), row.value]),
        [t('Unique MSMEs count from approved applications by gender'), ''],
        ...data.opt_in_stat.approved_count_distinct_by_gender.map((row) => [t(row.name), row.value]),
        [t('Number of applications recieved by size'), ''],
        ...data.opt_in_stat.received_count_by_size.map((row) => [t(MSME_TYPES_NAMES[row.name]), row.value]),
        [t('Number of applications submitted by size'), ''],
        ...data.opt_in_stat.submitted_count_by_size.map((row) => [t(MSME_TYPES_NAMES[row.name]), row.value]),
        [t('Number of applications approved by size'), ''],
        ...data.opt_in_stat.approved_count_by_size.map((row) => [t(MSME_TYPES_NAMES[row.name]), row.value]),
        [t('Unique MSMEs count from recieved applications by size'), ''],
        ...data.opt_in_stat.received_count_distinct_by_size.map((row) => [t(MSME_TYPES_NAMES[row.name]), row.value]),
        [t('Unique MSMEs count from submitted applications by size'), ''],
        ...data.opt_in_stat.submitted_count_distinct_by_size.map((row) => [t(MSME_TYPES_NAMES[row.name]), row.value]),
        [t('Unique MSMEs count from approved applications by size'), ''],
        ...data.opt_in_stat.approved_count_distinct_by_size.map((row) => [t(MSME_TYPES_NAMES[row.name]), row.value]),
      ];

      const csv = csvData.map((row) => row.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const fileName = `statistics_ocp-${formatDateForFileName(new Date())}.csv`;
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    } else {
      enqueueSnackbar(t('Error downloading CSV data'), {
        variant: 'error',
      });
    }
    setDownloadingCSV(false);
  };

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
      {data && !isLoading && (
        <Container className="p-0 lg:pr-20 ml-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            <div className="col-span-2 flex flex-row">
              <DashboardItemContainer
                description={t('MSMEs opted into the scheme')}
                value={data.opt_in_stat.opt_in_query_count}
              />
              <DashboardItemContainer
                suffix="%"
                description={t('MSMEs contacted opted into the scheme')}
                value={data.opt_in_stat.opt_in_percentage}
              />
            </div>

            <div className="col-span-2 flex flex-row">
              <DashboardItemContainer
                description={t('Unique MSMEs opted into the scheme')}
                value={data.opt_in_stat.received_count_distinct}
              />
              <DashboardItemContainer
                description={t('Unique MSMEs with submitted applications')}
                value={data.opt_in_stat.submitted_count_distinct}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            <div className="col-span-2 flex flex-row">
              <DashboardItemContainer
                description={t('Unique MSMEs with approved applications')}
                value={data.opt_in_stat.approved_count_distinct}
              />

              <DashboardItemContainer
                valueClassName="text-[20px]"
                description={t('Averate amount of credit disbursed')}
                value={`${CURRENCY_FORMAT_OPTIONS.default.options.currency} ${formatCurrency(
                  data.opt_in_stat.average_credit_disbursed,
                  CURRENCY_FORMAT_OPTIONS.default.options.currency,
                )}`}
              />
            </div>

            <div className="col-span-2 flex flex-row">
              <DashboardItemContainer
                description={t('Average applications per day')}
                value={data.opt_in_stat.average_applications_per_day}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            <div className="col-span-2">
              <DashboardChartContainer label={t('Proportion of MSMEs opting into the scheme by sector')}>
                <ChartPie data={sectorData} />
              </DashboardChartContainer>
            </div>
            <div className="col-span-2">
              <DashboardChartContainer label={t('Breakdown of reasons why MSMEs opted out of the scheme')}>
                <ChartBar data={rejectedReasonsData} />
              </DashboardChartContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            <div className="col-span-2">
              <DashboardChartContainer label={t('Number of applications by gender')}>
                <ChartMultipleBar
                  series={[
                    data.opt_in_stat.received_count_by_gender,
                    data.opt_in_stat.submitted_count_by_gender,
                    data.opt_in_stat.approved_count_by_gender,
                  ]}
                  dataKeys={Object.keys(GENEDER_NAMES)}
                  seriesNames={Object.keys(STATUS_GROUPS)}
                />
              </DashboardChartContainer>
            </div>
            <div className="col-span-2">
              <DashboardChartContainer label={t('Unique MSMEs count by gender')}>
                <ChartMultipleBar
                  series={[
                    data.opt_in_stat.received_count_distinct_by_gender,
                    data.opt_in_stat.submitted_count_distinct_by_gender,
                    data.opt_in_stat.approved_count_distinct_by_gender,
                  ]}
                  dataKeys={Object.keys(GENEDER_NAMES)}
                  seriesNames={Object.keys(STATUS_GROUPS)}
                />
              </DashboardChartContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            <div className="col-span-2">
              <DashboardChartContainer label={t('Number of applications by size')}>
                <ChartMultipleBar
                  series={[
                    data.opt_in_stat.received_count_by_size,
                    data.opt_in_stat.submitted_count_by_size,
                    data.opt_in_stat.approved_count_by_size,
                  ]}
                  dataKeys={Object.keys(MSME_TYPES)}
                  seriesNames={Object.keys(STATUS_GROUPS)}
                  labelMapper={renderSize}
                />
              </DashboardChartContainer>
            </div>
            <div className="col-span-2">
              <DashboardChartContainer label={t('Unique MSMEs count by size')}>
                <ChartMultipleBar
                  series={[
                    data.opt_in_stat.received_count_distinct_by_size,
                    data.opt_in_stat.submitted_count_distinct_by_size,
                    data.opt_in_stat.approved_count_distinct_by_size,
                  ]}
                  dataKeys={Object.keys(MSME_TYPES)}
                  seriesNames={Object.keys(STATUS_GROUPS)}
                  labelMapper={renderSize}
                />
              </DashboardChartContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            <div className="col-span-2">
              <Button label={t('Download CSV')} onClick={downloadCSV} disabled={isLoading || donwloadingCSV} />
            </div>
          </div>
        </Container>
      )}
      {!data && isLoading && (
        <Container className="p-0 lg:pr-20 ml-0">
          <Loader />
        </Container>
      )}
      <Title type="section" label={t('Application KPIs')} className="mb-6 mt-10" />
      <LendersButtonGroup onLenderSelected={(id: number | null) => setLenderId(id)} />
      <Title type="subsection" label={t('Data Range')} className="mb-6 mt-10" />
      <div className="mt-6 md:mb-8 grid grid-cols-1 gap-4 md:flex md:gap-0">
        <div className="md:mr-4">
          <Select
            displayEmpty
            disableUnderline
            input={<Input />}
            value={dateFilterRange}
            onChange={handleChangeSelectDateFilter}>
            {STATISTICS_DATE_FILTER_OPTIONS.map((option) => (
              <MenuItem key={`key-${option.value}`} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="md:mr-4">
          <DatePicker
            shouldDisableDate={isAfterFinalDate}
            disabled={dateFilterRange !== STATISTICS_DATE_FILTER.CUSTOM_RANGE}
            onChange={(value: unknown) => {
              const date = value as Dayjs;
              if (date.isValid()) {
                setInitialDate(date.toISOString());
              }
            }}
            slotProps={{
              textField: {
                variant: 'standard',
                value: dayjs(initialDate),
                fullWidth: true,
                error: false,
              },
            }}
          />
        </div>

        <div>
          <DatePicker
            shouldDisableDate={isBeforeInitialDate}
            disabled={dateFilterRange !== STATISTICS_DATE_FILTER.CUSTOM_RANGE}
            onChange={(value: unknown) => {
              const date = value as Dayjs;
              if (date.isValid()) {
                setFinalDate(date.toISOString());
              }
            }}
            slotProps={{
              textField: {
                variant: 'standard',
                value: dayjs(finalDate),
                fullWidth: true,
                error: false,
              },
            }}
          />
        </div>
      </div>
      {dataKPI && !isLoadingKPI && (
        <Container className="p-0 lg:pr-20 ml-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            <div className="col-span-2 flex flex-row">
              <DashboardItemContainer
                description={t('Total applications received')}
                value={dataKPI.statistics_kpis.applications_received_count}
              />

              <DashboardItemContainer
                suffix="%"
                description={t('Applications received from MSMEs that opted in')}
                value={dataKPI.statistics_kpis.proportion_of_submitted_out_of_opt_in}
              />
            </div>

            <div className="col-span-2 flex flex-row">
              <DashboardItemContainer
                description={t('Total applications in progress')}
                value={dataKPI.statistics_kpis.applications_in_progress_count}
              />

              <DashboardItemContainer
                color="red"
                description={t('Applications waiting on MSME for information')}
                value={dataKPI.statistics_kpis.applications_waiting_for_information_count}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            <div className="col-span-2 flex flex-row">
              <DashboardItemContainer
                description={t('Total applications approved')}
                value={dataKPI.statistics_kpis.applications_approved_count}
              />

              <DashboardItemContainer
                description={t('Total applications rejected')}
                value={dataKPI.statistics_kpis.applications_rejected_count}
              />
            </div>
            <div className="col-span-2 flex flex-row">
              <DashboardItemContainer
                description={t('Total applications with credit disbursed')}
                value={dataKPI.statistics_kpis.applications_with_credit_disbursed_count}
              />

              <DashboardItemContainer
                suffix="%"
                description={t('Approved applications with credit disbursed')}
                value={dataKPI.statistics_kpis.proportion_of_disbursed}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            <div className="col-span-2 flex flex-row">
              <DashboardItemContainer
                color="red"
                description={t('Total applications overdue')}
                value={dataKPI.statistics_kpis.applications_overdue_count}
              />

              <DashboardItemContainer
                color="red"
                valueClassName="text-[30px]"
                suffix={` ${t('days')}`}
                description={t('Average time taken to process an application')}
                value={dataKPI.statistics_kpis.average_processing_time}
              />
            </div>
            <div className="col-span-2 flex flex-row">
              <DashboardItemContainer
                valueClassName="text-[20px]"
                description={t('Average amount of credit requested')}
                value={`${CURRENCY_FORMAT_OPTIONS.default.options.currency} ${formatCurrency(
                  dataKPI.statistics_kpis.average_amount_requested,
                  CURRENCY_FORMAT_OPTIONS.default.options.currency,
                )}`}
              />

              <DashboardItemContainer
                valueClassName="text-[30px]"
                suffix={` ${t('months')}`}
                description={t('Average repayment period requested')}
                value={dataKPI.statistics_kpis.average_repayment_period}
              />
            </div>
          </div>
        </Container>
      )}
      {!dataKPI && isLoadingKPI && (
        <Container className="p-0 lg:pr-20 ml-0">
          <Loader />
        </Container>
      )}
      {data && !isLoading && (
        <div className="grid lg:gap-10 grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
          <div className="col-span-1">
            <DashboardChartContainer label={t('Breakdown of FIs chosen by MSME')}>
              <ChartBar data={data.opt_in_stat.fis_choosen_by_msme} />
            </DashboardChartContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeOCP;
