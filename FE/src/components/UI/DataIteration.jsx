  function DataIteration(props) {
    const { data = [], startLength, endLength, children } = props;
    return (
      <>
        {data &&data.length >= endLength &&data.slice(startLength, endLength).map((value) => children({ data: value }))}
      </>
    );
  }

  export default DataIteration;
