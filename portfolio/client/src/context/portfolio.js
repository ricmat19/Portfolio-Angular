import React, { useState, createContext } from "react";

export const PortfolioContext = createContext();

export const PortfolioContextProvider = (props) => {
  // const [collection, setCollection] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [user, setUser]  = useState([]);

  // const createItem = (item) => {
  //     setCollection([...collection, item])
  // }

  // const createUser = (newUser) => {
  //     setUser([...user, newUser])
  // }

  return (
    <PortfolioContext.Provider
      value={
        {
          // collection: collection,
          // setCollection: setCollection, createItem,
          // selectedItem: selectedItem,
          // setSelectedItem: setSelectedItem,
          // user: user,
          // setUser: setUser, createUser
        }
      }
    >
      {props.children}
    </PortfolioContext.Provider>
  );
};
