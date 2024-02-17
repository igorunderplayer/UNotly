import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError() as {
    statusText?: string;
    message: string;
  };

  console.error(error);

  return (
    <>
      <h1>Ops, parece que um erro ocorreu</h1>

      <p>
        <i>{error.statusText ?? error.message}</i>
      </p>
    </>
  );
};

export { ErrorPage };
