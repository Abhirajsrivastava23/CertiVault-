'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  KeyRound, 
  ShoppingBag, 
  Upload, 
  Plus, 
  DollarSign, 
  Users, 
  LogOut, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  LifeBuoy, 
  Layers,
  Sparkles,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { formatInr, formatDate } from '@/lib/utils/formatters';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { OrderStatusBadge } from '@/components/ui/Badge';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'import' | 'tickets'>('inventory');
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);

  // CSV Import State
  const [csvContent, setCsvContent] = useState('');
  const [importStatus, setImportStatus] = useState<{
    success?: boolean;
    message?: string;
    errors?: string[];
  } | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  // Single Voucher Form Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCertId, setSelectedCertId] = useState(CERTIFICATIONS[0].id);
  const [newVoucherCode, setNewVoucherCode] = useState('');
  const [newExpiryDate, setNewExpiryDate] = useState('2027-12-31');
  const [newRegion, setNewRegion] = useState('India / Global');
  const [newInstructions, setNewInstructions] = useState('Redeem via Pearson VUE official checkout.');
  const [isAdding, setIsAdding] = useState(false);
  const [addNotice, setAddNotice] = useState<string | null>(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [invRes, ordRes, tktRes] = await Promise.all([
        fetch('/api/admin/inventory/status'),
        fetch('/api/orders'),
        fetch('/api/support/tickets'),
      ]);

      const invData = await invRes.json();
      const ordData = await ordRes.json();
      const tktData = await tktRes.json();

      if (invData.success) setInventory(invData.inventory || []);
      if (ordData.success) setOrders(ordData.data || []);
      if (tktData.success) setTickets(tktData.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    sessionStorage.removeItem('cv_admin_unlocked');
    router.push('/admin/login');
  };

  const handleCsvImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvContent.trim()) return;

    setIsImporting(true);
    setImportStatus(null);

    try {
      const res = await fetch('/api/admin/inventory/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv: csvContent }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setImportStatus({
          success: false,
          message: data.error || 'Import failed',
          errors: data.errors,
        });
      } else {
        setImportStatus({
          success: true,
          message: `Successfully imported ${data.importedCount} vouchers into private inventory.`,
          errors: data.errors && data.errors.length > 0 ? data.errors : undefined,
        });
        setCsvContent('');
        await fetchAdminData();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Import failed';
      setImportStatus({ success: false, message: msg });
    } finally {
      setIsImporting(false);
    }
  };

  const handleAddSingleVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setAddNotice(null);

    try {
      const singleItem = [{
        certificationId: selectedCertId,
        voucherCode: newVoucherCode.trim().toUpperCase(),
        expiryDate: newExpiryDate,
        region: newRegion,
        redemptionInstructions: newInstructions,
        supplierReference: 'ADMIN-DIRECT-ENTRY',
      }];

      const res = await fetch('/api/admin/inventory/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(singleItem),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.errors?.[0] || data.error || 'Failed to add voucher');
      }

      setAddNotice('Voucher securely added to private inventory!');
      setNewVoucherCode('');
      setTimeout(() => {
        setIsAddModalOpen(false);
        setAddNotice(null);
      }, 1500);

      await fetchAdminData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error adding voucher';
      setAddNotice(msg);
    } finally {
      setIsAdding(false);
    }
  };

  const loadSampleCsv = () => {
    setCsvContent(
`certificationId,voucherCode,expiryDate,region,redemptionInstructions,supplierReference
cert-ms-az900,CV-AZ900-BATCH3-801,2027-12-31,India / Global,Redeem at checkout on Pearson VUE via Microsoft Learn,PO-MSFT-2026
cert-aws-saa,CV-AWSSAA-BATCH3-802,2027-12-31,India / Global,Apply at checkout on AWS Training and Certification Pearson VUE portal,PO-AWS-2026
cert-gcp-ace,CV-GCPACE-BATCH3-803,2027-12-31,India / Global,Enter in Coupon/Voucher box on Google Cloud Webassessor checkout,PO-GCP-2026
cert-cisco-ccna,CV-CCNA-BATCH3-804,2027-12-31,India / Global,Apply voucher at Pearson VUE Cisco exam registration checkout,PO-CISCO-2026
cert-comptia-sec,CV-COMPSEC-BATCH3-805,2027-12-31,India / Global,Enter voucher on CompTIA / Pearson VUE exam checkout screen,PO-COMP-2026`
    );
  };

  const totalAvailable = inventory.reduce((acc, i) => acc + i.availableCount, 0);
  const totalSold = inventory.reduce((acc, i) => acc + i.soldCount, 0);
  const totalRevenue = orders
    .filter(o => o.status === 'fulfilled' || o.status === 'paid')
    .reduce((acc, o) => acc + o.totalAmountInr, 0);

  return (
    <div className="py-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Navigation Bar */}
        <div className="rounded-2xl border-2 border-primary/30 bg-surface-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-glow">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-white tracking-tight">CertiVault</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-950 border border-amber-800 text-amber-300">
                  Master Operations
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Authenticated as: <strong className="text-white font-mono">admin@123</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <span>View Storefront</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="sm"
              onClick={fetchAdminData}
              className="gap-1.5 text-xs"
              title="Refresh Data"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5 text-xs shadow-glow"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-xl border border-surface-border bg-surface-card p-5">
            <span className="text-xs text-slate-400 block mb-1">Available Vouchers</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {totalAvailable}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">In private inventory</span>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-card p-5">
            <span className="text-xs text-slate-400 block mb-1">Vouchers Fulfilled / Sold</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-primary-light">
              {totalSold}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Allocated to customers</span>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-card p-5">
            <span className="text-xs text-slate-400 block mb-1">Platform Revenue</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {formatInr(totalRevenue)}
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 block">Collected via Razorpay</span>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-card p-5">
            <span className="text-xs text-slate-400 block mb-1">Total Orders</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {orders.length}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">{tickets.length} support inquiries</span>
          </div>
        </div>

        {/* Main Tab Controls */}
        <div className="border-b border-surface-border flex gap-2 overflow-x-auto pb-1">
          {[
            { id: 'inventory', label: 'Voucher Inventory', icon: KeyRound },
            { id: 'import', label: 'Bulk CSV Importer', icon: Upload },
            { id: 'orders', label: 'Customer Orders', icon: ShoppingBag },
            { id: 'tickets', label: 'Support Inquiries', icon: LifeBuoy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                  isCurrent
                    ? 'bg-primary text-white border-primary shadow-glow'
                    : 'bg-surface-card text-slate-400 hover:text-white border-surface-border'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Voucher Inventory by Certification</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Track real-time stock levels, allocated codes, and replenishments.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsAddModalOpen(true)}
                  className="shadow-glow text-xs gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Single Voucher</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveTab('import')}
                  className="text-xs gap-1.5"
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>Batch CSV Import</span>
                </Button>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-surface-200/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-surface-border">
                    <tr>
                      <th className="py-3 px-4">Exam Code</th>
                      <th className="py-3 px-4">Certification Name</th>
                      <th className="py-3 px-4">Available Stock</th>
                      <th className="py-3 px-4">Sold / Assigned</th>
                      <th className="py-3 px-4">Market Price</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/50">
                    {inventory.map((item) => {
                      const fullCert = CERTIFICATIONS.find(c => c.id === item.certificationId);
                      return (
                        <tr key={item.certificationId} className="hover:bg-surface-200/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-primary-light">
                            {item.examCode}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-white max-w-xs truncate">
                            {item.name}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1.5 font-bold ${item.availableCount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              <span className={`h-2 w-2 rounded-full ${item.availableCount > 0 ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                              <span>{item.availableCount} available</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">
                            {item.soldCount} fulfilled
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-white">
                            {fullCert ? formatInr(fullCert.voucherPriceInr) : '—'}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedCertId(item.certificationId);
                                setIsAddModalOpen(true);
                              }}
                              className="text-primary-light hover:underline font-semibold"
                            >
                              + Replenish
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BULK CSV IMPORTER */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Batch Voucher Inventory CSV Importer</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload or paste authorized vouchers. All vouchers are encrypted and stored in private PostgreSQL schema.
              </p>
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-border">
                <span className="text-xs text-slate-300 font-medium">
                  Expected Columns: <code className="text-primary-light font-mono bg-surface-200 px-2 py-0.5 rounded">certificationId,voucherCode,expiryDate,region,redemptionInstructions,supplierReference</code>
                </span>
                <button
                  type="button"
                  onClick={loadSampleCsv}
                  className="text-xs text-primary-light hover:underline font-semibold"
                >
                  Load Sample CSV Template
                </button>
              </div>

              {importStatus && (
                <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                  importStatus.success
                    ? 'bg-emerald-950/70 border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/70 border-rose-800 text-rose-300'
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    {importStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <span>{importStatus.message}</span>
                  </div>
                  {importStatus.errors && importStatus.errors.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      {importStatus.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <form onSubmit={handleCsvImport} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Paste CSV Records:
                  </label>
                  <textarea
                    rows={10}
                    value={csvContent}
                    onChange={(e) => setCsvContent(e.target.value)}
                    placeholder="certificationId,voucherCode,expiryDate,region,redemptionInstructions,supplierReference&#10;cert-ms-az900,CV-AZ900-TEST-001,2027-12-31,India / Global,Redeem at checkout,PO-BATCH-01"
                    className="w-full rounded-xl bg-surface-200 border border-surface-border text-xs font-mono text-white p-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    Pre-flight validation runs automatically before saving.
                  </span>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isImporting}
                    disabled={!csvContent.trim()}
                    className="shadow-glow gap-1.5 font-bold"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Import Vouchers to Inventory</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Customer Transactions & Fulfillment</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete order history with Razorpay signatures and delivery statuses.
                </p>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Total Orders: <strong className="text-white">{orders.length}</strong>
              </span>
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-surface-200/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-surface-border">
                    <tr>
                      <th className="py-3 px-4">Order #</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Certification Item</th>
                      <th className="py-3 px-4">Total (INR)</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/50">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-surface-200/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          #{order.orderNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-white block">{order.customerName}</strong>
                          <span className="text-slate-400 text-[11px]">{order.customerEmail}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-200">
                          {order.items.map((i: any) => `${i.certificationName} (${i.examCode})`).join(', ')}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-primary-light">
                          {formatInr(order.totalAmountInr)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">
                          {order.paymentMethod || 'Razorpay Gateway'}
                        </td>
                        <td className="py-3.5 px-4">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="py-3.5 px-4 text-right text-slate-400">
                          {formatDate(order.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUPPORT DESK */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Customer Support Inquiries</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Respond to candidate scheduling inquiries, voucher assistance, and billing questions.
              </p>
            </div>

            <div className="space-y-4">
              {tickets.map((t) => (
                <div key={t.id} className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary-light bg-surface-50 px-2.5 py-0.5 rounded border border-surface-border">
                        {t.ticketNumber}
                      </span>
                      <span className="text-slate-300 font-semibold">{t.category}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {t.status}
                      </span>
                    </div>
                    <span className="text-slate-400">{formatDate(t.createdAt)}</span>
                  </div>

                  <h4 className="text-base font-bold text-white pt-1">{t.subject}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 bg-surface-200 p-4 rounded-xl border border-surface-border leading-relaxed">
                    {t.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Single Voucher Addition Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Voucher to Private Inventory"
        description="Enter single-use authorized certification voucher code."
        maxWidth="md"
      >
        <form onSubmit={handleAddSingleVoucher} className="space-y-4">
          {addNotice && (
            <div className="p-3 rounded-lg bg-surface-200 border border-primary/50 text-xs text-primary-light">
              {addNotice}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Certification</label>
            <select
              value={selectedCertId}
              onChange={(e) => setSelectedCertId(e.target.value)}
              className="w-full h-10 rounded-lg bg-surface-200 border border-surface-border text-xs text-white px-3 focus:outline-none focus:border-primary"
            >
              {CERTIFICATIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.providerName} - {c.examCode} ({c.name})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Voucher Code"
            value={newVoucherCode}
            onChange={(e) => setNewVoucherCode(e.target.value)}
            required
            placeholder="e.g. CV-AZ900-2027-X812"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Expiry Date"
              type="date"
              value={newExpiryDate}
              onChange={(e) => setNewExpiryDate(e.target.value)}
              required
            />
            <Input
              label="Applicable Region"
              value={newRegion}
              onChange={(e) => setNewRegion(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Redemption Instructions</label>
            <textarea
              rows={3}
              value={newInstructions}
              onChange={(e) => setNewInstructions(e.target.value)}
              required
              className="w-full rounded-lg bg-surface-200 border border-surface-border text-xs text-white p-3 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-surface-border">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isAdding}
              className="shadow-glow"
            >
              Save to Private Inventory
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

