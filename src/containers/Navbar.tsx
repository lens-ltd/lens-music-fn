import { Link } from 'react-router-dom';
import Button from '../components/inputs/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

interface Navlink {
  label: string;
  path: string;
}

const Navbar = () => {
  // STATE VARIABLES
  const { user } = useSelector((state: RootState) => state.user);

  const navbarLinks = [
    {
      label: 'Releases',
      path: '/releases',
    },
    {
      label: 'Artists management',
      path: '/artists',
    },
    {
      label: 'Lyrics',
      path: '/lyrics',
    },
  ];

  return (
    <header className="flex items-center gap-3 justify-between p-6 w-[95%] mx-auto">
      <figure>
        <Link
          to={'/dashboard'}
          className="text-xl font-bold transition-all ease-in-out hover:scale-102"
        >
          Lens Music
        </Link>
      </figure>
      <nav className="flex items-center gap-6">
        {navbarLinks?.map((link: Navlink, index: number) => {
          return (
            <Button
              route={link?.path}
              key={index}
              styled={false}
              className="hover:underline"
            >
              {link?.label}
            </Button>
          );
        })}
      </nav>

      <menu className="flex items-center gap-6">
        <Link
          to={'#'}
          className={`overflow-hidden inline w-[2rem] h-[2rem] relative rounded-full`}
        >
          {user?.avatar ? (
            <img src={user?.avatar} className="object-cover w-full h-full" />
          ) : (
            <h1 className="text-white text-lg font-bold text-center w-full h-full flex items-center justify-center bg-gray-800">
              {user?.name?.charAt(0)}
            </h1>
          )}
        </Link>
        <Button className="!py-1" primary>
          {' '}
          <menu className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCirclePlus} />
            New release
          </menu>
        </Button>
      </menu>
    </header>
  );
};

export default Navbar;
