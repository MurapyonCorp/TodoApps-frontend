type Props = {
  onClick: () => void;
  className: string;
  disabled?: boolean;
  svgClassName: string;
  path_dproperty: string;
};

export const EditDeleteButton = (props: Props) => {
  const { onClick, className, disabled, svgClassName, path_dproperty } = props;
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={className}
        disabled={disabled}
        style={disabled ? { opacity: 0.3 } : {}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={svgClassName}
        >
          <path fill-rule="evenodd" d={path_dproperty} clip-rule="evenodd" />
        </svg>
      </button>
    </>
  );
};
