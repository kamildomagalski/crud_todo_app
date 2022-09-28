import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 *
 * @param {array} options- available options to choose
 * @param {string} selectValue- curent value of the select box
 * @param {function} changeHandler- callback that returns some value to change parents state
 * @param {string} className- pass a class name for different stylesheet
 * @returns {JSX.Element} fully functional Component
 */
function Select({ options, selectValue, changeHandler, className }) {

  const [selectOptions] = useState(options);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleOpen = () => {
    setIsSelectOpen(true);
  };
  const handleClose = () => {
    setIsSelectOpen(false);
  };
  const handleSelectedChange = (e) => {
    changeHandler(e.target.value);
    handleClose();
  };

  return (
    <div className={`${className}`}>
      <div className={"selected"} onClick={isSelectOpen? handleClose : handleOpen}>
        <p className={"selected__text"}>{selectValue}</p>
        <span className={"iconWrapper"}>
          <FontAwesomeIcon
            icon={"chevron-down"}
            className={
              isSelectOpen ? "iconWrapper__icon" : "selected__icon-rotate"
            }
          />
        </span>
      </div>
      <div
        className={
          isSelectOpen ? "optionsContainer active" : "optionsContainer"
        }
      >
        {selectOptions.map((el) => {
          return (
            <div className={"option"} key={`${el}`} onClick={handleClose}>
              <label className={"option__label"}>
                <input
                  type={"radio"}
                  className={"radio"}
                  value={`${el}`}
                  name={"priority"}
                  onChange={handleSelectedChange}
                />
                {el}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Select;
