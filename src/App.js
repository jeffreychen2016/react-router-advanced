import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
// import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";

// *** IMPORTANT ***
// this is called `lazy loading` (aka dynamic importing)
// this means we only load this page when it is needed
// so, our initial bundle size will be smaller
const NewQuote = React.lazy(() => import("./pages/NewQuote"));

function App() {
  return (
    <Layout>
      {/* so lazy loading may take some time to download the chunk
      we need to wrap the routes with `Suspense` component */}
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"></Redirect>
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          {/* catch all route, 404 page not found */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
