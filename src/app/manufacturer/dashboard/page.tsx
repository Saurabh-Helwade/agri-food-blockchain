"use client";
import {
  IconCertificate,
  IconClipboardCheck,
  IconClock,
  IconFile,
  IconShield,
} from "@tabler/icons-react";

export default function Dashboard() {
  const caseData = [
    { month: "Jan", pending: 45, solved: 30, new: 40 },
    { month: "Feb", pending: 35, solved: 40, new: 30 },
    { month: "Mar", pending: 50, solved: 35, new: 45 },
    { month: "Apr", pending: 40, solved: 45, new: 35 },
    { month: "May", pending: 30, solved: 50, new: 25 },
    { month: "Jun", pending: 45, solved: 40, new: 35 },
  ];
  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Dashboard
      </h1>

      <div className="stats shadow w-full bg-base-300">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconFile size={40} />
          </div>
          <div className="stat-title">Total Active Cases</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconClock size={40} />
          </div>
          <div className="stat-title">Total Pending Investigation</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconShield size={40} />
          </div>
          <div className="stat-title">Total Officer OnDuty</div>
          <div className="stat-value text-success">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9703/9703596.png"
                  alt="user"
                />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
    </>
  );
}
