import React, { Fragment, useState } from "react";
import {
  IconButton,
  Icon,
  Divider,
  Fab,
  TextField,
  MenuItem
} from "@material-ui/core";
// import { EgretMenu } from "egret";
import Scrollbar from "react-perfect-scrollbar";
import EmptyMessage from "./shared/EmptyMessage";
import ChatAvatar from "./shared/ChatAvatar";
import { getTimeDifference } from "utils";
import shortid from "shortid";

const ChatContainer = ({
  id: currentUserId,
  toggleSidenav,
  currentChatRoom,
  opponentUser,
  messageList = [],
  setBottomRef,
  handleMessageSend
}) => {
  let [message, setMessage] = useState("");
  const sendMessageOnEnter = event => {};

  return (
    <div className="chat-container flex-column position-relative">
      <Scrollbar
        containerRef={ref => {
          // setBottomRef(ref);
        }}
        className="chat-message-list flex-grow-1 position-relative "
      >
        {currentChatRoom === "" && (
          <div className="flex-column flex-center flex-middle h-100">
            <EmptyMessage />
            <p>Select a contact</p>
          </div>
        )}

        {messageList.map((message, index) => (
          <div className="flex flex-top px-2 py-2" key={shortid.generate()}>
            <ChatAvatar src={message.avatar} status={message.status} />
            <div className="ml-3">
              <p className="text-muted m-0 mb-2">{message.name}</p>
              <div
                className={`px-2 py-1 mb-1 list__message ${
                  currentUserId === message.contactId
                    ? "bg-primary text-white"
                    : "bg-paper"
                }`}
              >
                <span className="white-space-pre-line">{message.text}</span>
              </div>
              <p className="text-muted mb-0">
                {getTimeDifference(new Date(message.time))} ago
              </p>
            </div>
          </div>
        ))}
        {/* <div ref={ref => setBottomRef(ref)} /> */}
      </Scrollbar>

      <Divider />

      {currentChatRoom !== "" && (
        <div className="flex flex-middle p-4  bg-white">
          <TextField
            label="Type your message here*"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={sendMessageOnEnter}
            fullWidth
            multiline={true}
            rows={1}
          />
          <div>
            <Fab color="primary" className="ml-4" size="small">
              <Icon fontSize="small">send</Icon>
            </Fab>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
