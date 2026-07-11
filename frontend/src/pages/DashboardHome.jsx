import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Car, Package, Activity, Loader2 } from 'lucide-react';
import { getVehicles } from '../services/vehicleService';

const DashboardHome = () => {
    const { role } = useSelector((state) => state.auth);
    const [totalVehicles, setTotalVehicles] = useState('---');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch just 1 vehicle to get the pagination totalElements metadata
                const res = await getVehicles({ page: 0, size: 1 });
                if (res.success) {
                    setTotalVehicles(res.data.totalElements);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
    
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Car className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Vehicles</p>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : totalVehicles}
                        </h3>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Package className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Value</p>
                        <h3 className="text-2xl font-bold text-slate-900">$---</h3>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Activity className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Your Access</p>
                        <h3 className="text-xl font-bold text-slate-900 capitalize">
                            {role === 'ROLE_ADMIN' ? 'Admin' : 'Customer'}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-8 min-h-[400px] flex items-center justify-center">
                <p className="text-slate-400">Inventory chart will appear here...</p>
            </div>
        </div>
    );
};

export default DashboardHome;
