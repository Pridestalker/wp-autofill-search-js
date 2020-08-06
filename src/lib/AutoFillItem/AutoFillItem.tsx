import React, { createRef } from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

interface AutoFillItemProps {
    res: {
        ID: number,
        post_type: string,
        post_title: string,
    };

    focused?: boolean;
}


const AutoFillWrapper = styled.a`
	display: block;
	margin: .5rem 0;
	padding: 1rem;
	pointer-events: all;
	
	.result-title {
		font-weight: bold;
	}
	
	&:hover, &:focus {
		background: #1c413f;
		color: #ffffff;
	}
`

export class AutoFillItem extends React.Component<AutoFillItemProps, any> {
    render() {
        const { res } = this.props;

        return (
            <AutoFillWrapper href={`/?p=${res.ID}`}
                             key={res.ID}
                             className={['search-autofill-result', `${res.post_type}-result`].join(' ')} >
                <h3 title={res.post_title} className="result-title">
                    { res.post_title }
                </h3>
            </AutoFillWrapper>
        )
    }
}
