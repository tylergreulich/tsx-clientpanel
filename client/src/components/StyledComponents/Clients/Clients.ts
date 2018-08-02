import styled from 'styled-components';

export const ClientTable = styled.section`
  width: 100%;
  height: 20vh;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 25rem 18rem 15rem 1fr 1fr;
  align-items: center;

  > p {
    font-size: 1.3rem;
    padding-left: 1rem;
  }
`;
