import { useHttp } from "../hooks/useHttp";
import type { IFilterParams } from "../models/IGoods";

const useValantisService = (offset: number) => {
    const _baseUrl = "http://api.valantis.store:40000/";
    const { request } = useHttp();

    const getIds = async (limit?: number) => {
        const body = {
            action: "get_ids",
            params: { offset, limit },
        };

        const response = await request(_baseUrl, JSON.stringify(body));
        return response.result;
    };

    const getGoodsById = async (ids: string[]) => {
        const body = {
            action: "get_items",
            params: { ids },
        };

        const response = await request(_baseUrl, JSON.stringify(body));
        return response.result;
    };

    const filterGoods = async (params: IFilterParams) => {
        const body = {
            action: "filter",
            params,
        };

        const response = await request(_baseUrl, JSON.stringify(body));
        return response.result;
    };

    return { getIds, getGoodsById, filterGoods };
};

export default useValantisService;
