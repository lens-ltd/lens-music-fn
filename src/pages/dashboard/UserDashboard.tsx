import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/inputs/Button';
import UserLayout from '../../containers/UserLayout';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import DashboardChart from '../../components/graphs/DashboardChart';
import { useState } from 'react';
import { monthsData } from '../../constants/dashboard';

const UserDashboard = () => {
  // STATE VARIABLES
  const [streamingData, setStreamingData] = useState(monthsData());
  const [selectedButton, setSelectedButton] = useState(0);

  const chartNavigations = [
    {
      label: 'Streams',
    },
    {
      label: 'Downloads',
    },
    {
      label: 'Revenue',
    },
  ];

  return (
    <UserLayout>
      <section className="flex flex-col gap-5 w-[95%] mx-auto p-4 px-6 h-[60vh]">
        <menu className="flex w-full items-center gap-3 justify-between">
          <h1 className="font-semibold uppercase text-lg">Streaming data</h1>
          <Button
            styled={false}
            value={
              <menu className="flex items-center gap-2 hover:gap-3 transition-all duration-200">
                Learn more
                <FontAwesomeIcon icon={faArrowRight} />
              </menu>
            }
          />
        </menu>
        <figure className="w-full h-[90%] p-2 shadow-md flex flex-col gap-6">
          <DashboardChart data={streamingData} dataKey="month" />
          <menu className="flex items-center gap-6 justify-center w-full">
            {chartNavigations.map((navigation, index: number) => {
              return (
                <Button
                  primary={selectedButton === index}
                  key={index}
                  value={navigation?.label}
                  onClick={(e) => {
                    e.preventDefault();
                    setStreamingData(monthsData());
                    setSelectedButton(index);
                  }}
                />
              );
            })}
          </menu>
        </figure>
      </section>
    </UserLayout>
  );
};

export default UserDashboard;
