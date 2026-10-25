import React, { useState } from 'react';
import {
  Download,
  Upload,
  FileSpreadsheet,
  Database,
  CheckCircle2,
  AlertCircle,
  FileText,
  RefreshCw,
} from 'lucide-react';

interface CrmDataBackupsTabProps {
  onRefreshAll: () => void;
}

export function CrmDataBackupsTab({ onRefreshAll }: CrmDataBackupsTabProps) {
  const [csvText, setCsvText] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleDownload = (type: 'contacts' | 'opportunities' | 'backup') => {
    window.location.href = `/api/crm/export/${type}`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setCsvText(text);
      }
    };
    reader.readAsText(file);
  };

  const handleRunImport = async () => {
    if (!csvText.trim()) {
      setImportResult({ success: false, message: 'Please select a CSV file or paste CSV content below.' });
      return;
    }

    setIsImporting(true);
    setImportResult(null);

    try {
      const res = await fetch('/api/crm/import/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvText }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Import failed.');
      }

      setImportResult({ success: true, message: data.message });
      setCsvText('');
      onRefreshAll();
    } catch (err: any) {
      setImportResult({ success: false, message: err.message || 'Import failed' });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-4 border-b border-[#DCE2E8]">
        <h2 className="text-xl font-bold text-[#0B1730] font-display">
          Data Export, Backups & Import
        </h2>
        <p className="text-xs text-[#64748B]">
          Export commercial trade data to spreadsheets, download full encrypted database snapshots, or import contact records.
        </p>
      </div>

      {/* Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Export Contacts */}
        <div className="p-6 bg-white rounded-xl border border-[#DCE2E8] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#0B1730]">Export Contacts CSV</h3>
            <p className="text-xs text-[#64748B]">
              Download complete counterparties list (name, company, email, WhatsApp, trade interest, notes) in CSV format.
            </p>
          </div>
          <button
            onClick={() => handleDownload('contacts')}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#0B1730] hover:bg-[#183653] text-white text-xs font-semibold rounded-md shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#C7A45B]" />
            <span>Download Contacts CSV</span>
          </button>
        </div>

        {/* Export Opportunities */}
        <div className="p-6 bg-white rounded-xl border border-[#DCE2E8] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#0B1730]">Export Deals & Pipeline</h3>
            <p className="text-xs text-[#64748B]">
              Download commercial deals, volumes, Incoterms, destination ports, pricing, and pipeline stages in CSV format.
            </p>
          </div>
          <button
            onClick={() => handleDownload('opportunities')}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#0B1730] hover:bg-[#183653] text-white text-xs font-semibold rounded-md shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#C7A45B]" />
            <span>Download Pipeline CSV</span>
          </button>
        </div>

        {/* Full Database Snapshot */}
        <div className="p-6 bg-white rounded-xl border border-[#DCE2E8] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Database className="w-5 h-5 text-[#C7A45B]" />
            </div>
            <h3 className="text-sm font-bold text-[#0B1730]">Complete CRM Snapshot</h3>
            <p className="text-xs text-[#64748B]">
              Download complete encrypted JSON snapshot of all tables (users, contacts, deals, activities, and website enquiries).
            </p>
          </div>
          <button
            onClick={() => handleDownload('backup')}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-[#F5F7FA] text-[#0B1730] border border-[#DCE2E8] text-xs font-semibold rounded-md shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#0B1730]" />
            <span>Download JSON Snapshot</span>
          </button>
        </div>
      </div>

      {/* CSV Import Tool */}
      <div className="bg-white rounded-xl border border-[#DCE2E8] p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#F1F4F7]">
          <Upload className="w-4 h-4 text-[#0B1730]" />
          <h3 className="text-sm font-bold text-[#0B1730]">
            Batch Import Contacts (CSV)
          </h3>
        </div>

        <p className="text-xs text-[#64748B]">
          Import contacts from existing spreadsheets or industry trade directories. Expected columns (case-insensitive):{' '}
          <strong className="text-[#0B1730]">Name, Company, Email, Phone, Location, Type, Notes</strong>.
        </p>

        {importResult && (
          <div
            className={`p-3.5 rounded-md border text-xs flex items-start gap-2 ${
              importResult.success
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {importResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <p>{importResult.message}</p>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-[#F5F7FA] hover:bg-[#ECEFF3] text-[#0B1730] border border-[#DCE2E8] text-xs font-semibold rounded-md transition-colors">
              <Upload className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Choose CSV File</span>
              <input type="file" accept=".csv,text/csv" onChange={handleFileUpload} className="hidden" />
            </label>
            <span className="text-xs text-[#64748B]">or paste CSV text directly below:</span>
          </div>

          <textarea
            rows={5}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={`name,company,email,phone,location,type\n"Mohammed Al-Maktoum","Gulf Spices LLC","procure@gulfspices.ae","+971501234567","Dubai, UAE","buyer"`}
            className="w-full p-3 font-mono text-xs bg-[#F5F7FA] border border-[#DCE2E8] rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1730]"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setCsvText('')}
            className="px-3 py-1.5 text-xs text-[#64748B] hover:text-[#0B1730]"
          >
            Clear
          </button>
          <button
            type="button"
            disabled={isImporting || !csvText.trim()}
            onClick={handleRunImport}
            className="px-4 py-2 bg-[#0B1730] hover:bg-[#183653] text-white text-xs font-semibold rounded-md transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {isImporting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Importing Contacts...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5 text-[#C7A45B]" />
                <span>Execute Batch Import</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
