import React, {FC} from 'react';
import './App.css';
import styled from "styled-components";
import {useInView} from "react-intersection-observer";

function App() {

    const cards = ['First Card',
        ...Array(25).fill('Card'),
        'Last Card',
    ]




    // @ts-ignore
    return (
        <div className="App">
            <CardContainer>
                {cards.map( text =>  <Card text={text}/>)}
            </CardContainer>
        </div>
    );
}

export default App;


const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  gap: 1rem;
  height: 250vh;
  align-items: flex-start;
`

const Card:FC<{text: string}> = ({text}) => {

    const { ref, inView } = useInView({
        threshold: .1
    });

    return <StDiv ref={ref} isShown={inView}>{text}</StDiv>
}



const StDiv = styled.div<{isShown?: boolean}>`
  background-color: steelblue;
  border: 1px solid black;
  border-radius: .25rem;
  padding: .5rem;
  height: 150px;
  width: 25vw;
  transform: ${props => props.isShown ? 'translateX(0)' : 'translateX(100px)'} ;
  opacity: ${props => props.isShown ? 1 : 0} ;
  transition: 150ms;
`