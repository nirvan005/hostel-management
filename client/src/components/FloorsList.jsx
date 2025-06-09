import React, { useEffect, useState } from "react";
import Floors from "./Floors";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function FloorsList() {
  const StoreContext = useContext(StoreContext);
  const { url } = StoreContext[0];
  const [floorData, setFloorData] = useState([]);
  const getFloors = async () => {
    try {
      const response = await axios.get(`${url}/floors`);

      const groupedData = response.data.reduce(
        (acc, { floor_no, room_no, status }) => {
          if (!acc[floor_no]) acc[floor_no] = { number: floor_no, rooms: [] };
          acc[floor_no].rooms.push({ room_no, status });
          return acc;
        },
        {}
      );
      setFloorData(Object.values(groupedData));
    } catch (error) {
      console.error("Error fetching floors:", error);
    }
  };

  useEffect(() => {
    getFloors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Building Floors</h1>
      <Floors floors={floorData} />
    </div>
  );
}
