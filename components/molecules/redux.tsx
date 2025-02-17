import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { AppDispatch, store } from '@/store/store';

type Props = { children: React.ReactNode };

export default function ReduxProvider({ children }: Props) {
  // TODO: Add app dispatch with useeffect ???
    return (
    <Provider store={store}>
      {children} 
    </Provider>
  );
}