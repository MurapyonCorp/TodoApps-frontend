import React, { ChangeEvent, useState } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  onInvalidNumber: (value: string) => void;
  minSecFlag: boolean;
  onInvalidValue: (value: number) => void;
  className?: string;
};

export const InputNumber = (props: Props) => {
  const {
    value,
    onChange,
    onInvalidNumber,
    minSecFlag,
    onInvalidValue,
    className,
  } = props;

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

    if (minSecFlag) {
      if (60 <= Number(v)) {
        onInvalidValue(Number(v))
      }
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
