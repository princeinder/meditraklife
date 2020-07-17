import React, { Fragment } from "react";
import ChatContainer from "./ChatContainer";

const sampleData = {
  currentId: "234ovcx24xkcjan354",
  opponentUser: {
    avatar: "",
    status: true,
    contactId: "",
    text: "",
    time: ""
  },
  messageList: [
    {
      contactId: "323sa680b3249760ea21rt47",
      text: "Do you ever find yourself falling into the “discount trap?”",
      time: "2018-02-10T08:45:28.291Z"
    },
    {
      contactId: "7863a6802ez0e277a0f98534",
      text: "Giving away your knowledge or product just to gain clients?",
      time: "2018-02-10T08:45:28.291Z"
    },
    {
      contactId: "323sa680b3249760ea21rt47",
      text: "Yes",
      time: "2018-02-10T08:45:28.291Z"
    },
    {
      contactId: "7863a6802ez0e277a0f98534",
      text: "Don’t feel bad. It happens to a lot of us",
      time: "2018-02-10T08:45:28.291Z"
    },
    {
      contactId: "323sa680b3249760ea21rt47",
      text: "Do you ever find yourself falling into the “discount trap?”",
      time: "2018-02-10T08:45:28.291Z"
    },
    {
      contactId: "7863a6802ez0e277a0f98534",
      text: "Giving away your knowledge or product just to gain clients?",
      time: "2018-02-10T08:45:28.291Z"
    },
    {
      contactId: "323sa680b3249760ea21rt47",
      text: "Yes",
      time: "2018-02-10T08:45:28.291Z"
    },
    {
      contactId: "7863a6802ez0e277a0f98534",
      text: "Don’t feel bad. It happens to a lot of us",
      time: "2018-02-10T08:45:28.291Z"
    }
  ],
  currentUser: {
    avatar: "/assets/images/faces/3.jpg",
    status: true,
    contactId: "",
    text: "",
    time: "4-03-2020"
  }
};

const ChatTab = () => {
  const { currentId, currentUser, messageList } = sampleData;
  return (
    <Fragment>
      <ChatContainer id={currentId} messageList={messageList} />
    </Fragment>
  );
};

export default ChatTab;
