import { write } from '@popperjs/core';
import { data } from 'jquery';
import { writable } from 'svelte/store';

export let selectedRoute = writable("");

export let user = writable("");