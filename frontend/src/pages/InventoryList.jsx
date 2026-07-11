import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Loader2, ChevronLeft, ChevronRight, Car } from 'lucide-react';
import { getVehicles } from '../services/vehicleService';
import VehicleCard from '../components/VehicleCard';

const InventoryList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [vehicles, setVehicles] = useState([]);
    const [pageInfo, setPageInfo] = useState({ number: 0, totalPages: 0, totalElements: 0 });
    const [loading, setLoading] = useState(true);

    const makeParam = searchParams.get('make') || '';
    const categoryParam = searchParams.get('category') || '';
    const maxPriceParam = searchParams.get('maxPrice') || '';
    const pageParam = parseInt(searchParams.get('page') || '0');

    const [filters, setFilters] = useState({
        make: makeParam,
        category: categoryParam,
        maxPrice: maxPriceParam
    });

    useEffect(() => {
        fetchVehicles();
    }, [searchParams]);

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const params = {
                page: pageParam,
                size: 9,
                sort: 'createdAt,desc',
                ...(makeParam && { make: makeParam }),
                ...(categoryParam && { category: categoryParam }),
                ...(maxPriceParam && { maxPrice: maxPriceParam })
            };
            
            const res = await getVehicles(params);
            if (res?.success) {
                setVehicles(res.data?.content || []);
                setPageInfo({
                    number: res.data?.pageNumber || 0,
                    totalPages: res.data?.totalPages || 0,
                    totalElements: res.data?.totalElements || 0
                });
            }
        } catch (error) {
            console.error("Failed to fetch vehicles", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const newParams = new URLSearchParams();
        if (filters.make) newParams.set('make', filters.make);
        if (filters.category) newParams.set('category', filters.category);
        if (filters.maxPrice) newParams.set('maxPrice', filters.maxPrice);
        newParams.set('page', '0'); // reset to page 0 on new search
        setSearchParams(newParams);
    };

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage.toString());
        setSearchParams(newParams);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Vehicle Inventory</h1>
                    <p className="text-sm text-slate-500 mt-1">Showing {pageInfo.totalElements} vehicles</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <form onSubmit={handleFilterSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Make / Brand</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                                placeholder="e.g. Toyota"
                                value={filters.make}
                                onChange={(e) => setFilters({ ...filters, make: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Category</label>
                        <select
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        >
                            <option value="">All Categories</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Truck">Truck</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Van">Van</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Max Price</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                            placeholder="No limit"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors flex items-center justify-center"
                    >
                        <SlidersHorizontal className="w-4 h-4 mr-2" /> Apply Filters
                    </button>
                </form>
            </div>

            {/* Vehicle Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                </div>
            ) : vehicles.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                    <Car className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900">No vehicles found</h3>
                    <p className="text-slate-500 mt-1">Try adjusting your search filters.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {vehicles.map((vehicle) => (
                            <VehicleCard 
                                key={vehicle.id} 
                                vehicle={vehicle} 
                                onDeleteSuccess={fetchVehicles}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {pageInfo.totalPages > 1 && (
                        <div className="flex items-center justify-between bg-white px-4 py-3 border border-slate-200 rounded-xl sm:px-6">
                            <p className="text-sm text-slate-700">
                                Page <span className="font-medium">{pageInfo.number + 1}</span> of <span className="font-medium">{pageInfo.totalPages}</span>
                            </p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handlePageChange(pageInfo.number - 1)}
                                    disabled={pageInfo.number === 0}
                                    className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                                </button>
                                <button
                                    onClick={() => handlePageChange(pageInfo.number + 1)}
                                    disabled={pageInfo.number >= pageInfo.totalPages - 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default InventoryList;
