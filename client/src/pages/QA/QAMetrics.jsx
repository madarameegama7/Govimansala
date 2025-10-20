import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import "./QAStyles.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const QAMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalInspections: 0,
    approvedCount: 0,
    rejectedCount: 0,
    pendingCount: 0,
    approvalRate: 0,
    avgProcessingTime: 0,
    monthlyData: []
  });
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/qa/metrics?range=${timeRange}`);
        setMetrics(res.data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
        // Fallback mock data
        setMetrics({
          totalInspections: 156,
          approvedCount: 128,
          rejectedCount: 18,
          pendingCount: 10,
          approvalRate: 87.2,
          avgProcessingTime: 2.3,
          monthlyData: [
            { month: 'Jan', inspections: 45, approved: 38, rejected: 7 },
            { month: 'Feb', inspections: 52, approved: 45, rejected: 7 },
            { month: 'Mar', inspections: 59, approved: 52, rejected: 7 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, [timeRange]);

  // Chart data configurations
  const monthlyTrendsData = {
    labels: metrics.monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Total Inspections',
        data: metrics.monthlyData.map(item => item.inspections),
        backgroundColor: 'rgba(24, 94, 79, 0.8)',
        borderColor: 'hsl(169, 79%, 18%)',
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Approved',
        data: metrics.monthlyData.map(item => item.approved),
        backgroundColor: 'rgba(6, 214, 160, 0.8)',
        borderColor: '#06D6A0',
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Rejected',
        data: metrics.monthlyData.map(item => item.rejected),
        backgroundColor: 'rgba(239, 71, 111, 0.8)',
        borderColor: '#EF476F',
        borderWidth: 2,
        borderRadius: 4,
      }
    ]
  };

  const approvalRateData = {
    labels: ['Approved', 'Rejected', 'Pending'],
    datasets: [
      {
        data: [metrics.approvedCount, metrics.rejectedCount, metrics.pendingCount],
        backgroundColor: [
          '#06D6A0',
          '#EF476F',
          '#FFD166'
        ],
        borderColor: [
          '#05c290',
          '#e53e6a',
          '#e6b952'
        ],
        borderWidth: 2,
        cutout: '65%',
      }
    ]
  };

  const processingTimeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Average Processing Time (hours)',
        data: [2.1, 1.8, 2.4, 2.2, 1.9, 3.1, 2.8],
        fill: true,
        backgroundColor: 'rgba(184, 224, 97, 0.2)',
        borderColor: '#B8E061',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#B8E061',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
      }
    ]
  };

  const categoryDistributionData = {
    labels: ['Dairy', 'Produce', 'Grains', 'Meat', 'Beverages', 'Other'],
    datasets: [
      {
        label: 'Inspections by Category',
        data: [35, 28, 22, 15, 12, 8],
        backgroundColor: [
          'rgba(24, 94, 79, 0.8)',
          'rgba(6, 214, 160, 0.8)',
          'rgba(184, 224, 97, 0.8)',
          'rgba(255, 209, 102, 0.8)',
          'rgba(239, 71, 111, 0.8)',
          'rgba(17, 138, 178, 0.8)'
        ],
        borderColor: [
          'hsl(169, 79%, 18%)',
          '#06D6A0',
          '#B8E061',
          '#FFD166',
          '#EF476F',
          '#118AB2'
        ],
        borderWidth: 1,
      }
    ]
  };

  // Chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '600'
          }
        }
      },
      title: {
        display: true,
        text: 'Monthly Inspection Trends',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: 'hsl(169, 79%, 18%)',
        padding: 20
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 11,
            weight: '600'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11,
            weight: '600'
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 11,
            weight: '600'
          }
        }
      },
      title: {
        display: true,
        text: 'Inspection Distribution',
        font: {
          size: 14,
          weight: 'bold'
        },
        color: 'hsl(169, 79%, 18%)',
        padding: 10
      },
    },
    cutout: '65%',
    maintainAspectRatio: false
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '600'
          }
        }
      },
      title: {
        display: true,
        text: 'Weekly Processing Time',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: 'hsl(169, 79%, 18%)',
        padding: 20
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 11,
            weight: '600'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11,
            weight: '600'
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  if (loading) {
    return (
      <div className="qa-metrics">
        <div className="qa-container">
          <div className="qa-content">
            <div className="qa-loading">
              <div className="loading-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qa-metrics">
      <div className="qa-container">
        <div className="qa-content fade-in">
          <div className="qa-header">
            <div>
              <h2>Quality Assurance Analytics</h2>
              <p>Comprehensive insights into inspection performance</p>
            </div>
            <div className="period-selector">
              <select 
                className="form-input" 
                style={{ width: '150px' }}
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="qa-icon">📊</div>
              <div className="metric-value">{metrics.totalInspections}</div>
              <div className="metric-label">Total Inspections</div>
              <div className="metric-change change-positive">+12% from last month</div>
            </div>

            <div className="metric-card">
              <div className="qa-icon">✅</div>
              <div className="metric-value">{metrics.approvedCount}</div>
              <div className="metric-label">Approved</div>
              <div className="metric-change change-positive">+8% from last month</div>
            </div>

            <div className="metric-card">
              <div className="qa-icon">❌</div>
              <div className="metric-value">{metrics.rejectedCount}</div>
              <div className="metric-label">Rejected</div>
              <div className="metric-change change-negative">-5% from last month</div>
            </div>

            <div className="metric-card">
              <div className="qa-icon">⏱️</div>
              <div className="metric-value">{metrics.approvalRate}%</div>
              <div className="metric-label">Approval Rate</div>
              <div className="metric-change change-positive">+3% from last month</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px', marginBottom: '25px' }}>
            <div className="chart-container">
              <div style={{ height: '400px' }}>
                <Bar data={monthlyTrendsData} options={barChartOptions} />
              </div>
            </div>

            <div className="chart-container">
              <div style={{ height: '400px' }}>
                <Doughnut data={approvalRateData} options={doughnutOptions} />
              </div>
            </div>
          </div>

          <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
            <div className="chart-container">
              <div style={{ height: '300px' }}>
                <Line data={processingTimeData} options={lineChartOptions} />
              </div>
            </div>

            <div className="chart-container">
              <div style={{ height: '300px' }}>
                <Bar 
                  data={categoryDistributionData} 
                  options={{
                    ...barChartOptions,
                    plugins: {
                      ...barChartOptions.plugins,
                      title: {
                        ...barChartOptions.plugins.title,
                        text: 'Inspections by Category'
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="qa-segment">
            <h3>Performance Overview</h3>
            <div className="qa-form" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className="form-group">
                <label className="form-label">Average Processing Time</label>
                <div className="form-input" style={{ background: "#f8f9fa", border: "none" }}>
                  {metrics.avgProcessingTime} hours
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Current Pending</label>
                <div className="form-input" style={{ background: "#f8f9fa", border: "none" }}>
                  {metrics.pendingCount} inspections
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Quality Score</label>
                <div className="form-input" style={{ background: "#f8f9fa", border: "none" }}>
                  94.5%
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Response Time</label>
                <div className="form-input" style={{ background: "#f8f9fa", border: "none" }}>
                  2.3 hours avg
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Efficiency Rate</label>
                <div className="form-input" style={{ background: "#f8f9fa", border: "none" }}>
                  88.7%
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Re-inspection Rate</label>
                <div className="form-input" style={{ background: "#f8f9fa", border: "none" }}>
                  2.1%
                </div>
              </div>
            </div>
          </div>


          {/* Export Options */}
          <div className="qa-segment">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Export Reports</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="qa-btn qa-btn-secondary">
                  📄 Export PDF
                </button>
                <button className="qa-btn qa-btn-primary">
                  📊 Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAMetrics;