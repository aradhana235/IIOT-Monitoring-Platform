// pages/Settings.jsx
import React, { useState } from "react";
import { Settings as SettingsIcon, User, Building2, Bell, Save, KeyRound } from "lucide-react";
import "../styles/Settings.css";

/* ==========================================================================
   TEMPORARY DEMO DEFAULTS
   Wire these up to real /api/users/me and /api/organizations/settings
   endpoints once the backend is ready. Form state + validation is already
   in place, only the submit handlers need real API calls.
   ========================================================================== */
const DEMO_PROFILE = {
  name: "Admin",
  email: "admin@alphacore.in",
  role: "Administrator",
  phone: "",
};

const DEMO_ORG = {
  orgName: "Alphacore Technologies Pvt. Ltd.",
  units: "Metric (°C, kg/cm²)",
  timezone: "Asia/Kolkata (IST)",
};

const DEMO_NOTIFICATIONS = {
  criticalAlerts: true,
  warningAlerts: true,
  dailyReportEmail: false,
  weeklySummary: true,
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [toast, setToast] = useState("");

  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [org, setOrg] = useState(DEMO_ORG);
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    // TODO: PUT /api/users/me with { name, email, phone }
    showToast("Profile updated successfully.");
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.next) {
      showToast("Please fill in all password fields.");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      showToast("New password and confirmation do not match.");
      return;
    }
    // TODO: POST /api/users/change-password
    setPasswords({ current: "", next: "", confirm: "" });
    showToast("Password changed successfully.");
  };

  const handleOrgSave = (e) => {
    e.preventDefault();
    // TODO: PUT /api/organizations/settings
    showToast("System settings saved.");
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNotificationsSave = () => {
    // TODO: PUT /api/users/me/notification-preferences
    showToast("Notification preferences saved.");
  };

  const initials = profile.name
    ?.split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="st-page">
      <div className="st-header">
        <SettingsIcon size={28} />
        <h1>Settings</h1>
      </div>
      <p className="st-subtitle">Manage your profile and platform preferences</p>

      {toast && <div className="st-toast">{toast}</div>}

      <div className="st-tabs">
        <button
          className={`st-tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <User size={16} /> Profile
        </button>
        <button
          className={`st-tab ${activeTab === "system" ? "active" : ""}`}
          onClick={() => setActiveTab("system")}
        >
          <Building2 size={16} /> System
        </button>
        <button
          className={`st-tab ${activeTab === "notifications" ? "active" : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          <Bell size={16} /> Notifications
        </button>
      </div>

      {/* ---------------- Profile Tab ---------------- */}
      {activeTab === "profile" && (
        <>
          <div className="st-card">
            <h2>Profile Information</h2>
            <p className="st-card-desc">Update your name, email, and contact details.</p>

            <div className="st-avatar-row">
              <div className="st-avatar">{initials}</div>
              <div>
                <div className="st-avatar-name">{profile.name}</div>
                <div className="st-avatar-role">{profile.role}</div>
              </div>
            </div>

            <form onSubmit={handleProfileSave}>
              <div className="st-form-grid">
                <div className="st-field">
                  <label>Full Name</label>
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div className="st-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div className="st-field">
                  <label>Phone</label>
                  <input
                    placeholder="+91"
                    value={profile.phone}
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div className="st-field">
                  <label>Role</label>
                  <input value={profile.role} disabled />
                </div>
              </div>
              <div className="st-actions-row">
                <button type="submit" className="st-btn st-btn-primary">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="st-card">
            <h2>Change Password</h2>
            <p className="st-card-desc">Use a strong password you don't use elsewhere.</p>

            <form onSubmit={handlePasswordSave}>
              <div className="st-form-grid">
                <div className="st-field st-full">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                  />
                </div>
                <div className="st-field">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwords.next}
                    onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
                  />
                </div>
                <div className="st-field">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                  />
                </div>
              </div>
              <div className="st-actions-row">
                <button type="submit" className="st-btn st-btn-primary">
                  <KeyRound size={16} /> Update Password
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* ---------------- System Tab ---------------- */}
      {activeTab === "system" && (
        <div className="st-card">
          <h2>Organization &amp; System Preferences</h2>
          <p className="st-card-desc">These apply platform-wide for all users in your organization.</p>

          <form onSubmit={handleOrgSave}>
            <div className="st-form-grid">
              <div className="st-field st-full">
                <label>Organization Name</label>
                <input
                  value={org.orgName}
                  onChange={(e) => setOrg((o) => ({ ...o, orgName: e.target.value }))}
                />
              </div>
              <div className="st-field">
                <label>Measurement Units</label>
                <select value={org.units} onChange={(e) => setOrg((o) => ({ ...o, units: e.target.value }))}>
                  <option>Metric (°C, kg/cm²)</option>
                  <option>Imperial (°F, psi)</option>
                </select>
              </div>
              <div className="st-field">
                <label>Timezone</label>
                <select
                  value={org.timezone}
                  onChange={(e) => setOrg((o) => ({ ...o, timezone: e.target.value }))}
                >
                  <option>Asia/Kolkata (IST)</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>
            <div className="st-actions-row">
              <button type="submit" className="st-btn st-btn-primary">
                <Save size={16} /> Save Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- Notifications Tab ---------------- */}
      {activeTab === "notifications" && (
        <div className="st-card">
          <h2>Notification Preferences</h2>
          <p className="st-card-desc">Choose what you get notified about.</p>

          <div className="st-toggle-row">
            <div>
              <div className="st-toggle-label">Critical Alerts</div>
              <div className="st-toggle-desc">Immediate notification for critical severity alerts</div>
            </div>
            <label className="st-switch">
              <input
                type="checkbox"
                checked={notifications.criticalAlerts}
                onChange={() => toggleNotification("criticalAlerts")}
              />
              <span className="st-switch-slider" />
            </label>
          </div>

          <div className="st-toggle-row">
            <div>
              <div className="st-toggle-label">Warning Alerts</div>
              <div className="st-toggle-desc">Notify for medium/warning severity alerts</div>
            </div>
            <label className="st-switch">
              <input
                type="checkbox"
                checked={notifications.warningAlerts}
                onChange={() => toggleNotification("warningAlerts")}
              />
              <span className="st-switch-slider" />
            </label>
          </div>

          <div className="st-toggle-row">
            <div>
              <div className="st-toggle-label">Daily Report Email</div>
              <div className="st-toggle-desc">Receive a daily summary email every morning</div>
            </div>
            <label className="st-switch">
              <input
                type="checkbox"
                checked={notifications.dailyReportEmail}
                onChange={() => toggleNotification("dailyReportEmail")}
              />
              <span className="st-switch-slider" />
            </label>
          </div>

          <div className="st-toggle-row">
            <div>
              <div className="st-toggle-label">Weekly Summary</div>
              <div className="st-toggle-desc">Weekly Profit &amp; Loss + Alerts digest</div>
            </div>
            <label className="st-switch">
              <input
                type="checkbox"
                checked={notifications.weeklySummary}
                onChange={() => toggleNotification("weeklySummary")}
              />
              <span className="st-switch-slider" />
            </label>
          </div>

          <div className="st-actions-row">
            <button className="st-btn st-btn-primary" onClick={handleNotificationsSave}>
              <Save size={16} /> Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
