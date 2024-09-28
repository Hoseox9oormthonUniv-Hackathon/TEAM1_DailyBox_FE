import React, { useState } from "react";
import { ReactComponent as UndoSvg } from "../../asset/Undo.svg";
import { ReactComponent as CalendarSvg } from "../../asset/Calendar.svg";
import { ReactComponent as SettingSvg } from "../../asset/Setting.svg";
import { ReactComponent as CancelSvg } from "../../asset/Cancel.svg";
import styled from "styled-components";
import TodoList from "./TodoList";
import TodoSetting from "./TodoSetting";
import Calendar from "./Calendar";
import Modal from "../../components/Modal";

const MainPage = styled.div`
  min-height: 100vh;
  background-color: #2c2c2c;
  padding: 80px 40px 0px 40px;
  text-align: center;
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const Button = styled.button`
  background-color: #393939;
  border-radius: 15px;
  padding: 13px 24px;
`;

const UndoButton = styled(Button)`
  width: 25%;
`;

const CalendarButton = styled(Button)`
  width: 25%;
`;

const SettingButton = styled(Button)`
  width: 40%;
`;

const Main = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [history, setHistory] = useState([]);
  const [showComponent, setShowComponent] = useState("");
  const [openModal, setOpenModal] = useState({ isOpen: false, emoji: "" });

  const [todoList, setTodoList] = useState([
    { id: "1", emoji: "dog", count: 3, color: "#359BF9" },
    { id: "2", emoji: "eat", count: 5, color: "#35A34D" },
    { id: "3", emoji: "exercise", count: 2, color: "#C74343" },
    { id: "4", emoji: "git", count: 4, color: "#E5E879" },
  ]);

  const formatDate = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(currentDate);

  const undoClick = () => {
    if (history.length > 0) {
      const lastId = history.pop();
      setTodoList((prevList) =>
        prevList.map((item) =>
          item.id === lastId ? { ...item, count: item.count + 1 } : item
        )
      );
      setHistory([...history]);
    }
  };

  const toggleComponent = (component) => {
    setShowComponent((prev) => (prev !== component ? component : ""));
  };

  return (
    <MainPage>
      <h2>{formatDate}</h2>
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        history={history}
        setHistory={setHistory}
      />
      <ButtonSection>
        <UndoButton onClick={undoClick}>
          <UndoSvg />
        </UndoButton>
        <CalendarButton
          onClick={() => {
            toggleComponent("Calendar");
          }}
        >
          {showComponent === "Calendar" ? <CancelSvg /> : <CalendarSvg />}
        </CalendarButton>
        <SettingButton
          onClick={() => {
            toggleComponent("Setting");
          }}
        >
          {showComponent === "Setting" ? <CancelSvg /> : <SettingSvg />}
        </SettingButton>
      </ButtonSection>
      {showComponent === "Calendar" ? (
        <Calendar />
      ) : showComponent === "Setting" ? (
        <TodoSetting setOpenModal={setOpenModal} />
      ) : null}

      {openModal.isOpen && (
        <Modal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </MainPage>
  );
};

export default Main;
