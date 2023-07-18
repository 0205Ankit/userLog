import { Route, Routes } from "react-router";
import React, { Suspense, lazy, useEffect } from "react";
import Loader from "./helper/Loader";
import useTheme from "./helper/useTheme";
import ToastDemo from "./components/Toast";
import { useDispatch } from "react-redux";

const Home = lazy(() => import("./pages/Home"));
const ViewUser = lazy(() => import("./pages/ViewUser"));
const AddUser = lazy(() => import("./pages/AddUser"));
const NotFound = lazy(() => import("./pages/Not-found"));

function App() {
  const { isDark } = useTheme();
  const dispatch=useDispatch();


  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark,dispatch]);

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-user" element={<ViewUser />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastDemo />
      </Suspense>
    </div>
  );
}

export default App;
