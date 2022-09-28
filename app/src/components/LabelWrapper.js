import React from "react";

/**
 *
 * @param {string} title- title of label
 * @returns {JSX.Element} fully functional Component that works as a Wrapper
 */
function LabelWrapper({ title, children }) {
  return (
    <div className={"labelWrapper"}>
      <p className={"labelWrapper_title"}>{title}:</p>
      {children}
    </div>
  );
}

export default LabelWrapper;
