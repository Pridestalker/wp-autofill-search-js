import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from './lib/Form';


export function render(target: string|HTMLElement|null)
{
    if (!target) {
        throw new Error('No target element or string provided');
    }

    if (isString(target)) {
        target = document.querySelector<HTMLElement>(target);
        if (!target) {
            return;
        }
    }

    const { action, ...set } = target.dataset
    if (!action) {
        throw new Error('No action set.');
    }

    ReactDOM.render(<Form action={action} {...set} />, target);
}

function isString(target: string | HTMLElement): target is string {
    return typeof target === 'string';
}
