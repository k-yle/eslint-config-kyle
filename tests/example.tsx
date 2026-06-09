// eslint-disable-next-line no-restricted-syntax
import React, { Fragment } from 'react';

export const A = () => {
  return (
    <>
      {[].map((_, index) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <aside key={index} />
      ))}
      {/* eslint-disable-next-line k/self-closing-comp */}
      <div></div>
      {/* eslint-disable-next-line k/no-redundant-jsx-curly-braces */}
      <main title={'b'} />

      {/* @ts-expect-error -- assert that it's caught by TS, if not we need a custom rule */}
      <i ref="my string ref" />

      {/* eslint-disable-next-line no-restricted-syntax */}
      <input disabled={true} />
      <input disabled />

      {/* eslint-disable-next-line no-restricted-syntax */}
      <Fragment>{0} </Fragment>
      {/* eslint-disable-next-line no-restricted-syntax */}
      <React.Fragment>{0} </React.Fragment>
      {/* okay */}
      <React.Fragment key={0}>{0} </React.Fragment>
      {/* okay */}
      <>{0} </>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export const enum C {}
