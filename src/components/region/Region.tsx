import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Descriptions } from "antd";
import "./region.css";
import { RegionContext } from "../../store/context";
import { IRegion } from "../../constants/interfaces";

export const Region = () => {
    const { order } = useParams<{ order: string }>();
    const context = useContext(RegionContext);

    const return404 = () => <div>404</div>;

    if (context.regions.length < Number(order)) {
        return return404();
    }

    const data: IRegion | undefined = context.regions.find(
        (el) => el.order === Number(order)
    );

    if (!data) {
        return return404();
    }

    const history = useHistory();

    console.log({ order, context });
    return (
        <div className="region">
            <Descriptions title="Regional Information" layout="vertical">
                <Descriptions.Item label="Title">
                    {data.fullname}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                    {data.address}
                </Descriptions.Item>
                <Descriptions.Item label="Libraries">
                    {data.libraries}
                </Descriptions.Item>
                <Descriptions.Item label="Computer Libraries">
                    {data.libraries_computers}
                </Descriptions.Item>
            </Descriptions>
            <button onClick={() => history.goBack()}>back</button>
        </div>
    );
};
