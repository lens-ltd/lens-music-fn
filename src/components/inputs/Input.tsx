import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ChangeEvent,
  FC,
  LegacyRef,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import { Link } from 'react-router-dom';

interface InputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
  submit?: boolean;
  type?: string;
  value?: string | number;
  suffixIcon?: IconProp;
  prefixIcon?: IconProp;
  suffixIconHandler?: MouseEventHandler<HTMLAnchorElement> | undefined;
  name?: string;
  suffixIconPrimary?: boolean;
  prefixIconHandler?: MouseEventHandler<HTMLAnchorElement> | undefined;
  prefixIconPrimary?: boolean;
  prefixText?: string | ReactNode;
  defaultChecked?: boolean;
  accept?: string;
  min?: string | number;
  readOnly?: boolean;
  multiple?: boolean;
  ref?: LegacyRef<HTMLInputElement> | undefined;
  labelClassName?: string;
}

const Input: FC<InputProps> = ({
  type = 'text',
  label = null,
  placeholder,
  className,
  required = false,
  value,
  onChange,
  defaultValue,
  suffixIcon = null,
  suffixIconHandler,
  suffixIconPrimary = false,
  prefixIcon = null,
  prefixIconHandler,
  prefixText = null,
  name,
  min,
  readOnly = false,
  labelClassName = '',
  defaultChecked = false,
  accept = '*',
  multiple = false,
}) => {
  const hiddenFileInput = useRef(null);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!defaultValue && !value && ref?.current) {
      ref.current.value = '';
    }
  }, [defaultValue, value]);

  if (['checkbox', 'radio'].includes(type)) {
    return (
      <label className="flex items-center gap-2">
        <input
          type={type}
          name={name}
          defaultChecked={defaultChecked}
          onChange={onChange}
          className={`w-5 h-5 border-[1.5px] rounded-xl cursor-pointer border-secondary outline-none focus:outline-none accent-black focus:border-[1.6px] focus:border-black ease-in-out duration-50 ${className}`}
        />
        <p className={`${label ? 'text-[13px]' : 'hidden'}`}>{label}</p>
      </label>
    );
  }

  if (type === 'file') {
    const handleClick = () => {
      hiddenFileInput?.current?.click();
    };
    return (
      <label className={`flex flex-col gap-[6px] w-full ${labelClassName}`}>
        <p
          className={`${
            label ? 'flex items-center gap-[5px] text-[14px]' : 'hidden'
          }`}
        >
          {label}{' '}
          <span className={required ? 'text-[14px] text-red-600' : 'hidden'}>
            *
          </span>
        </p>
        <menu className="text-[12px] w-fit">
          <button
            type="button"
            onClick={handleClick}
            className={`!bg-black !text-white hover:!bg-black hover:!text-white !shadow-sm py-1 w-full text-[12px] text-center max-[800px]:!text-[14px] px-8 rounded-md cursor-pointer ease-in-out duration-400 hover:scale-[1.005] ${className}`}
          >
            Choose file{multiple ? 's' : ''}
          </button>
          <input
            ref={hiddenFileInput}
            type={type}
            multiple={multiple}
            value={value}
            accept={accept}
            onChange={onChange}
            className="hidden"
          />
        </menu>
      </label>
    );
  }

  return (
    <label className={`flex flex-col gap-[6px] w-full ${labelClassName}`}>
      <p
        className={`${
          label ? 'flex items-center gap-[5px] text-[14px]' : 'hidden'
        }`}
      >
        {label}{' '}
        <span className={required ? 'text-[14px] text-red-600' : 'hidden'}>
          *
        </span>
      </p>
      {!prefixIcon && !prefixText && !suffixIcon && (
        <input
          defaultValue={defaultValue}
          min={min}
          value={value}
          type={type || 'text'}
          readOnly={readOnly}
          name={name}
          ref={ref}
          onChange={onChange}
          placeholder={readOnly ? '' : placeholder}
          className={`outline-[.5px] w-full outline-gray-300 py-[6px] text-[14px] px-2 rounded-[3px] outline-none focus:outline-black focus:outline-[1.5px] ${className}`}
        />
      )}
      <section className="relative w-full">
        {(prefixIcon || prefixText) && (
          <menu className="relative w-full">
            <label className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <Link to={'#'} onClick={prefixIconHandler} className="">
                {prefixIcon && (
                  <FontAwesomeIcon className="text-current" icon={prefixIcon} />
                )}
                {prefixText && <p className="text-[14px]">{prefixText}</p>}
              </Link>
            </label>
            <input
              defaultValue={defaultValue}
              value={value}
              type={type || 'text'}
              readOnly={readOnly}
              name={name}
              onChange={onChange}
              placeholder={readOnly ? '' : placeholder}
              className={`outline-[.5px] w-full outline-gray-300 py-[6px] text-[14px] px-2 rounded-[3px] outline-none focus:outline-black focus:outline-[1.5px] ${className}
                ${prefixIcon ? `ps-10` : ''} ${
                prefixText ? 'ps-[3.6rem]' : ''
              } ${
                readOnly &&
                '!border-[.1px] !border-background hover:cursor-default focus:!border-background'
              }`}
            />
          </menu>
        )}
        {suffixIcon && (
          <menu className="flex items-center">
            <Link
              to={'#'}
              onClick={suffixIconHandler}
              className={`${
                !suffixIcon && 'hidden'
              } absolute top-0 end-0 p-2.5 px-3.5 text-sm font-medium h-full rounded-e-lg focus:outline-none ${
                suffixIconPrimary
                  ? 'bg-primary text-white'
                  : 'bg-white text-black'
              }`}
            >
              <FontAwesomeIcon icon={suffixIcon} />
            </Link>
            <input
              defaultValue={defaultValue}
              value={value}
              type={type || 'text'}
              onChange={onChange}
              readOnly={readOnly}
              name={name}
              placeholder={readOnly ? '' : placeholder}
              className={`${
                prefixText && '!ml-16 !w-[85%]'
              } outline-[.5px] w-full outline-gray-300 py-[6px] text-[14px] px-2 rounded-[3px] outline-none focus:outline-black focus:outline-[1.5px] ${className} ${
                prefixIcon &&
                '!ml-[45px] !w-[90%] !border-l-none !rounded-l-none !ps-3.5'
              } ${
                readOnly &&
                '!border-[.1px] !border-background hover:cursor-default focus:!border-background'
              } ${suffixIcon ? `!border-r-none` : ''}`}
            />
          </menu>
        )}
      </section>
    </label>
  );
};

export default Input;
