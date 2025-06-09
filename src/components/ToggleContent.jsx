import { useState } from "react";

const ToggleContent = (props) => {

  var children = props.children;
  var title = props.title;
  var headerClass = props.headerClass ? "" : "w-full flex justify-between items-center p-3 bg-amazon-600 rounded-sm hover:bg-amazon-500 cursor-pointer text-white";
  var headerTitleClass = props.headerTitleClass;
  var wrapperClass = props.wrapperClass ? "" : "w-full mb-1";
  var contentClass = props.contentClass ? "" : "p-3 bg-white";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={wrapperClass}>
      <div
        className={headerClass}
        onClick={(ev) => {

          ev.stopPropagation();
          ev.preventDefault();
          setIsOpen(!isOpen)
        }}
      >
        <span className={headerTitleClass}>{title}</span>
      </div>
      {isOpen && <div className={contentClass}>{children}</div>}
    </div>
  );
};

export default ToggleContent;
