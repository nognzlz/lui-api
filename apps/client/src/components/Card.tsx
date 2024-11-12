import { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  background-color: #fff;
  padding: 24px;
  margin: 32px;
  min-height: 280px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

interface CardProps extends PropsWithChildren {}

export function Card({ children }: CardProps) {
  return <StyledCard>{children}</StyledCard>;
}
