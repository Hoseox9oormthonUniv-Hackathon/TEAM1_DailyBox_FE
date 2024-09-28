import styled from "styled-components";
import Icons from "../../asset/icons/icons";

const TodoSettingBox = styled.div`
  border: 10px solid #393939;
  border-radius: 30px;
  padding: 30px 10px;

  & > h3 {
    font-size: 14px;
    color: #878787;
    text-align: start;
    margin-left: 20px;
  }
`;

const TodoSettingContent = styled.div`
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
`;

const Icon = styled.div`
  width: 25%;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:active,
  &:hover {
    transform: scale(0.9);
    cursor: pointer;
  }
`;

const TodoSetting = ({ setOpenModal }) => {
  const iconList = [
    "DOG",
    "EAT",
    "EXERCISE",
    "GIT",
    "PILL",
    "READ",
    "WALK",
    "WATER",
  ];
  return (
    <TodoSettingBox>
      <h3>필요한 이모지를 클릭하세요</h3>
      <TodoSettingContent>
        {iconList.map((emoji, idx) => {
          const EmojiComponent = Icons[emoji];
          return (
            <Icon
              key={idx}
              onClick={() => {
                setOpenModal({ isOpen: true, emoji });
              }}
            >
              {EmojiComponent && <EmojiComponent fill="#878787" />}
            </Icon>
          );
        })}
      </TodoSettingContent>
    </TodoSettingBox>
  );
};

export default TodoSetting;
