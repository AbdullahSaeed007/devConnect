import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { IoIosArrowBack } from "react-icons/io";
//import callIcon from "../Call.png";
//import MessageList from '../components/MessageList';

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey there!",
      lastMessageTime: "12d",
      image: "https://randomuser.me/api/portraits/men/0.jpg",
      seen: false,
      online: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "How are you?",
      lastMessageTime: "1h",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      seen: true,
      online: false,
    },
    {
      id: 3,
      name: "Alice",
      lastMessage:
        "What are you doing tonight rfgydhuisj fcyudhj uyvfh fygdhchufjdijfjdc fdtyfugiuryeg fhifvu89eryoeruiourf fioeufriouioieriousroeiu?",
      lastMessageTime: "13m",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      seen: false,
      online: true,
    },
    {
      id: 4,
      name: "Florence Derrance",
      lastMessage: "Ok",
      lastMessageTime: "12h",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      seen: true,
      online: false,
    },
    {
      id: 5,
      name: "Eimer Leverty",
      lastMessage: "See ya",
      lastMessageTime: "2m",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      seen: false,
      online: true,
    },
    {
      id: 6,
      name: "Lavern Labby",
      lastMessage: "HEHE <3",
      lastMessageTime: "4s",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      seen: false,
      online: false,
    },
  ]);

  const [messagelist, setMessageList] = useState([
    { message: "Hey", type: "sender" },
    { message: "Hi", type: "reciever" },
    { message: "Whatsupp??", type: "reciever" },
    { message: "Great! How are you doing?", type: "sender" },
    { message: "Perfect", type: "reciever" },
    { message: "What about you?", type: "reciever" },
    { message: "I am great :P", type: "sender" },
    { message: "How is your job going?", type: "sender" },
    { message: "Ahhhh exhausting!!", type: "reciever" },
    { message: "9 to 6 is so boring", type: "reciever" },
    { message: ":(", type: "reciever" },
    { message: "IKR:(", type: "sender" },
  ]); // State for messages
  const [messageInput, setMessageInput] = useState([]); // State for messages
  const messageContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messagelist]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  // Function to handle sending messages
  const sendMessage = (messageinput) => {
    // Update the messages state with the new message
    setMessageList([
      ...messagelist,
      { message: messageinput, type: "reciever" },
    ]);
  };
  // Function to handle input field change
  const handleInputChange = (event) => {
    // Update the message state as the user types
    setMessageInput(event.target.value);
  };

  // Function to handle sending message on Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      const message = messageInput.trim(); // Trim whitespace from the message
      if (message !== "") {
        sendMessage(message); // Send the message
        setMessageInput(""); // Clear the input field
      }
    }
  };

  const handleContactClick = (contact) => {
    // Update seen status if the message is not seen
    if (!contact.seen) {
      const updatedContacts = contacts.map((c) => {
        if (c.id === contact.id) {
          return { ...c, seen: true };
        }
        return c;
      });
      setContacts(updatedContacts);
      setSelectedContact({ ...contact, seen: true });
    } else {
      setSelectedContact(contact);
    }
    setIsChatOpen(true);
  };

  // Function to parse the time string into seconds
  const parseTimeToSeconds = (time) => {
    const unit = time.slice(-1);
    const value = parseInt(time.slice(0, -1));
    switch (unit) {
      case "s":
        return value;
      case "m":
        return value * 60;
      case "h":
        return value * 3600;
      case "d":
        return value * 86400;
      default:
        return 0; // Return 0 for unrecognized units
    }
  };

  // Count the number of unseen chats
  const unseenChatsCount = contacts.filter((contact) => !contact.seen).length;

  // Sort contacts based on parsed lastMessageTime
  const sortedContacts = [...contacts].sort((a, b) => {
    const timeA = parseTimeToSeconds(a.lastMessageTime);
    const timeB = parseTimeToSeconds(b.lastMessageTime);
    return timeA - timeB; // Use timeA - timeB for ascending order
  });

  // Function to truncate long messages
  const truncateMessage = (message, maxLength) => {
    return message.length > maxLength
      ? message.slice(0, maxLength) + "..."
      : message;
  };

  return (
    <div style={{ height: "98vh" }}>
      <Header screen={"Chat"} />
      <div className="flex my-5 md:mx-16 mx-2 overflow-hidden md:h-[90%] h-[89%]">
        {" "}
        {/* Add margins */}
        {/* Left sidebar */}
        <div
          className={`md:w-1/4 ${
            isChatOpen ? "hidden md:block" : "block"
          } w-full bg-white shadow-md`}
        >
          {" "}
          {/* Adjusted border width */}
          <div className="md:p-6 py-4 px-2 my-4 shadow-md">
            <div className="flex items-center justify-between mb-2 ">
              <h2 className="text-3xl font-bold ml-2">
                Messages{" "}
                {unseenChatsCount > 0 && (
                  <span className="bg-#ECECEC text-black rounded-full px-3 py-1 text-xs ml-3">
                    {unseenChatsCount}
                  </span>
                )}
              </h2>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M19.9999 3.3335C10.8166 3.3335 3.33325 10.8168 3.33325 20.0002C3.33325 29.1835 10.8166 36.6668 19.9999 36.6668C29.1833 36.6668 36.6666 29.1835 36.6666 20.0002C36.6666 10.8168 29.1833 3.3335 19.9999 3.3335ZM26.6666 21.2502H21.2499V26.6668C21.2499 27.3502 20.6833 27.9168 19.9999 27.9168C19.3166 27.9168 18.7499 27.3502 18.7499 26.6668V21.2502H13.3333C12.6499 21.2502 12.0833 20.6835 12.0833 20.0002C12.0833 19.3168 12.6499 18.7502 13.3333 18.7502H18.7499V13.3335C18.7499 12.6502 19.3166 12.0835 19.9999 12.0835C20.6833 12.0835 21.2499 12.6502 21.2499 13.3335V18.7502H26.6666C27.3499 18.7502 27.9166 19.3168 27.9166 20.0002C27.9166 20.6835 27.3499 21.2502 26.6666 21.2502Z"
                    fill="#615EF0"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="md:p-4 py-2 px-3">
            {/* Search bar */}
            <div className="relative mb-6">
              <input
                className="border border-#CCCCCC bg-#ECECEC h-12 w-full px-5 rounded-lg pr-10"
                type="text"
                placeholder="Search messages"
              />
            </div>

            {/* Scrollable Contacts List */}
            <div className="overflow-y-auto" style={{ height: "62vh" }}>
              {sortedContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    console.log(isChatOpen);
                    handleContactClick(contact);
                  }}
                  className="flex items-center justify-between p-2 cursor-pointer hover:bg-#ECECEC hover:rounded-lg"
                >
                  <div className="flex items-center justify-between w-full p-2 mb-6">
                    <div className="flex items-center">
                      <img
                        src={contact.image}
                        alt={contact.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-bold text-xl">{contact.name}</div>
                        <div
                          className={`text-sm ${
                            !contact.seen
                              ? "font-bold text-black"
                              : "font-normal text-black opacity-40"
                          }`}
                        >
                          {truncateMessage(contact.lastMessage, 20)}{" "}
                          {/* Truncate messages longer than 30 characters */}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-black opacity-30 ml-auto">
                      {contact.lastMessageTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Chat window */}
        <div
          className={`md:w-3/4 ${
            !isChatOpen ? "hidden md:block" : "block w-full"
          } bg-white shadow-md relative`}
        >
          {/* Phone icon and call button */}
          {selectedContact && (
            <button className="absolute top-0 right-0 m-4 flex items-center bg-#f0effe rounded-lg p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.44877 15.472 5.5161 14.3789 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95ZM21.97 18.33C21.9687 18.7074 21.8833 19.0798 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C19.39 21.62 19.38 21.63 19.37 21.63C18.78 21.87 18.14 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C10.36 19 9.97 18.71 9.6 18.4L12.87 15.13C13.15 15.34 13.4 15.5 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                  fill="#615EF0"
                />
              </svg>
              <span className="text-#615EF0 text-lg font-semibold">Call</span>
            </button>
          )}
          {selectedContact ? (
            <div>
              <div className="md:p-4 py-3 shadow-md">
                {/* Contact header */}

                <div className="flex items-center ml-4 mb-4">
                  <div
                    onClick={() => setIsChatOpen(false)}
                    className="md:hidden"
                  >
                    <IoIosArrowBack className="h-5 w-5" />
                  </div>
                  <img
                    src={selectedContact.image}
                    alt={selectedContact.name}
                    className="md:w-16 md:h-16 w-12 h-12 rounded-full ml-2 mr-4"
                  />
                  <div>
                    <div className="font-bold ms:text-3xl text-base">
                      {selectedContact.name}
                    </div>
                    {selectedContact.online && (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                          width="10"
                          height="11"
                          viewBox="0 0 10 11"
                          fill="none"
                        >
                          <circle cx="5" cy="5.5" r="5" fill="#68D391" />
                        </svg>
                        <div className="md:text-lg text-sm text-black opcaity-60">
                          Online
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                {/* Messages */}
                <div
                  className="p-4 overflow-y-auto"
                  style={{ height: "67vh" }}
                  ref={messageContainerRef}
                >
                  {messagelist.map((messages, index) => {
                    // Check if this is the first message or the current message type is different from the previous one
                    const isFirstMessage =
                      index === 0 ||
                      messages.type !== messagelist[index - 1].type;
                    const marginClass = isFirstMessage ? "" : `ml-14 mr-14`; // Adjust margin based on whether the image is displayed
                    return (
                      <div
                        key={index}
                        className={`flex items-center mb-2 ${
                          messages.type === "reciever"
                            ? "flex-row-reverse"
                            : "flex-row"
                        } ${marginClass}`}
                      >
                        {isFirstMessage && (
                          <img
                            src={selectedContact.image}
                            alt={selectedContact.name}
                            className={`w-10 h-10 rounded-full ${
                              messages.type === "reciever"
                                ? "md:ml-4 ml-2"
                                : "md:mr-4 mr-2"
                            }  `}
                          />
                        )}
                        <div
                          className={`p-2.5 rounded-lg max-w-xs ${
                            messages.type === "reciever"
                              ? "bg-#615EF0 text-white"
                              : "text-black bg-#F1F1F1"
                          }`}
                          style={{
                            wordWrap: "break-word", // Wrap long words
                            wordBreak: "break-word", // Break words to fit container
                          }}
                        >
                          {messages.message}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message input */}
                <div className="flex items-center ml-4  absolute bottom-0 left-0 right-0 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.9702 12V15.5C11.9702 17.43 13.5402 19 15.4702 19C17.4002 19 18.9702 17.43 18.9702 15.5V10C18.9702 6.13 15.8402 3 11.9702 3C8.10022 3 4.97021 6.13 4.97021 10V16C4.97021 19.31 7.66022 22 10.9702 22"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    className="border ml-4 mr-2 border-#CCCCCC rounded-lg p-2 w-full"
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress} // Handle Enter key press
                  />
                  <button
                    onClick={() => {
                      const message = messageInput?.trim(); // Trim whitespace from the message
                      if (message !== "") {
                        sendMessage(message); // Send the message
                        setMessageInput(""); // Clear the input field
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-4"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M16.1401 2.96004L7.11012 5.96004C1.04012 7.99004 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87004C22.3901 3.82004 20.1901 1.61004 16.1401 2.96004ZM16.4601 8.34004L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.4606 12.0189 11.3824 11.8285 11.3824 11.63C11.3824 11.4316 11.4606 11.2412 11.6001 11.1L15.4001 7.28004C15.6901 6.99004 16.1701 6.99004 16.4601 7.28004C16.7501 7.57004 16.7501 8.05004 16.4601 8.34004Z"
                        fill="#615EF0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-gray-500 text-2xl">
                Select a contact to start chatting
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
