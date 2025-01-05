import styled from "styled-components";

interface WrapperProps {
  maxWidth?: string;
}

export const Wrapper = styled.section<WrapperProps>`
  max-width: ${(props) => props.maxWidth || "1320px"};
  margin: 0 auto;
  //padding: 1em 0;
`;
