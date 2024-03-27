import { FC, FormEventHandler } from 'react';
import { Link, To } from 'react-router-dom';

interface ButtonProps {
  route?: To;
  value: string | JSX.Element;
  onClick?: FormEventHandler<HTMLAnchorElement>;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  primary?: boolean;
  styled?: boolean;
  className?: string;
  submit?: boolean;
  danger?: boolean;
}

const Button: FC<ButtonProps> = ({
  route = '#',
  onClick,
  disabled,
  value,
  submit,
  primary,
  danger,
  styled = true,
  className,
}) => {
  if (submit) {
    return (
      <button
        className={`border-2 flex items-center justify-center text-center text-[15px] border-black rounded-md py-[6px] px-4 hover:bg-black hover:text-white transition-all hover:scale-[1.02] ${
          primary && 'bg-black text-white'
        } ${
          danger &&
          'bg-red-600 border-none text-white hover:bg-red-600 hover:text-white shadow-sm'
        } ${
          !styled &&
          '!bg-transparent hover:underline hover:bg-transparent border-none hover:!text-black hover:scale-[1.00] text-[13px] !px-0'
        } ${className}`}
        type="submit"
      >
        {value}
      </button>
    );
  }

  return (
    <Link
      to={route}
      onChange={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick && onClick(e);
      }}
      className={`border-2 flex items-center justify-center text-center text-[15px] border-black rounded-md py-[6px] px-4 hover:bg-black hover:text-white transition-all hover:scale-[1.02] ${
        primary && 'bg-black text-white'
      } ${
        danger &&
        'bg-red-600 border-none text-white hover:bg-red-600 hover:text-white shadow-sm'
      } ${
        !styled &&
        '!bg-transparent hover:underline hover:bg-transparent border-none hover:!text-black hover:scale-[1.00] text-[13px] !px-0'
      } ${className}`}
    >
      {value}
    </Link>
  );
};

export default Button;
