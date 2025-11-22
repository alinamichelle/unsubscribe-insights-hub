import { FileText, Download, Lock } from "lucide-react";

export function DocumentVault() {
  const documents = [
    {
      name: "Purchase Agreement",
      date: "Oct 15, 2020",
      size: "2.4 MB",
      category: "Transaction",
    },
    {
      name: "Home Inspection Report",
      date: "Oct 20, 2020",
      size: "8.1 MB",
      category: "Inspection",
    },
    {
      name: "Title Insurance",
      date: "Oct 28, 2020",
      size: "1.2 MB",
      category: "Legal",
    },
    {
      name: "Closing Disclosure",
      date: "Oct 28, 2020",
      size: "856 KB",
      category: "Transaction",
    },
    {
      name: "Home Warranty",
      date: "Oct 28, 2020",
      size: "445 KB",
      category: "Warranty",
    },
  ];

  return (
    <div className="surface rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Document Vault</h3>
            <p className="text-sm text-slate-600">Secure access to all your transaction documents</p>
          </div>
        </div>
        <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
          Upload Document
        </button>
      </div>

      <div className="space-y-3">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-xl border border-slate-200/60 hover:bg-slate-50/80 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900">{doc.name}</div>
                <div className="text-xs text-slate-500">
                  {doc.category} • {doc.date} • {doc.size}
                </div>
              </div>
            </div>

            <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white rounded-lg transition-all">
              <Download className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
