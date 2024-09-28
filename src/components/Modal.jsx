import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as UpArrow } from "../asset/UpArrow.svg";
import { ReactComponent as DownArrow } from "../asset/DownArrow.svg";

const ModalPage = styled.div`
  width: 300px;
  height: 360px;
  box-sizing: border-box;
  border: 10px solid #878787;
  border-radius: 30px;
  padding: 40px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NameInput = styled.div`
  display: flex;
  gap: 10px;
  height: 2rem;

  & > svg {
    width: 36px;
    height: 100%;
    flex-shrink: 0;
  }

  & > input {
    background-color: #4e4e4e;
    border-radius: 10px;
    padding-left: 10px;
    color: #d9d9d9;
    font-size: 1rem;
    font-weight: 900;
    flex-grow: 1; /* input이 남은 공간을 차지하도록 설정 */
    min-width: 0;

    &::placeholder {
      color: #878787;
      font-size: 1rem;
      font-weight: 900;
    }
  }
`;

const DayButton = styled.div`
  width: 100%;
  display: flex;
  height: 2rem;
  border-radius: 10px;

  & > button {
    background-color: #4e4e4e;
    color: #878787;
    width: 100%;
    font-size: 1rem;
    font-weight: 900;
  }

  & > :first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  & > :last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  & > .selected {
    background-color: #d9d9d9;
    color: #2c2c2c;
  }
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #d9d9d9;
  font-size: 1.25rem;
  font-weight: 900;
`;

const CountButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 26px;
  height: 40px;
  background-color: #4e4e4e;
  border-radius: 5px;

  & > div {
    background-color: #d9d9d9;
    padding-bottom: 3px;
    width: 100%;
    color: #2c2c2c;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  & > svg {
    cursor: pointer;
  }
`;

const Color = styled.div`
  display: flex;
  gap: 1rem;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 900;
`;

const ColorDiv = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.selected ? "3px solid #fff" : "none")};
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #d9d9d9;
  color: #2c2c2c;
  border-radius: 10px;
  font-weight: 900;
  font-size: 1rem;
`;

function Modal() {
  const colors = ["#C74343", "#E5E879", "#35A24D", "#359BF9"];
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedName, setSelectedName] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedCount, setSelectedCount] = useState(1);
  const [selectedColor, setselectedColor] = useState("");
  const [submit, setSubmit] = useState("등록하기");

  // day 버튼 핸들러
  const handleDayButtonClick = (day) => {
    if (selectedDays.includes(day)) {
      // 이미 선택된 경우 배열에서 제거
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      // 선택되지 않은 경우 배열에 추가
      setSelectedDays([...selectedDays, day]);
    }
  };

  // 배열에 들어간 요일 string 형식으로 변환.
  const [selectedDays, setSelectedDays] = useState([]);
  useEffect(() => {
    setSelectedDay(selectedDays.join(""));
  }, [selectedDays]);

  // 횟수 증가, 감소
  const increaseCount = () => {
    setSelectedCount((prevCount) => prevCount + 1);
  };

  const decreaseCount = () => {
    setSelectedCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  // 색 변경
  const handleColorChange = (event) => {
    setselectedColor(event.target.value);
  };

  // submit 출력
  const handleSubmit = () => {
    // 객체로 데이터 묶음
    const data = {
      emoji: "Pill", // SVG 이름
      name: selectedName,
      day: selectedDay,
      count: selectedCount,
      color: selectedColor,
    };

    console.log("Submitted Data: ", JSON.stringify(data, null, 2)); // 콘솔에 출력
  };

  return (
    <ModalPage>
      <NameInput>
        <input
          type="text"
          value={selectedName}
          placeholder="이름"
          onChange={(e) => setSelectedName(e.target.value)}
        />
      </NameInput>
      <DayButton>
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDayButtonClick(day)}
            className={selectedDays.includes(day) ? "selected" : ""}
          >
            {day}
          </button>
        ))}
      </DayButton>

      <Count>
        <div>횟수</div>
        <CountButton>
          <UpArrow width="6px" height="3px" onClick={increaseCount}></UpArrow>
          <div>{selectedCount}</div>
          <DownArrow
            width="6px"
            height="3px"
            onClick={decreaseCount}
          ></DownArrow>
        </CountButton>
      </Count>

      <Color>
        <div>색깔</div>
        {colors.map((color, idx) => (
          <label key={idx}>
            <HiddenInput
              type="radio"
              name="colors"
              value={color}
              checked={selectedColor === color}
              onChange={handleColorChange}
            ></HiddenInput>
            <ColorDiv
              color={color}
              selected={selectedColor === color}
              onClick={() => setselectedColor(color)}
            ></ColorDiv>
          </label>
        ))}
      </Color>

      <SubmitButton type="button" onClick={handleSubmit}>
        {submit}
      </SubmitButton>
    </ModalPage>
  );
}

export default Modal;
