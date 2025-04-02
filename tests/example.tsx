export const React = 0;

export const A = () => {
  return (
    <>
      {[].map((_, index) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <aside key={index} />
      ))}
      {/* eslint-disable-next-line k/self-closing-comp */}
      <div></div>
    </>
  );
};
