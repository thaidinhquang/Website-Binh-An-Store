import React from "react";
import { Link } from "react-router-dom";

const BreadcrumbCom = ({
  paths = [{ name: "home", path: "/" }],
}) => {
  return (
    <>
      {paths && paths.length > 0 && (
        <div className="breadcrumb-wrapper font-400 text-[13px] text-qblack mb-[23px]">
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              <Link to={path.path}>
                <span className="mx-1 capitalize">{path.name}</span>
              </Link>
              {index < paths.length - 1 && (
                <span className="separator mx-1">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default BreadcrumbCom;
