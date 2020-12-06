import React, { memo } from 'react';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { AppContainer } from '../view/app/app.container';

export const Bootstrap = context.combine(AppContainer, (AppContainer) => memo(() => <AppContainer />));
