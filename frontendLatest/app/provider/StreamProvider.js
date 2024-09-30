import { useContext, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
// import { useUser } from "@clerk/nextjs";

// import { tokenProvider } from "@/actions/stream.actions";
import { tokenProvider } from "../../actions/stream.actions";
import StateContext from "../StateContext";
// import Loader from "@/components/Loader";

const API_KEY = process.env.STREAM_API_KEY;

const StreamVideoProvider = ({ children }) => {
  const [videoClient, setVideoClient] = useState();
  const { user } = useContext(StateContext);
  // const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!user) return;
    if (!API_KEY) throw new Error("Stream API key is missing");

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.talentSyncId,
        name: user?.talentSyncRole || user?.talentSyncId,
        // image: user?.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user]);

  if (!videoClient)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
