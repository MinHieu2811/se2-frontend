import { FC } from "react";
import { Spinner } from "react-bootstrap";

interface ILoading {
  isFullWidth?: boolean;
}

const Loading: FC<ILoading> = ({ isFullWidth = false }) => {
  return (
    <>
      <div>
        {!isFullWidth ? (
          <div className="loading-component button p-0 is-loading" />
        ) : (
          <div className="loader-wrapper is-active">
            <Spinner animation="border" role="status" variant="dark" />
          </div>
        )}
      </div>
    </>
  );
};

export default Loading;
