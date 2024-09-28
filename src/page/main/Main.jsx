import React, { useState } from "react";
import { ReactComponent as UndoSvg } from "../../asset/Undo.svg";
import { ReactComponent as CalendarSvg } from "../../asset/Calendar.svg";
import { ReactComponent as SettingSvg } from "../../asset/Setting.svg";
import { ReactComponent as CancelSvg } from "../../asset/Cancel.svg";
import { ReactComponent as TrashlSvg } from "../../asset/Trash.svg";
import styled from "styled-components";
import TodoList from "./TodoList";
import TodoSetting from "./TodoSetting";
import Calendar from "./Calendar";
import Modal from "../../components/Modal";

const MainPage = styled.div`
  min-height: 100vh;
  background-color: #2c2c2c;
  padding: 80px 40px;
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
  width:25%;
`;

const SettingButton = styled(Button)`
  width: 40%;
`;

const Main = () => {
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [history, setHistory] = useState([]);
  const [showComponent, setShowComponent] = useState("");
  const [openModal,setOpenModal] = useState({"isOpen":false,"emoji":""});
  const [longPress,setLongPress] = useState({"isPress":false,"name":""});

  const [todoList, setTodoList] = useState([
    { id: "1", emoji: "DOG", count: 3, color: "#359BF9",name:"1번입니다" },
    { id: "2", emoji: "EAT", count: 5, color: "#35A34D",name:"2번입니다" },
    { id: "3", emoji: "EXERCISE", count: 2, color: "#C74343",name:"3번입니다" },
    { id: "4", emoji: "GIT", count: 4, color: "#E5E879",name:"4번입니다" },
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

    const handleDrop = (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData("text");
      if (id && event.currentTarget.classList.contains("trash-button")) {
        setTodoList((prevList) => prevList.filter((item) => item.id !== id));
        setLongPress({"isPress":false,name:""});
      }
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };

  return (
    <MainPage>
      {showComponent === "Setting"?
        <h2>ss</h2>
      :
        <h2>{longPress.isPress?longPress.name:formatDate}</h2>
      }
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        history={history}
        setHistory={setHistory}
        setLongPress={setLongPress}
      />
      <ButtonSection>
        <Button onClick={undoClick}>
          <UndoSvg />
        </Button>
        <Button
          className={showComponent === "Setting" ? "trash-button" : ""}
          onDrop={handleDrop} 
          onDragOver={handleDragOver} 
          onClick={() => {
            toggleComponent("Calendar");
          }}
        >
          {showComponent === "Calendar" ? (
            <CancelSvg />
          ) : showComponent === "Setting" ? (
            <TrashlSvg/>
          ) : (
            <CalendarSvg/>
          )}
        </Button>
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
