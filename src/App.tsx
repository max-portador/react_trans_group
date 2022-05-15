import React, {useEffect, useRef, useState} from 'react';
import cn from 'classnames';
import './App.css';
import {CSSTransition} from "react-transition-group";

const steps = [60, 20, 120, 100, 25, 0]
    .map((step, i) => ({
        label: `Step ${i + 1}`,
        dist: step
    }))

const getTotalDist = (curr: number) => {
    return steps.reduce((acc, step, i) => {
        if (i < curr) {
            return acc + step.dist + (i ? 60 : 30)
        } else {
            return acc
        }
    }, 10)
}

function App() {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [active, setActive] = useState<number>(0)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const foo = () => {console.log('transitionrun fired')}
        if (ref.current){
            ref.current.addEventListener('transitionrun', foo);
        }

        return () => {
            if (ref.current)
            ref.current.removeEventListener('transitionrun', foo);
        }
    }, [ref])

    const clickHandler = function(index: number){
        setActive(index)
    }


    return (
        <div className="App">
            <button onClick={() => {
                setIsVisible(prevState => !prevState)
            }}>
                {isVisible ? 'hide' : 'show'}
            </button>
            <h2>{getTotalDist(active)}</h2>
            <div className="wrapper">
                <div className="container">
                    <div className="scale"
                         ref={ref}
                         style={{
                             width: getTotalDist(active),
                             transition: 'width .3s linear'
                         }}
                    />

                    <ul className="progressbar">
                        {
                            steps.map((step, i) => (
                                <>
                                    <li
                                        key={step.label}
                                        className={cn('li',
                                            {
                                                'active': i <= active,
                                                'preactive': i < active
                                            })

                                        }
                                        style={{
                                            marginRight: i === steps.length - 1 ? 0 : step.dist
                                        }}
                                        onClick={() => clickHandler(i)}

                                    >
                                        {step.label}
                                    </li>
                                </>

                            ))
                        }
                    </ul>
                </div>
                <CSSTransition
                    in={isVisible}
                    timeout={500}
                    classNames={{
                        enterActive: 'circle-show',
                        enterDone: 'circle-rotate',
                        exitActive: 'circle-hide',
                    }}
                    mountOnEnter
                    unmountOnExit
                >
                    <div className="circle"/>
                </CSSTransition>
            </div>

        </div>
    );
}

export default App;
