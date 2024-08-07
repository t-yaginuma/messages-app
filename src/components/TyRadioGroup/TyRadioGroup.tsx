import React from "react";

type Props = {
  options: { label: string; id: string }[];
  value?: string;
  name?: string;
  defaultValue?: string;
  isRequired?: boolean;
};

export default function TyInput(props: Props) {
  const { options, name, defaultValue, isRequired } = props;
  return (
    <div>
      {options.map((item, index) => {
        return (
          <label key={item.id} htmlFor={item.id}>
            <input
              type="radio"
              id={item.id}
              name={name}
              value={item.id}
              required={isRequired}
              defaultChecked={item.id === defaultValue}
            />
            {item.label}
          </label>
        );
      })}
    </div>
  );
}
