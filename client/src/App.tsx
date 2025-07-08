import { Switch, Route } from "wouter"; // Lightweight routing library to navigate in the application

import { Toaster } from "@/components/ui/toaster"; //Library for displaying pop-up messasges
import { TooltipProvider } from "@/components/ui/tooltip"; //LIbrary for displaying tooltips accross app
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/test" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;

