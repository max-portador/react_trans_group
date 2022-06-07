import React, {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import './App.css';
import styled from "styled-components";
import {useInView} from "react-intersection-observer";

function App() {

    const cards = ['First Card',
        ...Array(15).fill('Card'),
        'Last Card',
    ]

    const [posY, setPosY] = useState(0)
    const [count, setCount] = useState(0)

    const mouseDownHandler = (e: React.MouseEvent) => {
        if (e.button === 1) {
            console.log(e)
        }
    }

    const moving = (move: number) => {
        setPosY((y) => y - move)
    }

    let ref = useRef<HTMLDivElement>(null)


    return (
        <div className="App">
            <div style={{left: '50%', position: 'fixed', zIndex: 6}}>
                <button
                    onClick={event => {
                        moving(50)
                    }}
                    onMouseDown={mouseDownHandler}
                >UP
                </button>
                <button onClick={event => {
                    moving(-50)
                }}>DOWN
                </button>
                <h1>{count}</h1>
            </div>
            <Plunck ref={ref}>
                <CardContainer draggable={true} y={posY}>
                    {cards.map((text, i) => <Card key={i}
                                                  view={ref as any}
                                                  text={text + " " + i}
                                                  setCount={setCount}/>)}
                </CardContainer>
            </Plunck>


        </div>
    );
}

export default App;


const CardContainer = styled.div<any>`
  top: 0;
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  gap: 2rem;
  align-items: flex-start;
  transform: ${props => `translateY(${props.y}px)`};
  transition: transform 0.2s ease-in-out;
  z-index: -1;
`

const Card: FC<CardProps> = ({text, view, setCount}) => {

    const [notFirstRender, setIsNotFirstRender] = useState(false)
    const [content, setContent] = useState(text)


    const {ref, inView} = useInView({
        threshold: 0.5,
        root: view.current,
        onChange: (inView, entry) => {
            setContent(inView ? text + " VISIBLE" : text)
            setCount((count) => {
                console.log(count, text, notFirstRender)

                if (notFirstRender) {
                    return inView ? count + 1 : count - 1
                }
                else {
                    setIsNotFirstRender(true)
                    if (inView) return count + 1
                    return count
                }

            })
        }

    });

    return <StDiv ref={ref} isShown={inView}>{content}</StDiv>
}

type CardProps = {
    text: string;
    view: MutableRefObject<HTMLDivElement>;
    setCount: React.Dispatch<React.SetStateAction<number>>
}


const StDiv = styled.div<{ isShown?: boolean }>`
  background-color: steelblue;
  border: 1px solid black;
  border-radius: .25rem;
  padding: .5rem;
  height: 50px;
  width: 25vw;
  transform: ${props => props.isShown ? 'translateX(0)' : 'translateX(100px)'};
  opacity: ${props => props.isShown ? 1 : 0.4};
  transition: 150ms;
`

const Plunck = styled.div`
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  height: 40vh;
  background-color: yellow;
  opacity: .7;
  transform: translateY(-50%);
`