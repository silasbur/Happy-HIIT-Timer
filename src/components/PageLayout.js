import React from 'react';

const PageLayout = (props) => {
  return (
    <div className="page-wrapper">
      <div>
        <span>{props.title}</span>
        <div>{'>'}</div>
      </div>
      {props.children}
    </div>
  );
};

export default PageLayout;
