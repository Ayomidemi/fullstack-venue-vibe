'use client';

import React from 'react';

import { io, Socket } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_SOCKETS_URL || '', { autoConnect: false });

export const SocketContext = React.createContext<Socket>(socket);
