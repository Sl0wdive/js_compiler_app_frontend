import React from "react";

const Output = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    switch(statusId) {
      case 6:
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {atob(outputDetails?.compile_output)}
          </pre>
        );
      case 3:
        return (
          <pre className="px-2 py-1 font-normal text-xs text-green-500">
            {atob(outputDetails.stdout) !== null
              ? `${atob(outputDetails.stdout)}`
              : null}
          </pre>
        );
      case 5:
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {`Time Limit Exceeded`}
          </pre>
        );
      default:
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {atob(outputDetails?.stderr)}
          </pre>
        );
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Output
      </h1>
      <div className="w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default Output;