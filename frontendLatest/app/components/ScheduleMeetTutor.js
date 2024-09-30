import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import React, { useContext, useState } from "react";
import StateContext from "../StateContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ScheduleMeetTutor = () => {
  const client = useStreamVideoClient();
  const { user } = useContext(StateContext);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState();

  const navigate = useNavigate();

  const createMeetingHandler = async (e) => {
    e.preventDefault();
    if (!client || !user) return;
    try {
      // if (!values.dateTime) {
      //   toast.error("Please select a date and time");
      //   return;
      // }
      const id = uuidv4();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt = new Date(Date.now()).toISOString();
      const description = "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      // if (!values.description) {
      navigate(`dashboard/schedule-meet/${call.id}`);
      // }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Meeting");
    }
  };
  return (
    <div>
      <button onClick={createMeetingHandler}>Create Meeting</button>
    </div>
  );
};

export default ScheduleMeetTutor;
