import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as UpArrow } from "../asset/UpArrow.svg";
import { ReactComponent as DownArrow } from "../asset/DownArrow.svg";
import { ReactComponent as Cancel } from "../asset/SqareCancel.svg";
import Icons from "../asset/icons/icons";
import axios from "axios";

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(55, 55, 55, 0.6);
  padding: 0 40px;
`;

const ModalPage = styled.div`
  background-color: #2c2c2c;
  height: 360px;
  box-sizing: border-box;
  border: 8px solid #878787;
  border-radius: 30px;
  padding: 50px 20px 30px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  & > svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }

  & > p {
    position: absolute;
    bottom: 12px;
    color: red;
    display: ${(props) => (props.isCorrect ? "none" : "block")};
    font-size: 12px;
  }
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
  width: 100%;
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
    padding-bottom: 2px;
    width: 100%;
    color: #2c2c2c;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  & > svg {
    cursor: pointer;
    width: 12px;
    height: 6px;
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

function Modal({ openModal, setOpenModal, todoList }) {
  const colors = ["#C74343", "#E5E879", "#35A24D", "#359BF9"];
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const daysToEnglish = {
    월: "MONDAY",
    화: "TUESDAY",
    수: "WEDNESDAY",
    목: "THURSDAY",
    금: "FRIDAY",
    토: "SATURDAY",
    일: "SUNDAY",
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };
  const colorMap = {
    "#C74343": "RED",
    "#E5E879": "YELLOW",
    "#35A24D": "GREEN",
    "#359BF9": "BLUE",
    RED: "#C74343",
    YELLOW: "#E5E879",
    GREEN: "#35A24D",
    BLUE: "#359BF9",
  };
  const [selectedName, setSelectedName] = useState("");
  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedCount, setSelectedCount] = useState(1);
  const [selectedColor, setselectedColor] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [submit, setSubmit] = useState("등록하기");
  const [isCorrect, setIsCorrect] = useState(true);

  const isEditMode = openModal.id !== undefined;

  useEffect(() => {
    // 수정 모드일 때 서버로부터 데이터를 가져옴
    if (openModal.id) {
      setSubmit("수정하기");
      fetchEmojiData(openModal.id);
    }
  }, [openModal.id]);

  const fetchEmojiData = (id) => {
    const item = todoList.find((item) => item.id === id);
      //가져온 데이터를 상태에 설정
      setselectedColor(colorMap[item.color]);
      setSelectedCount(item.goalCount);
      setSelectedName(item.name);
      setSelectedDays([`${daysToEnglish[item.day]}`]);// 영어 요일을 한글로 변환하여 설정
  };

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

  useEffect(() => {
    const englishSelectedDays = selectedDays.map((day) => daysToEnglish[day]); // selectedDays를 영어로 변환하여 배열로 유지
    setSelectedDay(englishSelectedDays); // 영어로 변환된 배열을 selectedDay 상태에 설정
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
  const handleSubmit = async () => {
    if (selectedDay.length === 0 || !selectedName || !selectedColor) {
      setIsCorrect(false);
      return; // 요청을 보내지 않고 함수 종료
    }

    const backendColor = colorMap[selectedColor];
    // 객체로 데이터 묶음
    const data = {
      emojiType: openModal.emoji, // SVG 이름
      name: selectedName,
      days: selectedDay,
      goalCount: selectedCount,
      color: backendColor,
    };

    const engDay = selectedDay[0];

    try {
      let response;
      if (openModal.id) {
        // 수정 요청 (PUT)
        response = await axios.put(
          `http://15.164.106.252:8080/api/emoji/update/${openModal.id}`,
          {
            emojiType: openModal.emoji, // SVG 이름
            name: selectedName,
            day: engDay,
            goalCount: selectedCount,
            color: backendColor,
          }
        );
      } else {
        // 생성 요청 (POST)
        response = await axios.post(
          "http://15.164.106.252:8080/api/emoji/add",
          data
        );
      }
      console.log("서버 응답: ", response.data);
    } catch (error) {
      console.error("요청 오류: ", error);
    }

    closeModal();
  };

  const EmojiComponent = Icons[openModal.emoji];

  const closeModal = () => {
    setIsCorrect(true);
    setOpenModal({ isOpen: false });
  };

  // 수정 모드일 때만 렌더링을 실행하게 조건부 렌더링 추가
  if (isEditMode && !selectedName) {
    return null; // 데이터가 로드될 때까지 렌더링하지 않음
  }

  return (
    <ModalBg onClick={closeModal}>
      <ModalPage onClick={(e) => e.stopPropagation()} isCorrect={isCorrect}>
        <Cancel width="27px" height="22px" onClick={closeModal} />
        <NameInput>
          {EmojiComponent && (
            <EmojiComponent fill={selectedColor ? selectedColor : "#D9D9D9"} />
          )}
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
        <p isCorrect>* 빈 칸을 모두 작성해주세요.</p>
      </ModalPage>
    </ModalBg>
  );
}

export default Modal;
