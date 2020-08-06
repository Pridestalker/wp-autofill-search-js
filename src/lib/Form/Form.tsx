import React, { createRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AutoFill } from "../Autofill";

const SearchApp = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    background: transparent;
    
    input {
        background:transparent;
        color: currentColor;
        &::placeholder {
            opacity: 0.8;
        }
    }
`

interface FormProps {
    action: string,
}

interface FormState {
    loading: boolean,
    show_results: boolean,
    results: Array<{
        ID: number,
        post_type: string,
        post_title: string,
    }>,
    cursor: number,
}

export class Form extends React.Component<FormProps, FormState> {
    form = createRef<HTMLFormElement>();
    abortControllers = [] as Array<AbortController>;

    constructor(props: FormProps) {
        super(props);

        this.state = {
            loading: false,
            show_results: false,
            results: [],
            cursor: 0,
        } as FormState;

        this.handleFocusEvent = this.handleFocusEvent.bind(this);
        this.hideSearchFill = this.hideSearchFill.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    handleFocusEvent() {
        this.setState({
            show_results: true,
        });
    }

    hideSearchFill(e: React.FocusEvent<HTMLInputElement>) {
        if (!this.form.current) {
            return;
        }

        if (this.form.current.contains(e.target)) {
            return;
        }

        this.setState({
            show_results: false,
        });
    }

    async handleSearchInput(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ loading: true });
        this.abortControllers.forEach(abortController => abortController.abort());
        const abortController = new AbortController(),
            value = (e?.target as HTMLInputElement)?.value || '',
            { action } = this.props;
        this.abortControllers.push(abortController);
        if ('' === value || null === value || !value) {
            return this.hideSearchFill(e as React.FocusEvent<HTMLInputElement>);
        }

        let res;

        try {
            // @ts-ignore
            res = await (await fetch(window['ajax_url'] + `?action=${action}&s=${value}`, {
                signal: abortController.signal,
            })).json();
        } catch { return; } // Signal aborted.

        this.setState({
            show_results: true,
            results: res.data.posts,
            loading: false
        });
    }

    render() {
        const { show_results, results, loading, cursor } = this.state;
        return (
            <SearchApp className={'search-app'}>
                <input
                    placeholder={'Zoek een product...'}
                    id={'s'}
                    name={'s'}
                    type={'search'}
                    autoComplete={'off'}
                    className={'search-form-input'}
                    onFocus={this.handleFocusEvent}
                    onBlur={this.hideSearchFill}
                    onInput={this.handleSearchInput}
                />

                <button type={'submit'} className={'search-button'}>
                    <FontAwesomeIcon icon={loading? faSpinner : faSearch} spin={loading} />
                </button>

                {show_results && <AutoFill results={results} />}
            </SearchApp>
        );
    }
}
