import { FC } from 'react';

interface LoaderProps {
  primary?: boolean;
  className?: string;
}

const Loader: FC<LoaderProps> = ({ primary, className }) => {
  return (
    <figure
      role="status"
      className={`loader border-[1.5px] w-[20px] ${
        primary ? 'border-white' : 'border-black'
      } hover:border-white ${className}`}
    ></figure>
  );
};

export default Loader;
