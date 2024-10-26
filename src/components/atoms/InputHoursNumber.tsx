import React, { ChangeEvent, useState } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  onInvalidNumber: (value: string) => void;
  className?: string;
};

export const InputHoursNumber = (props: Props) => {
  const { value, onChange, onInvalidNumber, className } = props;

  const [localValue, setLocalValue] = useState<string>(`${value}`);

  const onChangeHandler = (value: string) => {
    const v = value.replace(/[０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    );

    if (isNaN(Number(v))) {
      setLocalValue(value);
      onInvalidNumber(value);
    } else {
      setLocalValue(v);
      onChange(Number(v));
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={localValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(e.target.value);
      }}
      className={className}
    />
  );
};
