import { useEffect, useState } from 'react';
import CartTable from './CartTable';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { homeSlice } from '../../../redux/Slices/homeSlice';


function Cart() {
    const dispatch = useDispatch();
    const cartList = useSelector((state: any) => state.home.cartList)
    const [items, setItems] = useState([]);

    useEffect(() => {
        const tabList: any = []
        cartList.map((cartInfo: any) => {
            tabList.push({
                label: cartInfo.label,
                key: cartInfo.id,
                children: <CartTable cart={cartInfo.cart}/>
            })
        })
        setItems(tabList);
    }, [cartList]);

    const onChangeTab = (id: any) => {
        dispatch(homeSlice.actions.activateCartTab(id));
    }

    const onEditTabs = (targetKey: any, action: any) => {
      if (action === 'add') {
        dispatch(homeSlice.actions.createCart());
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        items.length > 1 && dispatch(homeSlice.actions.deleteCart(targetKey))
      }
    };

    return (
        <div>
             <Tabs
                type="editable-card"
                size='small'
                onChange={onChangeTab}
                onEdit={onEditTabs}
                items={items}
            />

        </div>
    );
}

export default Cart;