import { useRef } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { homeSlice } from "../redux/Slices/homeSlice";


export const useDebouncedChangeQuantity = (): any => {
    const dispatch = useDispatch();
    const changeQuantity = useRef(
        debounce((id: any, quantity: number) => {
            dispatch(homeSlice.actions.changeQuantity({ id, quantity }));
        }, 300)
    ).current;

    return changeQuantity;
};