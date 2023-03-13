import { Routes, Route } from "react-router";
import { RoutingPaths } from "shared/config/routing";

function Routing() {
  return (
    <Routes>
      {RoutingPaths.map(({ path, element, name }) => {
        return <Route path={path} key={name} element={element} />;
      })}
    </Routes>
  );
}

export default Routing;
