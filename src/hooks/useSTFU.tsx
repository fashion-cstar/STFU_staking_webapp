import { useToken } from "@usedapp/core"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import {
    AppTokenAddress,
    PCS_API_ENDPOINTS,
} from "src/constants/AppConstants"
import useSWR from "swr"

export default function useSTFU() {
    const stfuToken = useToken(AppTokenAddress)

    const { data } = useSWR(
        `${PCS_API_ENDPOINTS}/api/v2/tokens/${AppTokenAddress}`,
        () =>
            axios
                .get(`${PCS_API_ENDPOINTS}/api/v2/tokens/${AppTokenAddress}`)
                .then(({ data }) => data),
        {
            // 10 seconds
            refreshInterval: 1000 * 10,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            // 30 seconds
            errorRetryInterval: 1000 * 30,
        }
    )

    const [{ updatedAt, price, bnbPrice }, setInfo] = useState({
        updatedAt: 0,
        price: 0,
        bnbPrice: 0
    })    

    // @todo: update format to use for amounts in $ and amount of holders
    useEffect(() => {
        if (data) {            
            setInfo({
                updatedAt: data.updated_at,
                price: data.data.price,
                bnbPrice: 1/data.data.price_BNB*data.data.price
            })
        }
    }, [data])

    const stfuInfo = useMemo(
        () => ({
            updatedAt,
            price,
            bnbPrice,
            stfuToken
        }),
        [updatedAt, price, bnbPrice, stfuToken]
    )

    return stfuInfo
}
