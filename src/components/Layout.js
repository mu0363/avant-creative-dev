import { Header } from "src/components/Header";
import { useSelector } from "react-redux";
import { Spinner } from "src/components/Spinner";
import { Footer } from "src/components/Footer";

export const Layout = ({ children }) => {
  const { isLoading } = useSelector((state) => state.loading);
  return (
    <div>
      <Header />
      {isLoading ? (
        <div className="flex min-h-screen">
          <div className="m-auto">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen">
          {/* className="flex-grow" */}
          <main>{children}</main>
          <div className="text-center mb-5 sm:m-10">
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};
