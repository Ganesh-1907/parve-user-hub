import api from "./axios";

export interface OrderItem {
    productId: string;
    quantity: number;
    price?: number;
}

export const createRazorpayOrderApi = async (data: {
    items: OrderItem[];
    address: string;
}) => {
    const res = await api.post("/payment/create-order", data);
    return res.data;
};

export const verifyPaymentApi = async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    orderItems: OrderItem[];
    address: string;
    totalAmount: number;
}) => {
    const res = await api.post("/payment/verify", data);
    return res.data;
};

export const getRazorpayKeyApi = async () => {
    const res = await api.get("/payment/key");
    return res.data;
};

