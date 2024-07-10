import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

// add Routes
// if u want to add new Routes
// Go to ./routes/index.js and add new Routes in array publicRoutes
import { publicRoutes, privateRoutes } from "./routes";

// Add Layouts
import { DefaultLayout } from "./components/Layout";

import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  })
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes &&
            publicRoutes.map((route, index) => {
              // if Layout is used in Router is null,route.layout === null Layout= Fragment
              // If u wanna use Default Layout (with Header, SideBar and Content), route.layout= empty (undifine)
              // if  u wanna use other Layout, route.layout= something!!!, fill it in elements of publicRoutes
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              // each Pages is a Component which is defined in pages/.. 
              //and Layout of this page is defined in components/Layout/...
              // So u will code your page in pages/... and component/Layout/...
              // Good luck!!!!!!!
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

          {/* Private route */}
          {
            isLoggedIn && 
            privateRoutes &&
            privateRoutes.map((route, index) => {
              // if Layout is used in Router is null,route.layout === null Layout= Fragment
              // If u wanna use Default Layout (with Header, SideBar and Content), route.layout= empty (undifine)
              // if  u wanna use other Layout, route.layout= something!!!, fill it in elements of publicRoutes
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              // each Pages is a Component which is defined in pages/.. 
              //and Layout of this page is defined in components/Layout/...
              // So u will code your page in pages/... and component/Layout/...
              // Good luck!!!!!!!
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
