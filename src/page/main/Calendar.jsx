import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 100%;
  height: 230px;
  border-radius: 30px;
  margin-top: 20px;
  padding: 1rem;
  background-color: #393939;

  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const ThisWeek = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 900;
  padding: 0 5px;

  & > :first-child {
    display: flex;
    justify-content: flex-start;
  }

  & > :last-child {
    display: flex;
    justify-content: flex-end;
  }
`;

const DayContainer = styled.div`
  padding: 0.25rem;
  border-radius: 10px;
  background-color: ${(props) => (props.isToday ? "#B9B9B9" : "#2c2c2c")};
  color: ${(props) => (props.isToday ? "#2c2c2c" : "#878787")};
  font-weight: 900;
  display: flex;
  flex-direction: column;
  & > p {
    font-size: 0.75rem;
  }

  & > div {
    flex: 1;
  }
`;

const DayEmoji = styled.div``;

const Calendar = () => {
  const [weekRange, setWeekRange] = useState({ start: "", end: "" });
  const [todayLabel, setTodayLabel] = useState("");
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

  useEffect(() => {
    const getThisWeekRange = () => {
      const today = new Date();
      const day = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
      const diff = today.getDate() - (day === 0 ? 6 : day - 1); // 월요일을 시작으로 설정 (일요일이면 한 주 앞당김)

      // 이번 주의 시작일 (월요일)
      const startOfWeek = new Date(today.setDate(diff));
      // 이번 주의 종료일 (일요일)
      const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));

      // 날짜를 MM.DD 형식으로 변환
      const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월
        const day = date.getDate().toString().padStart(2, "0"); // 일
        return `${month}.${day}`;
      };

      // 이번 주의 시작일과 종료일 설정
      setWeekRange({
        start: formatDate(startOfWeek),
        end: formatDate(endOfWeek),
      });

      // 현재 요일 인덱스 계산
      const todayIndex = day === 0 ? 6 : day - 1; // 일요일이면 배열의 마지막 인덱스(6)로 설정
      setTodayLabel(daysOfWeek[todayIndex]); // 현재 요일 설정
    };

    getThisWeekRange();
  }, []);

  return (
    <CalendarContainer>
      <ThisWeek>
        <p>{weekRange.start}</p>
        <p>-</p>
        <p>{weekRange.end}</p>
      </ThisWeek>
      {daysOfWeek.map((day, index) => (
        <DayContainer key={index} isToday={day === todayLabel}>
          <p>{day}</p>
          <DayEmoji></DayEmoji>
        </DayContainer>
      ))}
    </CalendarContainer>
  );
};

export default Calendar;
