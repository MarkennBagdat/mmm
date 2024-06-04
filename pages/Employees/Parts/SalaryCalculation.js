import React, { useState } from "react";
import GeneralReport from "./ReportPages/GeneralReport"; // Adjust the import path as necessary
import DetailedReport from "./ReportPages/DetailedReport"; // Adjust the import path as necessary

const SalaryCalculation = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div>
      <div className="tabs-container">
        <div className="tabs">
          <span>Расчет зарплат сотрудников:</span>
          <button
            className={`tab-button ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            Общий отчет
          </button>
          <button
            className={`tab-button ${activeTab === "detailed" ? "active" : ""}`}
            onClick={() => setActiveTab("detailed")}
          >
            Детальный отчет
          </button>
        </div>
        <div className="report-container">
          {activeTab === "general" && <GeneralReport />}
          {activeTab === "detailed" && <DetailedReport />}
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculation;
