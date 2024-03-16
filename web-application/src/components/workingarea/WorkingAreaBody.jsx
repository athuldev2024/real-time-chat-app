/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import COLORS from "constants/color";
import { useSelector } from "react-redux";
import CustomTextInput from "components/common/CustomTextInput";
import NearMeIcon from "@mui/icons-material/NearMe";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { sendMessage, fetchMessages } from "store/chatSlice";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Ping = ({ item }) => {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <div
      style={{
        alignSelf: userDetails.id === item.id ? "flex-start" : "flex-end",
        width: 300,
        height: 60,
        backgroundColor: userDetails.id === item.id ? "aqua" : "lightgreen",
        borderRadius: 10,
        padding: 7,
      }}
    >
      {item.message}
    </div>
  );
};

const MessageArea = ({ allMessages }) => {
  return (
    <div style={styles.messageArea}>
      {allMessages.map((item, index) => (
        <Ping key={index} item={item} />
      ))}
    </div>
  );
};

const WorkingAreaBody = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const { selected, messages } = useSelector((state) => state.chat);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    socket.on("message_received", (data) => {
      console.log(
        "MESSAGE from socker =========================================> "
      );
    });
  }, []);

  useEffect(() => {
    dispatch(
      fetchMessages({
        params: {
          myid: userDetails.id,
          hisid: selected.id,
        },
        callback: () => {},
      })
    );

    const room = [userDetails.id, selected.id].sort().join();

    socket.emit("join_room", room);
  }, [selected.username]);

  useEffect(() => {
    if (messages?.length > 0) {
      setAllMessages([...messages[0].messages]);
    } else {
      setAllMessages([]);
    }
  }, [messages]);

  const onChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageFunc = () => {
    dispatch(
      sendMessage({
        body: {
          myid: userDetails.id,
          myusername: userDetails.username,
          hisid: selected.id,
          hisusername: selected.username,
          message: {
            id: userDetails.id,
            message,
          },
        },
        callback: () => {
          const temp = {
            id: userDetails.id,
            message,
          };
          const room = [userDetails.id, selected.id].sort().join();
          socket.emit("sendMessage", {
            data: temp,
            room,
          });
        },
      })
    );
  };

  return (
    <div style={styles.container}>
      <MessageArea allMessages={allMessages} />
      <div style={styles.sendMessage}>
        <CustomTextInput
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={onChange}
          autoComplete={"off"}
          isSearch={false}
        />

        <IconButton onClick={sendMessageFunc}>
          <NearMeIcon fontSize="large" color="secondary" />
        </IconButton>
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: "0.8",
    backgroundColor: COLORS.WHITE,
    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  messageArea: {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
    gap: 10,
    overflowY: "auto",
  },
  sendMessage: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
  },
};

export default WorkingAreaBody;
