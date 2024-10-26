type Props = {
  onClick: () => void;
  className: string;
  svgClassName: string;
  path_dproperty: string;
};

export const EditDeleteButton = (props: Props) => {
  const { onClick, className, svgClassName, path_dproperty } = props;
  return (
    <>
      <button type="button" onClick={onClick} className={className}>
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
