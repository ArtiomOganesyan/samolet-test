import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import { getData } from "./api";
import { Navbar } from "./components/navbar/Navbar";
import { NotFound } from "./components/not_found/NotFound";
import { Table } from "./components/table/Table";
import { Region } from "./components/region/Region";
import { RegionProvider } from "./store/context";

export default function App() {
    return (
        <Router>
            <Layout>
                <div className="main">
                    <Navbar></Navbar>
                    <RegionProvider>
                        <Switch>
                            <Route exact path="/" component={() => <Table />} />
                            <Route
                                key={((Math.random() + 1000) * 59).toString()}
                                exact
                                path="/:order"
                                component={() => <Region />}
                            />
                            <Route
                                exact
                                path="*"
                                component={() => <NotFound />}
                            />
                        </Switch>
                    </RegionProvider>
                </div>
            </Layout>
        </Router>
    );
}
