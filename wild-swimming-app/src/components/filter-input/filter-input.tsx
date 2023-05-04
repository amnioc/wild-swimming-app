import { useState } from "react";
import { LocationT } from "../../types/types";
import styles from "./filter-input.module.css";

interface Props {
  locations?: Array<LocationT> | undefined;
  placeholder: string;
  value: React.RefObject<HTMLInputElement>;
  keyToFilter?: string;
}

const FilterInput = ({ locations, placeholder, value, keyToFilter }: Props) => {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShow(true);
    setInput(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget?.nodeName === "LI") return;
    setShow(false);
  };

  const handleFocus = () => {
    setShow(true);
    setInput("");
  };

  const handleLiClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setShow(false);
    setInput((e.target as HTMLElement).innerText);
  };

  const filteredValues = locations
    ?.map((locations) => locations[keyToFilter as keyof LocationT] as string)
    .filter((value) => value.toLowerCase().includes(input.toLowerCase()));

  const filteredValuesUnique = [...new Set(filteredValues)];

  return (
    <div className={styles.ListDiv}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={input}
        ref={value}
        className={styles.Input}
      />

      {show && (
        <ul className={styles.List}>
          {filteredValuesUnique?.map((category, i) => (
            <li
              className={styles.Li}
              key={i}
              tabIndex={i}
              onClick={handleLiClick}
              id={placeholder}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterInput;
