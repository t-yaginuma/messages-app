import React from "react";

type Props = {
  options: { label: string; id: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TyInput(props: Props) {
  const { options, value, onChange } = props;
  return (
    <div>
      {options.map((item, index) => {
        return (
          <label key={item.id} htmlFor={item.id}>
            <input
              type="radio"
              id={item.id}
              name="radio"
              value={item.id}
              checked={value === item.id}
              onChange={onChange}
            />
            {item.label}
          </label>
        );
      })}
    </div>
  );
}
