import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import FallbackLoader from "./components/FallbackLoader";
import Navigation from "./components/Navigation";

const HomePage = lazy(
  () => import("./pages/HomePage" /* webpackChunkName: "home-page"*/)
);

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<FallbackLoader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/detail">
            <h1>It`s Detail Page</h1>
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
