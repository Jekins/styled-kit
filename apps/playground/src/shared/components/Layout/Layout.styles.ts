import styled from 'styled-components';

export const Root = styled.div`
    font-family: sans-serif;
    font-size: 16px;
    line-height: 1.6;

    hr {
        margin: 40px 0;
        border: none;
        height: 1px;
        background-color: #dbe1e9;
    }

    * {
        box-sizing: border-box;
    }

    h1,
    h2,
    h3,
    h4 {
        margin: 0;
    }

    h1 {
        margin-bottom: 32px;
    }
    h2 {
        margin-bottom: 24px;
    }
    h3 {
        margin-bottom: 20px;
    }
    h4 {
        margin-bottom: 16px;
    }

    p {
        margin: 0;
    }
`;
