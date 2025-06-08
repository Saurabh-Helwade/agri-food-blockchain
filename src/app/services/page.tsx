"use client";

const ServicesPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-primary mb-6">Our Services</h1>

      <p className="text-lg mb-6">
        AgriFood leverages blockchain to provide a secure, transparent, and decentralized
        platform for managing the agricultural food supply chain.
      </p>

      <ul className="space-y-6 text-base-content text-lg">
        <li>
          <strong>🌾 Farmer Integration:</strong> Farmers can register produce, upload crop data,
          and view transaction history to ensure fair and traceable distribution.
        </li>
        <li>
          <strong>🏭 Manufacturer Management:</strong> Track sourcing of raw materials and manage
          quality control records with immutability through blockchain.
        </li>
        <li>
          <strong>🚚 Transporter Network:</strong> Enable secure, time-stamped tracking of goods
          while in transit.
        </li>
        <li>
          <strong>🏪 Supplier Visibility:</strong> Suppliers can access product lifecycle data to
          validate freshness, authenticity, and source.
        </li>
        <li>
          <strong>🔐 Smart Contracts:</strong> Automate supply agreements and enforce terms
          securely without intermediaries.
        </li>
        <li>
          <strong>📦 Transparent Traceability:</strong> Every user can trace the origin, journey,
          and status of any food item through blockchain records.
        </li>
      </ul>
    </div>
  );
};

export default ServicesPage;
