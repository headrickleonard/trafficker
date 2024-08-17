// Sample data from the API
const rawData = [
    {
      "carCategory": "Two Wheeler",
      "syncTime": "2024-08-17T12:05:19.000+00:00"
    },
    {
      "carCategory": "4 WD",
      "syncTime": "2024-08-17T12:05:19.000+00:00"
    },
    {
      "carCategory": "Car",
      "syncTime": "2024-08-17T11:38:38.000+00:00"
    },
    // Add all other data points here...
  ];
  
  // Helper function to process the data
  const processData = (data) => {
    // Initialize an empty object to store the processed data
    const groupedData = {};
  
    // Group the data by syncTime and carCategory
    data.forEach(({ carCategory, syncTime }) => {
      const date = new Date(syncTime).toISOString().slice(0, 16); // Get time up to minute
      if (!groupedData[date]) {
        groupedData[date] = {};
      }
      if (!groupedData[date][carCategory]) {
        groupedData[date][carCategory] = 0;
      }
      groupedData[date][carCategory] += 1;
    });
  
    // Convert grouped data to array format compatible with Recharts
    return Object.keys(groupedData).map((time) => ({
      time,
      ...groupedData[time],
    }));
  };
  
export const chartData = processData(rawData);
  