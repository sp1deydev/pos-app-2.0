import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Empty, InputNumber, Popconfirm, Table } from "antd";
import React from "react";
import CartFooter from '../CartFooter';
import { formatVietnamCurrency } from '../../../../utils/formatCurrency';
import { useDispatch } from 'react-redux';
import { homeSlice } from '../../../../redux/Slices/homeSlice';
import { useDebouncedChangeQuantity } from '../../../../hooks/useChangeQuantity';

interface CartTableProps {
    cart: any,
}

const CartTable: React.FC<CartTableProps> = ({ cart }) => {
    cart = [...cart].reverse();
    const dispatch = useDispatch()

    const handleDelete = (id: any) => {
        dispatch(homeSlice.actions.deleteProductInCart(id));
    }
    const handleMinus = (id: any) => {
        dispatch(homeSlice.actions.decreaseQuantity(id));
    }
    const handleAdd = (id: any) => {
        dispatch(homeSlice.actions.increaseQuantity(id));
    }

    const onChangeQuantity = useDebouncedChangeQuantity();

    const handleChangeQuantity = (id: any, quantity: number) => {
        if (!quantity) {
            quantity = 1;
        }
        onChangeQuantity(id, quantity);
    };

    const columns = [
        {
            title: '',
            dataIndex: 'index',
            render:  (index: number) => {
                return <p>{index}</p>
            },
            className: 'index-column',
            width: '4%'
        },
        {
            title: '',
            dataIndex: 'name',
            width: '32%',
            render: (name: any) => {
                return <b>{name}</b>
            },
        },
        {
            title: '',
            dataIndex: 'subtotal',
            render: (subTotal: number) => {
                return <i>{formatVietnamCurrency(subTotal)}</i>
            },
            width: '15%'
        },
        {
            title: '',
            dataIndex: 'quantity',
            render: (element: any) => {
                return (
                    <React.Fragment>
                        <Button type="default" onClick={() => handleMinus(element.id)}>-</Button>
                            <InputNumber
                                controls={false}
                                min={1} 
                                max={100} 
                                value={element.quantity} 
                                onChange={(quantity) => handleChangeQuantity(element.id, quantity)}  
                                className="custom-quantity-input"
                            />
                        <Button type="default" onClick={() => handleAdd(element.id)}>+</Button>
                    </React.Fragment>
                )
            },
            className: "quantity-column",
            width: '16%'
        },
        {
            title: '',
            dataIndex: 'total',
            render: (total: number) => {
                return <b className="primary-text-color"><i>{formatVietnamCurrency(total)}</i></b>
            },
            width: '17%'
        },
        {
            title: '',
            dataIndex: 'delete',
            render:  (id: any) => {
                return (
                    <Popconfirm
                        placement="rightBottom"
                        title="Xoá sản phẩm khỏi giỏ hàng"
                        description="Bạn có chắc chắn?"
                        icon={<DeleteOutlined style={{ color: 'red' }} />}
                        cancelText="Hủy"
                        okText="Xác nhận"
                        onConfirm={() => handleDelete(id)}
                    >
                        <Button type="text" icon={<DeleteOutlined />} danger/>
                    </Popconfirm>
                )
            },
            className: 'delete-column',
            width: '4%'
        },
        {
            title: '',
            dataIndex: 'action',
            render:  () => {
                return (
                    <Button type="text" icon={<MoreOutlined />} />
                )
            },
            className: 'action-column',
            width: '4%'
        },
    ]
    //DATA OF TABLE
    const dataSource = cart.map((element: any, index: number) => {
        return {
            key: element.id,
            delete: element.id,
            index: index + 1,
            name: element.name,
            quantity: element,
            subtotal: element.price,
            total: element.price * element.quantity
        }
    })
    return (
        <Table 
            className="cart-table"
            showHeader={false}
            columns={columns} 
            dataSource={dataSource}
            pagination={false}
            scroll={{y: 488}}
            footer={() => <CartFooter cart={cart}/>}
            locale={{
                emptyText: (
                  <Empty
                    description="Không có sản phẩm nào trong giỏ hàng"
                  />
                ),
            }}
        />
    )
}

export default CartTable
