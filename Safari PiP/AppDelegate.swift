//
//  AppDelegate.swift
//  Safari PiP
//
//  Created by Julien Dargelos on 17/07/2023.
//

import Cocoa

@main
class AppDelegate: NSObject, NSApplicationDelegate {
  func applicationDidFinishLaunching(_ notification: Notification) {
    // Override point for customization after application launch.
  }

  func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
    return true
  }
}
