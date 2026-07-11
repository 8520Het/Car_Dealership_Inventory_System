import { Settings as SettingsIcon, Shield, User } from 'lucide-react';

const Settings = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Manage dealership configurations and administrative options.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                            <Shield className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Security</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-slate-50">
                            <div>
                                <p className="font-medium text-slate-800">Two-Factor Authentication</p>
                                <p className="text-sm text-slate-500">Require 2FA for all administrator accounts</p>
                            </div>
                            <button className="px-4 py-2 bg-slate-100 text-slate-600 font-medium rounded-lg text-sm hover:bg-slate-200 transition-colors">
                                Enable
                            </button>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <div>
                                <p className="font-medium text-slate-800">Session Timeout</p>
                                <p className="text-sm text-slate-500">Automatically log out inactive users</p>
                            </div>
                            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500">
                                <option>30 Minutes</option>
                                <option>1 Hour</option>
                                <option>12 Hours</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50/50">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <SettingsIcon className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Application Preferences</h2>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                        Additional configurations for currency mapping, tax rates, and inventory alerts will be available in the next release.
                    </p>
                    <button disabled className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg text-sm opacity-50 cursor-not-allowed">
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
