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
  ReferenceLine,
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
      // console.log("the response is:", response.data);
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
  }, [categories]);

  return (
    <ResponsiveContainer
      width="100%"
      height={600}
      style={{ marginTop: "10rem" }}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="1 1" />
        {/* <XAxis dataKey="time" />
        <YAxis /> */}
        <XAxis dataKey="time">
          <label value="time slots" offset={12} position="insideBottom" />
        </XAxis>
        <YAxis
          label={{
            value: "car category frequency",
            angle: -90,
            position: "insideLeft",
            textAnchor: "middle",
          }}
        />
        <Tooltip wrapperStyle={{backdropFilter:"initial",background:"#e6e6e6"}} separator=":" itemStyle={{fontSize:"1em"}} />
        <Legend
          alphabetic={true}
          dominantBaseline={12}
          iconType="rect"
          verticalAlign="top"
          // height={36}
          margin={{bottom: 2,}}
        />

        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={getColor(index)}
            strokeDasharray="1 1"
            strokeOpacity={0.8}
             strokeDashoffset={2}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            animateNewValues={false}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// Function to get color for each line
const getColor = (index) => {
  // const colors = [
  //   "#8884d8",
  //   "#82ca9d",
  //   "#ffc658",
  //   "#ff7300",
  //   "#413ea0",
  //   "#d0ed57",
  //   "#75150e",
  //   "#750e66",
  //   "#e8ac13",
  //   "#0f0b33"

  // ];
  const colors = [
    '#3498DB',  // Blue
    '#E74C3C',  // Red
    '#2ECC71',  // Green
    '#9B59B6',  // Purple
    '#F1C40F',  // Yellow
    '#7F8C8D',  // Gray
    '#16A085',  // Teal
    '#D35400',  // Orange
    '#C0392B',  // Crimson
    '#2980B9',  // Cobalt Blue
    '#B2BEB5',  // Light Gray
    '#8592A6',  // Slate Gray
    '#E67E22',  // Carrot Orange
    '#94B49F',  // Mint Green
    '#F0B27A'   // Peach
  ];
  return colors[index % colors.length];
};

export default TrafficRecordsChart;
