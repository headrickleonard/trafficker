import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TrafficRecordsChart = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  // Predefined time slots in hours
  const timeSlots = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const fetchTrafficRecords = async () => {
    const url = "http://192.168.1.172:8087/api/v1/traffic-records/filter";
    try {
      const response = await axios.get(url);
      console.log("the response is:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("There was an error fetching the data!", error);
      return [];
    }
  };

  useEffect(() => {
    const processData = async () => {
      const trafficRecords = await fetchTrafficRecords();

      // Initialize frequency map for each time slot and category
      const categoryMap = {};
      timeSlots.forEach((slot) => {
        categoryMap[slot] = {};
      });

      // Populate categoryMap with frequencies
      trafficRecords.forEach((record) => {
        const time = new Date(record.deviceRecordedTime).getHours();
        const hourString = `${time.toString().padStart(2, "0")}:00`;
        const category = record.carCategory;

        if (!categoryMap[hourString]) {
          categoryMap[hourString] = {};
        }

        if (!categoryMap[hourString][category]) {
          categoryMap[hourString][category] = 0;
        }

        categoryMap[hourString][category]++;
      });

      // Determine all categories from the data
      const allCategories = new Set();
      trafficRecords.forEach((record) => {
        allCategories.add(record.carCategory);
      });

      setCategories([...allCategories]);

      // Convert categoryMap to an array suitable for Recharts
      const chartData = timeSlots.map((slot) => {
        const entry = { time: slot };
        categories.forEach((category) => {
          entry[category] = categoryMap[slot][category] || 0;
        });
        return entry;
      });

      setData(chartData);
    };

    processData();
  }, []);

  return (
    <ResponsiveContainer
      width="100%"
      height={600}
      style={{ marginTop: "10rem" }}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="time" />
        <YAxis /> */}
        <XAxis dataKey="time">
          <label
            value="time slots"
            offset={0}
            position="insideBottom"
          />
        </XAxis>
        <YAxis
          label={{
            value: "car category frequency",
            angle: -90,
            position: "insideLeft",
            textAnchor: "middle",
          }}
        />
        <Tooltip />
        <Legend />
        {/* Render a line for each car category */}
        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={getColor(index)}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// Function to get color for each line
const getColor = (index) => {
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#413ea0",
    "#d0ed57",
  ];
  return colors[index % colors.length];
};

export default TrafficRecordsChart;
