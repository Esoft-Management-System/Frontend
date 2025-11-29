import type { MouseEvent } from 'react';

interface ButtonInterface {
  buttonName: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const BlueButton = (props: ButtonInterface) => {
  const {
    buttonName,
    onClick,
    disabled = false,
    loading = false,
    type = 'button'
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="
        py-3.5 px-6 w-full rounded-xl text-white font-semibold 
        bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
        disabled:bg-blue-400 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-blue-200
        active:scale-95 disabled:active:scale-100
        shadow-md hover:shadow-lg
        flex items-center justify-center space-x-2 hover:cursor-pointer
      "
    >
      {loading && (
        <svg
          className="h-4 w-4 text-white"
          style={{ animation: 'spin 1s linear infinite' }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      <span>{loading ? 'Processing...' : buttonName}</span>
    </button>
  );
};

export default BlueButton;