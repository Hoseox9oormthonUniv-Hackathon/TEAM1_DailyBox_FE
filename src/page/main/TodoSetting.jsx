import styled from 'styled-components';
import Icons from '../../asset/icons/icons';

const TodoSettingBox = styled.div`
    height: 300px;
    border: 10px solid #393939;
    border-radius: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.div`
    width: 25%;
    text-align: center;
    transition: transform 0.2s ease-in-out;

    &:active {
        transform: scale(0.9);
    }
`;

const TodoAdd = () => {
    const iconList = ['dog','eat','exercise','git', 'pill', 'read', 'walk', 'water'];
    return (
        <TodoSettingBox>
            <h3>필요한 이모지를 클릭하세요</h3>
            {iconList.map(( emoji ) => {
                const EmojiComponent = Icons[emoji];
                return (
                    <Icon>
                        {EmojiComponent && <EmojiComponent fill='#878787'/>}
                    </Icon>
                );
            })}
        </TodoSettingBox>
    );
};

export default TodoAdd;