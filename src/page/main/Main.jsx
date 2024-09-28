import React, { useEffect, useState } from "react";
import { ReactComponent as UndoSvg } from "../../asset/Undo.svg";
import { ReactComponent as CalendarSvg } from "../../asset/Calendar.svg";
import { ReactComponent as SettingSvg } from "../../asset/Setting.svg";
import { ReactComponent as CancelSvg } from "../../asset/Cancel.svg";
import { ReactComponent as CancelSvg2 } from "../../asset/Cancel2.svg";
import { ReactComponent as TrashlSvg } from "../../asset/Trash.svg";
import { ReactComponent as LeftArrow } from "../../asset/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../asset/RightArrow.svg";
import styled from "styled-components";
import TodoList from "./TodoList";
import TodoSetting from "./TodoSetting";
import Calendar from "./Calendar";
import Modal from "../../components/Modal";
import axios from "axios";

const MainPage = styled.div`
  min-height: 100vh;
  background-color: #2c2c2c;
  padding: 80px 55px;
  text-align: center;
  position: relative;
`;

const HeaderSection = styled.header`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #2c2c2c;

  h2 {
    margin: 0 40px;
    font-weight: 900;
    font-size: 20px;
  }
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const Button = styled.button`
  background-color: #393939;
  border-radius: 15px;
  padding: 10px 24px;
  width: 25%;
`;

const SettingButton = styled(Button)`
  width: 40%;
`;

const Main = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [history, setHistory] = useState([]);
  const [showComponent, setShowComponent] = useState("");
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    emoji: "",
    id: "",
  });
  const [longPress, setLongPress] = useState({ isPress: false, name: "" });

  const [todoList, setTodoList] = useState([
    // { id: "1", emojiType: "DOG", count: 3,goalCount:5, color: "#359BF9",name:"1번입니다",day: "MONDAY" },
    // { id: "2", emojiType: "EAT", count: 5,goalCount:5, color: "#35A34D",name:"2번입니다",day: "MONDAY" },
    // { id: "3", emojiType: "EXERCISE", count: 2,goalCount:5, color: "#C74343",name:"3번입니다",day: "MONDAY" },
    // { id: "4", emojiType: "GIT", count: 4,goalCount:5, color: "#E5E879",name:"4번입니다",day: "MONDAY" },
  ]);
  useEffect(() => {
    const getTodoList = async () => {
      try {
        const res = await axios.get(
          "http://15.164.106.252:8080/api/emoji/week-emoji"
        );
        console.log("호출");
        setTodoList(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTodoList();
  }, [openModal]);
  console.log(todoList)
  const putUndo = async (id) => {
    try {
      const res = await axios.put(
        `http://15.164.106.252:8080/api/emoji/back-count/${id}`
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(
        `http://15.164.106.252:8080/api/emoji/delete/${id}`
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(todoList)

  const formatDate = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(currentDate);

  const getKoreanDay = () => {
    const daysInKorean = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return daysInKorean[currentDate.getDay()];
  };

  const ChangeDay = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === ">") {
        newDate.setDate(newDate.getDate() + 1);
      } else if (direction === "<") {
        newDate.setDate(newDate.getDate() - 1);
      }
      return newDate;
    });
  };

  const undoClick = () => {
    if (showComponent === "Setting") {
      toggleComponent("Setting");
    } else if (history.length > 0) {
      const lastId = history.pop();
      setTodoList((prevList) =>
        prevList.map((item) =>
          item.id === lastId ? { ...item, count: item.count + 1 } : item
        )
      );
      setHistory([...history]);
      putUndo(lastId);
    }
  };

  const toggleComponent = (component) => {
    setShowComponent((prev) => (prev !== component ? component : ""));
    setCurrentDate(new Date());
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const id = Number(event.dataTransfer.getData("text"));
    if (id && event.currentTarget.classList.contains("trash-button")) {
      setTodoList((prevList) => prevList.filter((item) => item.id !== id));
      setLongPress({ isPress: false, name: "" });
      deleteTodo(id);
    }
  };

  const handleDropUpdate = (event) => {
    event.preventDefault();
    const id = Number(event.dataTransfer.getData("text"));
    const item = todoList.find((item) => item.id === id);
    if (id && event.currentTarget.classList.contains("update-button")) {
      setLongPress({ isPress: false, name: "" });
      setOpenModal({ isOpen: true, emoji: item.emojiType, id: item.id });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <MainPage>
      <HeaderSection>
        {showComponent === "Setting" ? (
          <>
            <button
              style={{ backgroundColor: "#2c2c2c" }}
              onClick={() => {
                ChangeDay("<");
              }}
            >
              <LeftArrow />
            </button>
            <h2>{getKoreanDay()}</h2>
            <button
              style={{ backgroundColor: "#2c2c2c" }}
              onClick={() => {
                ChangeDay(">");
              }}
            >
              <RightArrow />
            </button>
          </>
        ) : (
          <h2>{longPress.isPress ? longPress.name : formatDate}</h2>
        )}
      </HeaderSection>
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        history={history}
        setHistory={setHistory}
        setLongPress={setLongPress}
        currentDay={getKoreanDay()}
        showComponent={showComponent}
      />
      <ButtonSection>
        <Button onClick={undoClick}>
          {showComponent === "Setting" ? (
            <CancelSvg2 width="24px" height="24px" />
          ) : (
            <UndoSvg width="26px" height="23px" />
          )}
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
            <CancelSvg width="24px" height="24px" />
          ) : showComponent === "Setting" ? (
            <TrashlSvg width="24px" height="24px" />
          ) : (
            <CalendarSvg width="24px" height="24px" />
          )}
        </Button>
        <SettingButton
          className="update-button"
          onDrop={handleDropUpdate}
          onDragOver={handleDragOver}
          onClick={() => {
            toggleComponent("Setting");
          }}
        >
          <SettingSvg width="26" height="26" />
        </SettingButton>
      </ButtonSection>
      {showComponent === "Calendar" ? (
        <Calendar />
      ) : showComponent === "Setting" ? (
        <TodoSetting setOpenModal={setOpenModal} />
      ) : null}

      {openModal.isOpen && (
        <Modal openModal={openModal} setOpenModal={setOpenModal} todoList={todoList} />
      )}
    </MainPage>
  );
};

export default Main;
