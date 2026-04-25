'use client';

import { useState } from 'react';

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0" style={{ borderColor: '#F0F0F0' }}>
      <div className="flex-1 pr-4">
        <p className="text-sm font-semibold text-[#030F12]">{label}</p>
        <p className="text-xs mt-0.5" style={{ color: '#606060' }}>{description}</p>
      </div>
      <button
        onClick={onChange}
        className="relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#E0CD72] focus-visible:ring-offset-1"
        style={{ background: checked ? '#E0CD72' : '#D1D5DB' }}
        aria-checked={checked}
        aria-label={label}
        role="switch"
      >
        <span
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
          style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    portfolioAlerts: true,
    newsDigest: false,
    earningsCalendar: true,
    priceTargets: false,
    rebalancingReminders: true,
  });

  const [theme, setTheme] = useState<'Light' | 'Dark' | 'System'>('Light');
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'All'>('1Y');
  const [showCents, setShowCents] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');

  function toggle(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Settings</h1>
        <p className="text-sm mt-1" style={{ color: '#606060' }}>Manage your preferences and account settings</p>
      </div>

      {/* Notification preferences */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">Notification Preferences</h2>
        <ToggleRow
          label="Portfolio Alerts"
          description="Get notified when your portfolio moves more than 2%"
          checked={notifications.portfolioAlerts}
          onChange={() => toggle('portfolioAlerts')}
        />
        <ToggleRow
          label="News Digest"
          description="Daily market summary emails"
          checked={notifications.newsDigest}
          onChange={() => toggle('newsDigest')}
        />
        <ToggleRow
          label="Earnings Calendar"
          description="Alerts for earnings in your holdings"
          checked={notifications.earningsCalendar}
          onChange={() => toggle('earningsCalendar')}
        />
        <ToggleRow
          label="Price Targets"
          description="Alert when a stock hits your target price"
          checked={notifications.priceTargets}
          onChange={() => toggle('priceTargets')}
        />
        <ToggleRow
          label="Rebalancing Reminders"
          description="Monthly rebalancing suggestions"
          checked={notifications.rebalancingReminders}
          onChange={() => toggle('rebalancingReminders')}
        />
      </div>

      {/* Display settings */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">Display Settings</h2>

        <div className="space-y-4">
          {/* Currency */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#030F12]">Currency</label>
            <select
              className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2"
              style={{ borderColor: '#E5E7EB', color: '#030F12' }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </div>

          {/* Date format */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#030F12]">Date Format</label>
            <select
              className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none"
              style={{ borderColor: '#E5E7EB', color: '#030F12' }}
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          {/* Theme */}
          <div>
            <p className="text-sm font-medium text-[#030F12] mb-2">Theme</p>
            <div className="flex gap-2">
              {(['Light', 'Dark', 'System'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    background: theme === t ? '#E0CD72' : '#F3F4F6',
                    color: theme === t ? '#030F12' : '#606060',
                    fontWeight: theme === t ? 600 : 400,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Default time range */}
          <div>
            <p className="text-sm font-medium text-[#030F12] mb-2">Default Time Range</p>
            <div className="flex gap-2">
              {(['1M', '3M', '6M', '1Y', 'All'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    background: timeRange === r ? '#E0CD72' : '#F3F4F6',
                    color: timeRange === r ? '#030F12' : '#606060',
                    fontWeight: timeRange === r ? 600 : 400,
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Show cents — uses ToggleRow to avoid duplication */}
          <div className="pt-1 border-t" style={{ borderColor: '#F0F0F0' }}>
            <ToggleRow
              label="Show cents"
              description="Display decimal places in currency values"
              checked={showCents}
              onChange={() => setShowCents((v) => !v)}
            />
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">Data &amp; Privacy</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            className="px-4 py-2 rounded-full text-sm font-semibold border transition-colors hover:bg-gray-50"
            style={{ borderColor: '#030F12', color: '#030F12' }}
          >
            Download My Data
          </button>
          <button
            className="px-4 py-2 rounded-full text-sm font-semibold border transition-colors hover:bg-red-50"
            style={{ borderColor: '#F5441D', color: '#F5441D' }}
          >
            Delete Account
          </button>
        </div>
        <p className="text-xs" style={{ color: '#606060' }}>
          Last data sync: <span className="font-medium text-[#030F12]">April 25, 2026 at 9:42 AM</span>
        </p>
      </div>

      {/* Save button */}
      <div className="flex justify-end pb-4">
        <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-8 py-2.5 hover:bg-[#E7C751] transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
