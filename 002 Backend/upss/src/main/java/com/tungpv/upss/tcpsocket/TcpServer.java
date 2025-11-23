package com.tungpv.upss.tcpsocket;

import org.springframework.stereotype.Component;

import java.net.ServerSocket;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TcpServer {
    private ServerSocket serverSocket;
    private final Map<String, TcpClient> clients = new ConcurrentHashMap<>();
    private volatile boolean running = true;
}
