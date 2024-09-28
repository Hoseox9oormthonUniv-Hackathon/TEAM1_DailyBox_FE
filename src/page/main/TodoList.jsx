import styled from 'styled-components';
import Icons from '../../asset/icons/icons';
import { useRef } from 'react';

const TodoListBox = styled.div`
    height: 300px;
    border: 10px solid #393939;
    border-radius: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.div`
    width: 30%;
    text-align: center;
    transition: transform 0.2s ease-in-out;

    &:active {
        transform: scale(0.9);
    }
`;

const Count = styled.span`
    color:${props=>props.count===0?'#393939':props.color};
    font-weight:700;
`;

const TodoList = ({setHistory,history,setTodoList,todoList}) => {
    const longPressTimeout = useRef(null);
    console.log(longPressTimeout);

    const discountClick = (id) => {
        const item = todoList.find((item) => item.id === id);
        if (item.count > 0){
            setTodoList((prevList) =>
                prevList.map((item) =>
                    item.id === id && item.count > 0
                        ? { ...item, count: item.count - 1 }
                        : item
                )
            );
    
            setHistory([...history,id]);
        }
    };

    const handleLongPress = (id) => {
        console.log(`${id}가 꾹`);
    };

    const handleMouseDown = (id) => {
        longPressTimeout.current = setTimeout(() => handleLongPress(id), 200);
    };

    const handleMouseUp = () => {
        clearTimeout(longPressTimeout.current);
    };

    return (
        <TodoListBox>
            {todoList.map(({ id, emoji, count, color }) => {
                const EmojiComponent = Icons[emoji];
                return (
                    <Icon key={id} onClick={() => discountClick(id)}
                        onMouseDown={() => handleMouseDown(id)}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {EmojiComponent && <EmojiComponent fill={count === 0 ? '#393939' : color} />}
                        <Count color={color} count={count}>{count}</Count>
                    </Icon>
                );
            })}
        </TodoListBox>
    );
};

export default TodoList;
