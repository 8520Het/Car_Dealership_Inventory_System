import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Car, Edit, Trash2, Tag, DollarSign, ArchiveRestore, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { deleteVehicle } from '../services/vehicleService';
import { purchaseVehicle, restockVehicle } from '../services/inventoryService';

const VehicleCard = ({ vehicle, onDeleteSuccess }) => {
    const { role } = useSelector((state) => state.auth);
    const isAdmin = role === 'ROLE_ADMIN';

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete the ${vehicle.make} ${vehicle.model}?`)) {
            return;
        }
        try {
            await deleteVehicle(vehicle.id);
            toast.success('Vehicle deleted successfully');
            if (onDeleteSuccess) onDeleteSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete vehicle');
        }
    };

    const handlePurchase = async () => {
        try {
            await purchaseVehicle(vehicle.id);
            toast.success('Vehicle purchased successfully!');
            if (onDeleteSuccess) onDeleteSuccess(); // Refresh the list
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to purchase vehicle');
        }
    };

    const handleRestock = async () => {
        const amountStr = window.prompt("Enter amount to restock:");
        if (!amountStr) return;
        const amount = parseInt(amountStr, 10);
        if (isNaN(amount) || amount <= 0) {
            return toast.error("Invalid amount");
        }

        try {
            await restockVehicle(vehicle.id, amount);
            toast.success('Vehicle restocked successfully!');
            if (onDeleteSuccess) onDeleteSuccess(); // Refresh the list
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to restock vehicle');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
            {/* Image Placeholder */}
            <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent" />
                <Car className="w-16 h-16 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                
                {/* Stock Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    vehicle.quantity > 0 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-red-100 text-red-700'
                }`}>
                    {vehicle.quantity > 0 ? `${vehicle.quantity} In Stock` : 'Out of Stock'}
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                            {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 flex items-center mt-1">
                            <Tag className="w-3 h-3 mr-1" /> {vehicle.category}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-2xl font-bold text-primary-600">
                        <DollarSign className="w-5 h-5 -mr-1" />
                        {Number(vehicle?.price || 0).toLocaleString()}
                    </div>
                </div>

                {/* Admin Actions */}
                <div className="mt-6 flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 gap-2">
                    {isAdmin ? (
                        <>
                            <button
                                onClick={handleRestock}
                                className="flex justify-center items-center py-2 px-3 border border-emerald-200 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                                title="Restock Vehicle"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                            <Link 
                                to={`/dashboard/inventory/${vehicle.id}/edit`}
                                className="flex-1 flex justify-center items-center py-2 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                <Edit className="w-4 h-4 mr-2" /> Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="flex justify-center items-center py-2 px-3 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete Vehicle"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={handlePurchase}
                            className="w-full flex justify-center items-center py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={vehicle.quantity === 0}
                        >
                            <ArchiveRestore className="w-4 h-4 mr-2" /> 
                            {vehicle.quantity > 0 ? 'Purchase Request' : 'Out of Stock'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
