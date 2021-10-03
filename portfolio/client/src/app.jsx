import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./routes/home";
import About from "./routes/about";
import Portfolio from "./routes/portfolio";
import ProjectDetails from "./routes/projectDetails";
import Contact from "./routes/contact";
import AdminPortfolio from "./routes/admin/portfolio";
import AdminAbout from "./routes/admin/about.jsx";
import { PortfolioContextProvider } from './context/portfolio';

const App = () =>{
    return (
        <PortfolioContextProvider>
            <div>
                <Router>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/portfolio" component={Portfolio}/>
                    <Route exact path="/project/id" component={ProjectDetails}/>
                    <Route exact path="/contact" component={Contact}/>
                    <Route exact path="/admin/portfolio" component={AdminPortfolio}/>
                    <Route exact path="/admin/about" component={AdminAbout}/>
                </Router>
            </div>
        </PortfolioContextProvider>
    )
}

export default App;