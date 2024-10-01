import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/inputs/Button';
import UserLayout from '../../containers/UserLayout';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import DashboardChart from '../../components/graphs/DashboardChart';
import { useEffect, useState } from 'react';
import { monthsData } from '../../constants/dashboard';
import { useLazyListArtistsQuery } from '../../state/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../state/store';
import {
  setAddArtistModal,
  setArtistsList,
} from '../../state/features/artistSlice';
import Table from '../../components/table/Table';
import AddArtist from '../artists/AddArtist';
import Loader from '@/components/inputs/Loader';

const UserDashboard = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { size, page } = useSelector((state: RootState) => state.pagination);
  const { artistsList } = useSelector((state: RootState) => state.artist);
  const [streamingData, setStreamingData] = useState(monthsData());
  const [selectedButton, setSelectedButton] = useState(0);

  // INITIALIZE LIST ARTISTS QUERY
  const [
    listArtists,
    {
      data: artistsData,
      error: artistsError,
      isLoading: artistsIsLoading,
      isSuccess: artistsIsSuccess,
      isError: artistsIsError,
    },
  ] = useLazyListArtistsQuery();

  // LIST ARTISTS
  useEffect(() => {
    listArtists({ size, page });
  }, [listArtists, page, size]);

  // HANDLE ARTISTS RESPONSE
  useEffect(() => {
    if (artistsIsError) {
      if (artistsError?.status === 500) {
        toast.error('Could not list artists. Try again later.');
      } else {
        toast.error(artistsError?.data?.message);
      }
    } else if (artistsIsSuccess) {
      dispatch(setArtistsList(artistsData?.data?.rows));
    }
  }, [
    artistsData,
    artistsError,
    artistsIsError,
    artistsIsLoading,
    artistsIsSuccess,
    dispatch,
  ]);

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
      <main className="flex flex-col gap-6 w-[95%] mx-auto p-4 px-6">
        <section className="flex flex-col gap-6">
          <section className="flex flex-col gap-6 w-full items-center justify-center">
            <menu className="flex items-center gap-6">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setAddArtistModal(true));
                }}
              >
                Add artist
              </Button>
              <Button>
                <Loader />
              </Button>
            </menu>
          </section>
        </section>
        <section className="flex flex-col gap-5 h-[65vh]">
          <menu className="flex w-full items-center gap-3 justify-between">
            <h1 className="font-semibold uppercase text-lg">Streaming data</h1>
            <Button styled={false}>
              <menu className="flex items-center gap-2 hover:gap-3 transition-all duration-200">
                Learn more
                <FontAwesomeIcon icon={faArrowRight} />
              </menu>
            </Button>
          </menu>
          <figure className="w-full h-[90%] p-2 shadow-md flex flex-col gap-6">
            <DashboardChart data={streamingData} dataKey="month" />
            <menu className="flex items-center gap-6 justify-center w-full">
              {chartNavigations.map((navigation, index: number) => {
                return (
                  <Button
                    primary={selectedButton === index}
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setStreamingData(monthsData());
                      setSelectedButton(index);
                    }}
                  >
                    {' '}
                    {navigation?.label}
                  </Button>
                );
              })}
            </menu>
          </figure>
        </section>
      </main>
      <AddArtist />
    </UserLayout>
  );
};

export default UserDashboard;
