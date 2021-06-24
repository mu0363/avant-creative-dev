import { Header } from "src/components/Header";
import { useSelector } from "react-redux";
import { Spinner } from "src/components/Spinner";
import { Footer } from "src/components/Footer";

export const Layout = ({ children }) => {
  const { isLoading } = useSelector((state) => state.loading);
  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen">
          <div className="m-auto">
            <Spinner />
          </div>
        </div>
      ) : (
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      )}
    </div>
  );
};
