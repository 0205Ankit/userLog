import { Route, Routes } from "react-router";
import React, { Suspense, lazy, useEffect } from "react";
import Loader from "./helper/Loader";
import useTheme from "./helper/useTheme";
import ToastDemo from "./components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { toastSliceActions } from "./store/store";
import { useToast } from "./hooks/useToast";

const Home = lazy(() => import("./pages/Home"));
const ViewUser = lazy(() => import("./pages/ViewUser"));
const AddUser = lazy(() => import("./pages/AddUser"));

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
    <div className="h-screen bg-light-primary dark:bg-dark-primary">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-user" element={<ViewUser />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
        <ToastDemo />
      </Suspense>
    </div>
  );
}

export default App;
