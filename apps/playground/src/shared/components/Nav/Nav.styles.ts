import styled from 'styled-components';

export const Root = styled.div`
    background-color: white;
    border-radius: 30px;
    box-shadow: rgb(151 158 176 / 20%) 0 10px 30px;
    margin: 32px;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
    }

    a {
        display: block;
        padding: 16px 16px;
        text-decoration: none;
        color: cornflowerblue;
        transition: 0.3s;

        &.active {
            transform: translateY(-3px);
        }

        &.active,
        &:hover {
            color: royalblue;
        }
    }
`;
