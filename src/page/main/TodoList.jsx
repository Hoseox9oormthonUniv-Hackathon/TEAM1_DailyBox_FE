import styled from "styled-components";
import Icons from "../../asset/icons/icons";
import { useRef } from "react";
import axios from "axios";

const TodoListBox = styled.div`
  height: 300px;
  border: 10px solid #393939;
  padding: 30px 20px;
  border-radius: 30px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  align-content: flex-start;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Icon = styled.div`
  width: 33.3%;
  height: 30%;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  margin-bottom: 20px;

  svg {
    width: 50%;
    height: 70%;
  }

  &:active,
  &:hover {
    transform: scale(0.9);
    cursor: pointer;
  }
`;

const Count = styled.span`
  color: ${(props) => (props.count ? props.color : "#393939")};
  font-weight: 700;
`;

const colorMap = {
  RED: "#C74343",
  YELLOW: "#E5E879",
  GREEN: "#35A24D",
  BLUE: "#359BF9",
};

const dayMap = {
  월요일: "MONDAY",
  화요일: "TUESDAY",
  수요일: "WEDNESDAY",
  목요일: "THURSDAY",
  금요일: "FRIDAY",
  토요일: "SATURDAY",
  일요일: "SUNDAY",
};

const TodoList = ({
  setHistory,
  history,
  setTodoList,
  todoList,
  setLongPress,
  currentDay,
  showComponent,
}) => {
  const longPressTimeout = useRef(null);

  const putDiscount = async (id) => {
    try {
      const res = await axios.put(
        `http://15.164.106.252:8080/api/emoji/down-count/${id}`
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const discountClick = (id) => {
    const item = todoList.find((item) => item.id === id);
    if (item.count > 0 && showComponent !== "Setting") {
      setTodoList((prevList) =>
        prevList.map((item) =>
          item.id === id && item.count > 0
            ? { ...item, count: item.count - 1 }
            : item
        )
      );
      putDiscount(id);
      setHistory([...history, id]);
    }
  };

  const handleLongPress = (name) => {
    setLongPress({ isPress: true, name });
  };

  const handleMouseDown = (name) => {
    longPressTimeout.current = setTimeout(() => handleLongPress(name), 500);
  };

  const handleMouseUp = () => {
    clearTimeout(longPressTimeout.current);
    setLongPress({ isPress: false, name: "" });
  };

  const handleTouchStart = (name) => {
    longPressTimeout.current = setTimeout(() => handleLongPress(name), 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimeout.current);
    setLongPress({ isPress: false, name: "" });
  };

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("text", id);
  };

  return (
    <TodoListBox>
      {todoList
        ?.filter((item) => item.day === dayMap[currentDay])
        .map(({ id, emojiType, count, color, name, goalCount }) => {
          const EmojiComponent = Icons[emojiType];
          return (
            <Icon
              id={id}
              key={id}
              onClick={() => discountClick(id)}
              onMouseDown={() => handleMouseDown(name)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={() => handleTouchStart(name)}
              onTouchEnd={handleTouchEnd}
              draggable
              onDragStart={(event) => handleDragStart(event, id)}
            >
              {showComponent === "Setting"
                ? EmojiComponent && <EmojiComponent fill={colorMap[color]} />
                : EmojiComponent && (
                    <EmojiComponent
                      fill={count === 0 ? "#393939" : colorMap[color]}
                    />
                  )}
              {showComponent === "Setting" ? (
                <Count color={colorMap[color]} count={goalCount}>
                  {goalCount}
                </Count>
              ) : (
                <Count color={colorMap[color]} count={count}>
                  {count}
                </Count>
              )}
            </Icon>
          );
        })}
    </TodoListBox>
  );
};

export default TodoList;
