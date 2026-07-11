import api from './api';

export const purchaseVehicle = async (id) => {
    const response = await api.post(`/inventory/${id}/purchase`);
    return response.data;
};

export const restockVehicle = async (id, amount) => {
    const response = await api.post(`/inventory/${id}/restock?amount=${amount}`);
    return response.data;
};
