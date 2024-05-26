import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";
import COLORS from "constants/color";
import { fetchAllMessages, sendMessage } from "store/chatSlice";
import { updateMessages } from "store/chatSlice";
import StandardButton from "components/common/StandardButton";
import CustomTextInput from "components/common/CustomTextInput";

const ChatScreen = ({ identifier }) => {
  const myID = localStorage.getItem("identifier");
  const [ping, setPing] = useState("");
  const dispatch = useDispatch();
  const { isLoading, messages } = useSelector((state) => state.chat);

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
    dispatch(
      sendMessage({
        body: {
          sender: myID,
          receiver: identifier,
          message: ping,
        },
        callback: () => {
          dispatch(
            updateMessages({
              sender: myID,
              receiver: identifier,
              message: ping,
            })
          );
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
