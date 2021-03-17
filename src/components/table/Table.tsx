import { List } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IRegion } from "../../constants/interfaces";
import { RegionContext } from "../../store/context";
import "./table.css";

export const Table = () => {
    const context = useContext(RegionContext);
    const [sort, setSort] = useState<null | boolean>(null);

    const sorting = (regions: IRegion[]): IRegion[] => {
        return regions.sort((a: IRegion, b: IRegion) =>
            sort ? a.libraries - b.libraries : b.libraries - a.libraries
        );
    };

    return (
        <div className="table">
            <button onClick={() => setSort(!sort)}>
                Sort {sort === null ? "" : sort ? "0=>1" : "1=>0"}
            </button>
            <List
                itemLayout="horizontal"
                dataSource={
                    sort !== null ? sorting(context.regions) : context.regions
                }
                renderItem={(item: IRegion) => {
                    return (
                        <List.Item
                            key={((Math.random() + 1000) * 59).toString()}
                        >
                            <List.Item.Meta
                                title={
                                    <Link to={`/${item.order}`}>
                                        {item.fullname}
                                    </Link>
                                }
                                description={`libraries: ${item.libraries} / computer libraries: ${item.libraries_computers}`}
                            />
                        </List.Item>
                    );
                }}
            />
        </div>
    );
};
