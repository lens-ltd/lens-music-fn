import { FC, ReactNode } from 'react';
import Navbar from './Navbar';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return (
    <main className="w-full flex flex-col gap-0">
      <Navbar />
      <section className="max-w-[1600px] mx-auto w-full">{children}</section>
    </main>
  );
};

export default UserLayout;
