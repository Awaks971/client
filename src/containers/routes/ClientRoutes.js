import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../../pages/Dashboard";
import Statistics from "../../pages/Statistics";
import CashJournalRoutes from "./CashJournalRoutes";
import SettingsRoutes from "./SettingsRoutes";
import FinishRegister from "../../pages/FinishRegister";
import { motion } from "framer-motion";
import BookKeepingRoutes from "./BookKeepingRoutes";

function ClientRoutes() {
  const routes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/cash-journals", component: CashJournalRoutes },
    { path: "/statistics", component: Statistics },
    { path: "/settings", component: SettingsRoutes },
    { path: "/book-keeping", component: BookKeepingRoutes },
    { path: "/finish-register", component: FinishRegister }
  ];

  return <Switch>{generateAnimatedRoutes(routes)}</Switch>;
}

function generateAnimatedRoutes(routes) {
  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96]
  };

  const animation_variants = {
    exit: { scale: 0.98, opacity: 0, transition },
    enter: {
      scale: 1,
      opacity: 1,
      transition
    }
  };
  return routes.map(route => {
    const animatedComponent = ({ ...rest }) => (
      <motion.div
        variants={animation_variants}
        initial="exit"
        animate="enter"
        exit="exit"
      >
        <route.component {...rest} />
      </motion.div>
    );
    return (
      <Route key={route.path} path={route.path} component={animatedComponent} />
    );
  });
}

export default ClientRoutes;
