'use client'

import { useState } from 'react'
import { CognitoUser } from '@/lib/auth-server'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, LogOut, Settings, User as UserIcon } from 'lucide-react'
import { signOut } from '@/lib/auth'

interface AdminHeaderProps {
  user: CognitoUser
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [notifications] = useState(3) // Mock notification count

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">NYASC Admin</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={''} alt={user.name} />
                    <AvatarFallback>
                      {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/account" className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/admin/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
