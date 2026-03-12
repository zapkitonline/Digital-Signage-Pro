'use client';

import { mockAuditLogs, mockUsers } from '@/lib/mockData';
import { Card } from '@/components/ui/card';

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toISOString().split('T')[0];
}

export function RecentActivity() {
  const displayLogs = mockAuditLogs.slice(0, 6);

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Recent Activity
        </h3>
        <p className="text-sm text-slate-600">Latest system actions and changes</p>
      </div>
      <div className="space-y-4">
        {displayLogs.map((log) => {
          const user = mockUsers.find((u) => u.id === log.userId);
          const actionColors = {
            UPDATE: 'bg-blue-50 text-blue-700',
            DELETE: 'bg-red-50 text-red-700',
            CREATE: 'bg-green-50 text-green-700',
            REBOOT: 'bg-amber-50 text-amber-700',
          };

          return (
            <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-slate-200 last:border-b-0 last:pb-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    actionColors[log.action as keyof typeof actionColors] || 'bg-slate-100 text-slate-700'
                  }`}>
                    {log.action}
                  </span>
                  <span className="text-sm font-medium text-slate-900">{log.resource}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  {user?.name || 'Unknown User'} performed this action
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {formatTimestamp(log.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
