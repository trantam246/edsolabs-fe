import React, { createContext, useContext, useState } from "react";

export const ItemContext = createContext();

const ItemContextProvider = ({ children }) => {
    //Reload list item
    const [reload, setReload] = useState(0);
    //Trạng thái chạy
    const [running, setRunning] = useState(false);
    //Item
    const [item, setItem] = useState({
        "id": null,
        "description": '',
        "start_time": null,
        "end_time": null,
        "time_spent": null,
        "tags": [],
        "status": null
    });
    //tags
    const [tagsItem, setTagsItem] = useState([]);

    const ItemContextData = {
        item,
        setItem,
        reload,
        getReload() {
            setReload(num => num + 1);
        },
        running,
        setRunning,
        tagsItem,
        setTagsItem
    }

    return (
        <ItemContext.Provider value={ItemContextData}>
            {children}
        </ItemContext.Provider>
    )
}

export default ItemContextProvider;
