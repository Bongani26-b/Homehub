import React, { useState } from 'react';
import {
  Building2,
  Users,
  DollarSign,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowUpRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function ManageRentalsPage({ onBack, addToast }) {
  const [leases, setLeases] = useState([
    {
      id: 'l1',
      property: '1420 N Astor St #4B, Gold Coast, Chicago',
      tenant: 'Marcus Vance',
      rent: 4200,
      leaseEnd: '2027-08-31',
      status: 'Paid',
      dueDate: '1st of every month'
    },
    {
      id: 'l2',
      property: '1100 Brickell Bay Dr #4802, Miami',
      tenant: 'Elena Rostova',
      rent: 5200,
      leaseEnd: '2026-12-15',
      status: 'Paid',
      dueDate: '1st of every month'
    },
    {
      id: 'l3',
      property: '2134 N Cleveland Ave, Lincoln Park',
      tenant: 'David & Clara Kim',
      rent: 4600,
      leaseEnd: '2027-04-30',
      status: 'Pending',
      dueDate: '5th of every month'
    }
  ]);

  const [maintenanceTickets, setMaintenanceTickets] = useState([
    {
      id: 't1',
      property: '1420 N Astor St',
      issue: 'HVAC Air Filter Replacement scheduled',
      urgency: 'Routine',
      status: 'In Progress'
    },
    {
      id: 't2',
      property: '1100 Brickell Bay Dr',
      issue: 'Balcony smart lighting firmware update',
      urgency: 'Low',
      status: 'Completed'
    }
  ]);

  const totalMonthlyIncome = leases.reduce((acc, curr) => acc + curr.rent, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-[2.5rem] hero-gradient p-8 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest block mb-2">
            Owner & Landlord Cockpit
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Manage Your Rentals
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-lg">
            Monitor active tenant leases, collected rental income, and maintenance requests in real-time.
          </p>
        </div>

        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 transition shadow-sm"
        >
          &larr; Back to Explore
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Total Monthly Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            ${totalMonthlyIncome.toLocaleString()}
            <span className="text-xs font-sans text-slate-500 font-normal"> / mo</span>
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Occupancy (3 of 3 Active Units)
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Active Tenants</span>
            <Users className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {leases.length}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            All background checks & credit verified
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Maintenance Tasks</span>
            <Wrench className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {maintenanceTickets.filter((t) => t.status !== 'Completed').length} Pending
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Fast 24-hr contractor dispatch
          </div>
        </div>
      </div>

      {/* Leases Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Active Tenant Leases</h2>
            <p className="text-xs text-slate-500">Track rent status and upcoming lease renewals</p>
          </div>
          <button
            onClick={() => {
              sound.play('click');
              addToast('Downloadable lease agreement export generated! 📄', 'success');
            }}
            className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            Export Leases
          </button>
        </div>

        <div className="space-y-3">
          {leases.map((lease) => (
            <div
              key={lease.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="font-bold text-sm text-slate-900">{lease.property}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Tenant: <strong className="text-slate-700">{lease.tenant}</strong> • Lease Expiry:{' '}
                  <span className="font-mono text-slate-700">{lease.leaseEnd}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-base font-extrabold text-slate-900 font-mono">
                    ${lease.rent.toLocaleString()}/mo
                  </div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      lease.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {lease.status}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setLeases((prev) =>
                      prev.map((l) => (l.id === lease.id ? { ...l, status: 'Paid' } : l))
                    );
                    sound.play('success');
                    addToast(`Payment recorded for ${lease.tenant}! 💰`, 'success');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-800 shadow-sm"
                >
                  Log Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Tickets */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Maintenance & Service Dispatch</h2>
        
        <div className="space-y-3">
          {maintenanceTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                  <Wrench className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{ticket.issue}</div>
                  <div className="text-slate-500">{ticket.property} • Priority: {ticket.urgency}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-full font-semibold ${
                    ticket.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {ticket.status}
                </span>
                {ticket.status !== 'Completed' && (
                  <button
                    onClick={() => {
                      setMaintenanceTickets((prev) =>
                        prev.map((t) => (t.id === ticket.id ? { ...t, status: 'Completed' } : t))
                      );
                      sound.play('success');
                      addToast('Maintenance ticket marked as resolved! 🔧', 'success');
                    }}
                    className="px-3 py-1 rounded-xl bg-slate-900 text-white font-semibold"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
