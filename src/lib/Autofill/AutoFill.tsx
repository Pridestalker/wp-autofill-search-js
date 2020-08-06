import React from 'react';
import styled from 'styled-components';
import {AutoFillItem} from "../AutoFillItem/AutoFillItem";

const AutoFillWrapper = styled.div`
  position: absolute;
  top: calc(100% + .5rem + 1px);
  left: calc(-.5rem - 1px);
  right: calc(-.5rem - 1px);
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(51, 51, 51, 0.345);
  z-index: 1;
  color: #000000;
`;

interface AutoFillProps {
    results: Array<any>,
}

interface AutoFillState {

}

export class AutoFill extends React.Component<AutoFillProps, AutoFillState> {
    render() {
        const { results } = this.props;
        if (results.length === 0) {
            return '';
        }

        return (
            <AutoFillWrapper className={'search-auto-fill'}>
                <nav>
                    {results.map((res,index) => (
                        <AutoFillItem key={index} res={res} />
                    ))}
                </nav>
            </AutoFillWrapper>
        )
    }
}
