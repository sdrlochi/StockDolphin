import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDashboardData } from "../slices/dashboardSlice";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const {
    data: dashboardData,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(fetchDashboardData());
    }
  }, [userInfo, navigate, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {dashboardData && (
        <>
          <div>
            <h2>Inventory Summary</h2>
            <p>Categories: {dashboardData.categoriesCount}</p>
            <p>Items: {dashboardData.itemsCount}</p>
            <p>Total Orders: {dashboardData.ordersCount}</p>
            <p>Total Price of Orders: ${dashboardData.totalPrice}</p>
          </div>
          <div>
            <h2>Recent Activity</h2>
            <ul>
              {dashboardData.recentActivities.map((activity, index) => (
                <li key={index}>{`${activity.type} ${activity.action}: ${
                  activity.name || ""
                } on ${new Date(activity.date).toLocaleDateString()}`}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Recent Orders</h2>
            <ul>
              {dashboardData.recentOrders.map((order, index) => (
                <li key={index}>{`Order ID: ${order._id} - Total Price: ${
                  order.totalPrice
                } - Date: ${new Date(order.date).toLocaleDateString()}`}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
