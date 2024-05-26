import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";
import COLORS from "constants/color";
import { fetchAllMessages, sendMessage } from "store/chatSlice";
import { updateMessages } from "store/chatSlice";
import { io } from "socket.io-client";
import StandardButton from "components/common/StandardButton";
import CustomTextInput from "components/common/CustomTextInput";

const socket = io.connect("http://localhost:5000");

const ChatScreen = ({ identifier }) => {
  const myID = localStorage.getItem("identifier");
  const [ping, setPing] = useState("");
  const tempId = useRef(0);
  const dispatch = useDispatch();
  const { isLoading, messages } = useSelector((state) => state.chat);

  useEffect(() => {
    if (identifier) {
      alert("Hi, I just recived a message");
      socket.on("message_received", (data) => {
        console.log(
          "MESSAGE from socker =========================================> ",
          data
        ); // remove me

        if (data.sender !== myID) {
          dispatch(
            updateMessages({
              id: `Temp${tempId.current}`,
              sender: data.receiver,
              receiver: data.sender,
              message: data.message,
            })
          );
        }
      });

      const room = [identifier, myID].sort().join();
      socket.emit("join_room", room);
    }

    return () => {
      socket.removeAllListeners("message_received");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identifier, myID]);

  useEffect(() => {
    if (identifier) {
      dispatch(
        fetchAllMessages({
          params: {
            identifier,
          },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identifier]);

  const pingMessage = () => {
    const messageBody = {
      sender: myID,
      receiver: identifier,
      message: ping,
    };
    dispatch(
      sendMessage({
        body: messageBody,
        callback: () => {
          const room = [myID, identifier].sort().join();
          socket.emit("sendMessage", {
            data: { ...messageBody, id: `Temp${tempId.current}` },
            room,
          });

          dispatch(updateMessages({ ...messageBody, id: `Temp${tempId}` }));
          tempId.current += 1;
          setPing("");
        },
      })
    );
  };

  return (
    <div>
      {isLoading === true ? (
        <ReactLoading
          type="bubbles"
          color={COLORS.PRIMARY}
          height={100}
          width={50}
        />
      ) : (
        messages?.length > 0 && (
          <div style={styles.container}>
            <div style={styles.allMessages}>
              {messages.map((item) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      alignSelf:
                        identifier !== item?.sender ? "flex-end" : "flex-start",
                      backgroundColor: COLORS.PRIMARY,
                      padding: 20,
                    }}
                  >
                    <p style={{ color: COLORS.WHITE }} className="paraText">
                      {item?.message}
                    </p>
                  </div>
                );
              })}
            </div>

            <div style={styles.sendMessage}>
              <CustomTextInput
                type={"text"}
                autoComplete={"off"}
                value={ping}
                onChange={(event) => setPing(event.target.value)}
                placeholder={"Enter message"}
              />

              <StandardButton
                style={{
                  opacity: ping === "" ? 0.7 : 1,
                }}
                onClick={pingMessage}
                buttonText={"Send"}
                disabled={ping === ""}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

const styles = {
  container: {
    width: 650,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  allMessages: {
    backgroundColor: COLORS.WHITE,
    height: 400,
    overflow: "auto",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  sendMessage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
};

export default ChatScreen;
