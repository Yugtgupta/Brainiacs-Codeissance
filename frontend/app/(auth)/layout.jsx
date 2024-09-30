"use client"

import initialState from '@/actions/initialState';
import ourReducer from '@/reducers/ourReducer';
import React, { useEffect } from 'react'
import { useImmerReducer } from 'use-immer';

const layout = ({ children }) => {
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  return (
    <div>{children}</div>
  )
}

export default layout
