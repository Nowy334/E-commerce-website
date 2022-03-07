import React, { FC, useCallback, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { presenceAnimation } from "../../../helpers/animations";
import { GrDown } from "react-icons/gr";
import s from "./CustomSelect.module.scss";

export type SelectProps = {
  options?: { size: string; price: number }[] | undefined;
  handleSelectOption: (data: any) => void;
  label?: string;
};
export type SelectComponent = FC<SelectProps>;

const CustomSelect: SelectComponent = ({
  options,
  handleSelectOption,
  label,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("Wybierz");
  const [isListOpen, setIsListOpen] = useState(false);

  const handleListOpen = useCallback(() => {
    setIsListOpen(!isListOpen);
  }, [isListOpen]);

  const onChangeVariant = useCallback(
    (v) => () => {
      setSelectedOption(v.size);
      handleSelectOption(v);
      setIsListOpen(false);
    },
    []
  );

  return (
    <>
      {options?.length && options.length > 0 ? (
        <>
          <div className={s.container}>
            <label className={s.label}>{label}</label>
            <div onClick={handleListOpen} className={s.header__option}>
              {selectedOption}
              <GrDown />
            </div>
            <AnimatePresence>
              {isListOpen ? (
                <m.div {...presenceAnimation} className={s.subjects}>
                  <ul>
                    {options.map((v, i) => {
                      return v ? (
                        <li
                          key={i}
                          onClick={v ? onChangeVariant(v) : undefined}
                          className={
                            s.item +
                            " " +
                            (selectedOption === v.size ? s.active : "")
                          }
                        >
                          <span>{v.size}</span>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CustomSelect;
