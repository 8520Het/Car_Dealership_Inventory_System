import { Outlet } from 'react-router-dom';
import { Car } from 'lucide-react';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-xl mb-4">
                    <Car className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    Dealership Pro
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Manage your inventory with elegance
                </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="glass-panel py-8 px-4 sm:px-10 shadow-2xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
