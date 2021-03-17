import { List } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IRegion } from "../../constants/interfaces";
import { RegionContext } from "../../store/context";
import "./table.css";

export const Table = () => {
    const context = useContext(RegionContext);
    const [sort, setSort] = useState<boolean | null>(null);
    const [searchValue, setSearchValue] = useState<string>("");

    const sorting = (regions: IRegion[], sort: boolean | null): IRegion[] => {
        return regions.sort((a: IRegion, b: IRegion) =>
            sort ? a.libraries - b.libraries : b.libraries - a.libraries
        );
    };

    const searching = (regions: IRegion[], searchValue: string): IRegion[] => {
        return regions.filter((el) => {
            return el.fullname.match(searchValue);
        });
    };

    const tableView = (
        regions: IRegion[],
        sort: boolean | null,
        searchValue: string
    ): IRegion[] => {
        let validRegions: IRegion[] = [];
        validRegions = sort !== null ? sorting(regions, sort) : regions;
        validRegions = searchValue ? searching(regions, searchValue) : regions;
        return validRegions;
    };

    return (
        <div className="table">
            <button onClick={() => setSort(!sort)}>
                Sort {sort === null ? "" : sort ? "0=>1" : "1=>0"}
            </button>
            <input
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
            ></input>
            <List
                itemLayout="horizontal"
                dataSource={tableView(context.regions, sort, searchValue)}
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
