import { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transition: opacity 0.25s ease, visibility 0.25s ease;
  z-index: 999;
`;

const Panel = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 360px;
  max-width: 90vw;
  background-color: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform 0.3s ease;
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #111827;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  color: #6b7280;
  padding: 0;

  &:hover {
    color: #111827;
  }
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageBubble = styled.div<{ $fromUser: boolean }>`
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  line-height: 1.4;
  align-self: ${({ $fromUser }) => ($fromUser ? "flex-end" : "flex-start")};
  background-color: ${({ $fromUser }) => ($fromUser ? "orange" : "#f3f4f6")};
  color: ${({ $fromUser }) => ($fromUser ? "white" : "#111827")};
`;

const InputForm = styled.form`
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #e5e7eb;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.85rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const TechSupport = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      input.trim(),
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        "Your request has been registered and you will be contacted by someone as soon as possible.",
      ]);
    }, 800);
  };

  return (
    <>
      <Overlay $open={open} onClick={() => setOpen(false)} />

      <Panel $open={open} role="dialog" aria-label="Tech support chat">
        <Header>
          <div>
            <HeaderTitle>Tech support</HeaderTitle>
          </div>
          <CloseButton onClick={() => setOpen(false)} aria-label="Close chat">
            x
          </CloseButton>
        </Header>

        <MessageList>
          {messages.map((msg) => (
            <MessageBubble key={msg} $fromUser={true}>
              {msg}
            </MessageBubble>
          ))}
        </MessageList>

        <InputForm onSubmit={sendMessage}>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </InputForm>
      </Panel>
    </>
  );
};

export default TechSupport;

