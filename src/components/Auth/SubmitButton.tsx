interface SubmitButtonProps {
  text: string;
  isLoading?: boolean;
  onClick?: () => void; // Opcional, para manejar el evento de clic
}

function SubmitButton({ text, isLoading = false, onClick }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isLoading}
      className={`px-3 py-2 rounded-md text-white font-bold text-base transition-colors duration-200
        ${isLoading ? 'bg-green-600 cursor-not-allowed opacity-70' : 'bg-green-500 hover:bg-green-600'}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
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
          Cargando...
        </span>
      ) : (
        text
      )}
    </button>
  );
}

export default SubmitButton;