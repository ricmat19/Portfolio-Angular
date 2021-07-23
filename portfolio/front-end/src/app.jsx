import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./routes/home";
import Portfolio from "./routes/portfolio";
import ProjectDetails from "./routes/projectDetails";
import Skills from "./routes/skills";
import Contact from "./routes/contact";
import { PortfolioContextProvider } from './context/portfolio';

const App = () =>{
    return (
        <PortfolioContextProvider>
            <div>
                <Router>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/portfolio" component={Portfolio}/>
                    <Route exact path="/project/id" component={ProjectDetails}/>
                    <Route exact path="/skills" component={Skills}/>
                    <Route exact path="/contact" component={Contact}/>
                </Router>
            </div>
        </PortfolioContextProvider>
    )
}

export default App;